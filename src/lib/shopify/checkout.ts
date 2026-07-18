/**
 * Shopify cart + checkout.
 *
 * Products were imported into Shopify from `src/lib/products.ts` (via
 * scripts/generate-shopify-csv.mjs) using the local `slug` as the Shopify
 * `handle`, so slug IS the handle. Each product has exactly one variant
 * ("Default Title"), so resolving a slug to a merchandise id means taking the
 * product's first variant.
 */

import { shopifyFetch, ShopifyError } from "./client";

export type CheckoutRequestLine = {
  slug: string;
  quantity: number;
};

export type ShopifyVariant = {
  slug: string;
  variantId: string;
  title: string;
  availableForSale: boolean;
  /** Minor units (cents), matching the local `priceCents` convention. */
  priceCents: number;
  currencyCode: string;
};

type ProductNode = {
  handle: string;
  title: string;
  variants: {
    nodes: {
      id: string;
      availableForSale: boolean;
      price: { amount: string; currencyCode: string };
    }[];
  };
} | null;

/** Shopify returns money as a decimal string ("1300.0"); we store minor units. */
function toMinorUnits(amount: string): number {
  return Math.round(Number.parseFloat(amount) * 100);
}

/**
 * Builds an aliased query so N handles resolve in one round trip. Each handle
 * is passed as a GraphQL variable rather than interpolated, so a handle can
 * never inject query text.
 */
function variantsQuery(count: number): string {
  const params = Array.from({ length: count }, (_, i) => `$h${i}: String!`).join(
    ", "
  );
  const fields = Array.from(
    { length: count },
    (_, i) => `
    p${i}: product(handle: $h${i}) {
      handle
      title
      variants(first: 1) {
        nodes {
          id
          availableForSale
          price { amount currencyCode }
        }
      }
    }`
  ).join("");

  return `query VariantsByHandle(${params}) {${fields}\n}`;
}

/**
 * Resolves local slugs to Shopify variants. Throws if any slug has no matching
 * Shopify product — a silent drop would let a customer check out without the
 * item they chose.
 */
export async function resolveVariants(
  slugs: string[]
): Promise<ShopifyVariant[]> {
  if (slugs.length === 0) return [];

  const variables: Record<string, string> = {};
  slugs.forEach((slug, i) => {
    variables[`h${i}`] = slug;
  });

  const data = await shopifyFetch<Record<string, ProductNode>>(
    variantsQuery(slugs.length),
    variables
  );

  return slugs.map((slug, i) => {
    const node = data[`p${i}`];
    if (!node) {
      throw new ShopifyError(`No Shopify product found for handle "${slug}"`);
    }
    const variant = node.variants.nodes[0];
    if (!variant) {
      throw new ShopifyError(`Shopify product "${slug}" has no variants`);
    }
    return {
      slug,
      variantId: variant.id,
      title: node.title,
      availableForSale: variant.availableForSale,
      priceCents: toMinorUnits(variant.price.amount),
      currencyCode: variant.price.currencyCode,
    };
  });
}

const CART_CREATE = `
mutation CartCreate($lines: [CartLineInput!]!, $buyerIdentity: CartBuyerIdentityInput) {
  cartCreate(input: { lines: $lines, buyerIdentity: $buyerIdentity }) {
    cart {
      id
      checkoutUrl
      cost { totalAmount { amount currencyCode } }
    }
    userErrors { field message }
  }
}`;

type CartCreateResult = {
  cartCreate: {
    cart: {
      id: string;
      checkoutUrl: string;
      cost: { totalAmount: { amount: string; currencyCode: string } };
    } | null;
    userErrors: { field: string[] | null; message: string }[];
  };
};

export type ShopifyCart = {
  id: string;
  checkoutUrl: string;
  totalCents: number;
  currencyCode: string;
};

/**
 * Creates a Shopify cart and returns its hosted checkout URL.
 *
 * `countryCode` sets the buyer's market, which is what makes Shopify apply the
 * right currency, taxes and shipping — an EU country resolves to the European
 * Union market, anything else falls back to the store's backup region.
 */
export async function createCart(
  lines: { variantId: string; quantity: number }[],
  countryCode?: string
): Promise<ShopifyCart> {
  const data = await shopifyFetch<CartCreateResult>(CART_CREATE, {
    lines: lines.map((l) => ({
      merchandiseId: l.variantId,
      quantity: l.quantity,
    })),
    buyerIdentity: countryCode ? { countryCode } : undefined,
  });

  const { cart, userErrors } = data.cartCreate;
  if (userErrors.length > 0) {
    throw new ShopifyError(
      `Cart creation failed: ${userErrors.map((e) => e.message).join("; ")}`
    );
  }
  if (!cart) throw new ShopifyError("Cart creation returned no cart");

  return {
    id: cart.id,
    checkoutUrl: cart.checkoutUrl,
    totalCents: toMinorUnits(cart.cost.totalAmount.amount),
    currencyCode: cart.cost.totalAmount.currencyCode,
  };
}
