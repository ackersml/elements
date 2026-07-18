import { NextRequest, NextResponse } from "next/server";
import { isShopifyConfigured, ShopifyError } from "@/lib/shopify/client";
import { createCart, resolveVariants } from "@/lib/shopify/checkout";
import {
  getDefaultProduct,
  getProductBySlug,
  type Product,
} from "@/lib/products";

type BodyItem = { slug: string; quantity: number };

/**
 * Buyer's country decides the Shopify market (currency, tax, shipping). Vercel
 * sets this header at the edge; without it Shopify falls back to the store's
 * backup region.
 */
function getCountryCode(request: NextRequest): string | undefined {
  const country = request.headers.get("x-vercel-ip-country");
  return country && /^[A-Z]{2}$/.test(country) ? country : undefined;
}

export async function POST(request: NextRequest) {
  if (!isShopifyConfigured()) {
    return NextResponse.json(
      { error: "Shopify is not configured" },
      { status: 500 }
    );
  }

  const body = (await request.json().catch(() => ({}))) as {
    items?: BodyItem[];
  };

  const items =
    body.items && body.items.length > 0
      ? body.items
      : [{ slug: getDefaultProduct().slug, quantity: 1 }];

  // Resolve against the local catalogue first so an unknown slug fails here
  // rather than as a confusing "no Shopify product" further down.
  const locals: { product: Product; quantity: number }[] = [];
  for (const item of items) {
    const product = getProductBySlug(item.slug);
    if (!product) {
      return NextResponse.json(
        { error: `Unknown product: ${item.slug}` },
        { status: 400 }
      );
    }
    locals.push({
      product,
      quantity: Math.min(99, Math.max(1, Math.floor(item.quantity))),
    });
  }

  try {
    const variants = await resolveVariants(locals.map((l) => l.product.slug));

    for (const [i, variant] of variants.entries()) {
      const { product } = locals[i];

      if (!variant.availableForSale) {
        return NextResponse.json(
          { error: `${product.title} is currently unavailable` },
          { status: 409 }
        );
      }

      // Shopify charges Shopify's price, but the page displays products.ts's.
      // If they disagree the customer is quoted one number and billed another,
      // so refuse rather than silently mis-charge. Regenerate and re-import the
      // CSV (scripts/generate-shopify-csv.mjs) to resolve.
      if (variant.priceCents !== product.priceCents) {
        console.error(
          `[shopify] price drift for "${product.slug}": ` +
            `local ${product.priceCents} vs Shopify ${variant.priceCents} ${variant.currencyCode}`
        );
        return NextResponse.json(
          {
            error:
              "This product's price is being updated. Please refresh and try again.",
          },
          { status: 409 }
        );
      }
    }

    const cart = await createCart(
      variants.map((v, i) => ({
        variantId: v.variantId,
        quantity: locals[i].quantity,
      })),
      getCountryCode(request)
    );

    return NextResponse.json({ url: cart.checkoutUrl });
  } catch (err) {
    if (err instanceof ShopifyError) {
      console.error(`[shopify] checkout failed: ${err.message}`);
      return NextResponse.json(
        { error: "Could not start checkout. Please try again." },
        { status: 502 }
      );
    }
    const message = err instanceof Error ? err.message : "Checkout failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
