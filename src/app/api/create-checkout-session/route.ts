import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import {
  isCheckoutCurrency,
  stripeAmountFromEurCents,
  type CheckoutCurrency,
} from "@/lib/currency";
import { routing } from "@/i18n/routing";
import { toAbsoluteUrl } from "@/lib/app-origin";
import { getDefaultProduct, getProductBySlug } from "@/lib/products";

function getOrigin(request: NextRequest): string {
  const url = request.nextUrl;
  const envUrl = process.env.NEXT_PUBLIC_APP_URL;
  if (envUrl) return envUrl.replace(/\/$/, "");
  return `${url.protocol}//${url.host}`;
}

function getStripe(): Stripe {
  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) throw new Error("STRIPE_SECRET_KEY is not set");
  return new Stripe(secret);
}

type BodyItem = { slug: string; quantity: number };

export async function POST(request: NextRequest) {
  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) {
    return NextResponse.json(
      { error: "STRIPE_SECRET_KEY is not configured" },
      { status: 500 }
    );
  }

  const body = (await request.json().catch(() => ({}))) as {
    items?: BodyItem[];
    currency?: string;
    locale?: string;
  };

  const rawCurrency = (body.currency ?? "usd").toLowerCase();
  const currency: CheckoutCurrency = isCheckoutCurrency(rawCurrency)
    ? rawCurrency
    : "usd";

  const items =
    body.items && body.items.length > 0
      ? body.items
      : [{ slug: getDefaultProduct().slug, quantity: 1 }];

  const rawLocale = (body.locale ?? routing.defaultLocale).toLowerCase();
  const locale = (routing.locales as readonly string[]).includes(rawLocale)
    ? rawLocale
    : routing.defaultLocale;

  const origin = getOrigin(request);
  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
  for (const item of items) {
    const p = getProductBySlug(item.slug);
    if (!p) {
      return NextResponse.json(
        { error: `Unknown product: ${item.slug}` },
        { status: 400 }
      );
    }
    if (p.stockStatus === "sold_out") {
      return NextResponse.json(
        { error: `${p.title} is currently sold out` },
        { status: 400 }
      );
    }
    const qty = Math.min(99, Math.max(1, Math.floor(item.quantity)));
    const unitAmount = stripeAmountFromEurCents(p.priceCents, currency);
    const imagePath = p.images[0] ?? p.heroImageUrl;
    lineItems.push({
      quantity: qty,
      price_data: {
        currency,
        unit_amount: unitAmount,
        product_data: {
          name: p.title,
          description: p.description.slice(0, 500),
          images: imagePath
            ? [toAbsoluteUrl(origin, imagePath)]
            : undefined,
          metadata: { slug: p.slug },
        },
      },
    });
  }

  const stripe = getStripe();
  const successPath =
    locale === routing.defaultLocale
      ? "/success"
      : `/${locale}/success`;
  const cancelPath = locale === routing.defaultLocale ? "/" : `/${locale}`;

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      shipping_address_collection: {
        allowed_countries: [
          "AU",
          "US",
          "GB",
          "CA",
          "NZ",
          "DE",
          "FR",
          "NL",
          "IE",
          "AT",
          "BE",
          "ES",
          "IT",
          "PT",
          "JP",
          "CH",
          "SE",
          "NO",
          "DK",
          "FI",
          "PL",
          "CZ",
          "SK",
          "SI",
          "HU",
          "HR",
          "GR",
          "RO",
          "LU",
          "IS",
          "ID",
        ],
      },
      success_url: `${origin}${successPath}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelPath === "/" ? origin : `${origin}${cancelPath}`,
      metadata: {
        locale,
        item_slugs: items.map((i) => i.slug).join(","),
      },
    });

    if (!session.url) {
      return NextResponse.json(
        { error: "Failed to create checkout session URL" },
        { status: 500 }
      );
    }

    return NextResponse.json({ url: session.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Checkout failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
