import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { course } from "@/lib/course";

// ───────────────────────────────────────────────────────────────────────────
// Pay-what-you-can Stripe Checkout for Dany Rud's "3 Flow Patterns" course.
//
// To go live, set STRIPE_SECRET_KEY in your environment (.env.local).
// The client sends { amountCents } (chosen by the buyer); we clamp it to the
// min/max in src/lib/course.ts and create a one-time "donate" checkout session.
// ───────────────────────────────────────────────────────────────────────────

function getOrigin(request: NextRequest): string {
  const envUrl = process.env.NEXT_PUBLIC_APP_URL;
  if (envUrl) return envUrl.replace(/\/$/, "");
  const url = request.nextUrl;
  return `${url.protocol}//${url.host}`;
}

export async function POST(request: NextRequest) {
  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) {
    return NextResponse.json(
      { error: "Checkout isn't connected yet. Add STRIPE_SECRET_KEY to enable it." },
      { status: 500 }
    );
  }

  const body = (await request.json().catch(() => ({}))) as { amountCents?: number };
  const requested = Math.round(Number(body.amountCents ?? course.defaultCents));
  if (!Number.isFinite(requested)) {
    return NextResponse.json({ error: "Invalid amount." }, { status: 400 });
  }
  const amount = Math.min(course.maxCents, Math.max(course.minCents, requested));

  const stripe = new Stripe(secret);
  const origin = getOrigin(request);

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      submit_type: "donate",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: course.currency,
            unit_amount: amount,
            product_data: {
              name: `${course.title} ${course.titleLine2}`,
              description: `${course.kicker} · ${course.instructor}`,
            },
          },
        },
      ],
      billing_address_collection: "auto",
      success_url: `${origin}/course?purchase=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/course?purchase=cancelled`,
      metadata: { course: course.slug, amount_cents: String(amount) },
    });

    if (!session.url) {
      return NextResponse.json(
        { error: "Failed to create checkout session." },
        { status: 500 }
      );
    }
    return NextResponse.json({ url: session.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Checkout failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
