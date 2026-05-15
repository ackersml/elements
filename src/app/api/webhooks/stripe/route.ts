import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { dispatchOrder } from "@/lib/fulfillment";
import { product } from "@/lib/product";
import { createSupabaseAdmin, getStoreOrdersTable } from "@/lib/supabase-server";

export const runtime = "nodejs";

function getStripe(): Stripe {
  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) throw new Error("STRIPE_SECRET_KEY is not set");
  return new Stripe(secret);
}

export async function POST(request: NextRequest) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    return NextResponse.json(
      { error: "STRIPE_WEBHOOK_SECRET is not configured" },
      { status: 500 }
    );
  }

  let body: string;
  try {
    body = await request.text();
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    const stripe = getStripe();
    const sig = request.headers.get("stripe-signature");
    if (!sig) {
      return NextResponse.json({ error: "Missing stripe-signature" }, { status: 400 });
    }
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Webhook signature verification failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }

  if (event.type !== "checkout.session.completed") {
    return NextResponse.json({ received: true });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  const sessionId = session.id;

  const stripe = getStripe();
  const fullSession = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items"],
  });

  const customerDetails = fullSession.customer_details;
  const shippingDetails =
    fullSession.collected_information?.shipping_details ?? null;
  const address = shippingDetails?.address;
  const email = (customerDetails?.email ?? "").trim().toLowerCase();
  const customerName =
    shippingDetails?.name ?? customerDetails?.name ?? undefined;

  const shippingAddress = address
    ? {
        line1: address.line1 ?? undefined,
        line2: address.line2 ?? undefined,
        city: address.city ?? undefined,
        state: address.state ?? undefined,
        postal_code: address.postal_code ?? undefined,
        country: address.country ?? undefined,
      }
    : null;

  const lineItems = (fullSession.line_items?.data ?? []).map((item) => {
    const price = item.price && typeof item.price === "object" ? item.price : null;
    return {
      productId: typeof price?.product === "string" ? price.product : undefined,
      productName: item.description ?? product.title,
      quantity: item.quantity ?? 1,
      priceCents: price?.unit_amount ?? product.priceCents,
    };
  });

  const amountTotal = fullSession.amount_total ?? 0;
  const supabase = createSupabaseAdmin();

  if (!supabase) {
    console.warn(
      "Stripe checkout.session.completed received but Supabase is not configured; order not persisted.",
      { sessionId, email }
    );
    return NextResponse.json({ received: true, stored: false });
  }

  const orderRow = {
    stripe_session_id: sessionId,
    stripe_payment_intent_id: fullSession.payment_intent
      ? typeof fullSession.payment_intent === "string"
        ? fullSession.payment_intent
        : fullSession.payment_intent.id
      : null,
    email,
    customer_name: customerName ?? null,
    shipping_address: shippingAddress,
    line_items: lineItems,
    amount_total: amountTotal,
    status: "paid" as const,
    cj_order_id: null,
    tracking_url: null,
    tracking_number: null,
  };

  const ordersTable = getStoreOrdersTable();
  const { data: inserted, error: insertError } = await supabase
    .from(ordersTable)
    .insert(orderRow)
    .select("id")
    .single();

  if (insertError) {
    if (insertError.code === "23505") {
      return NextResponse.json({ received: true });
    }
    console.error("Supabase insert error:", insertError);
    return NextResponse.json(
      { error: "Failed to store order" },
      { status: 500 }
    );
  }

  const orderId = inserted?.id;
  if (!orderId || !shippingAddress) {
    return NextResponse.json({ received: true });
  }

  const dispatchResult = await dispatchOrder({
    orderId: String(orderId),
    stripeSessionId: sessionId,
    email,
    customerName: customerName ?? undefined,
    shippingAddress,
    lineItems: lineItems.map((li) => ({
      productName: li.productName ?? product.title,
      quantity: li.quantity,
      priceCents: li.priceCents,
      productId: li.productId,
    })),
    shippingPhone: customerDetails?.phone ?? undefined,
  });

  if (dispatchResult.status === "sent_to_supplier" && dispatchResult.supplierOrderId) {
    await supabase
      .from(ordersTable)
      .update({
        status: "sent_to_cj",
        cj_order_id: dispatchResult.supplierOrderId,
      })
      .eq("id", orderId);
  } else if (dispatchResult.status === "manual_fulfillment_pending") {
    await supabase
      .from(ordersTable)
      .update({ status: "manual_fulfillment_pending" })
      .eq("id", orderId);
  } else {
    await supabase.from(ordersTable).update({ status: "cj_failed" }).eq("id", orderId);
  }

  return NextResponse.json({ received: true });
}
