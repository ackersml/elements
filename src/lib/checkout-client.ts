import type { CheckoutCurrency } from "@/lib/currency";

export type CheckoutLineItem = {
  slug: string;
  quantity: number;
};

export type StartCheckoutParams = {
  items: CheckoutLineItem[];
  currency: CheckoutCurrency;
  locale: string;
};

export class CheckoutError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CheckoutError";
  }
}

export type CheckoutProvider = "shopify" | "stripe";

/**
 * Which checkout the buy buttons hit. Defaults to Stripe so an unset env keeps
 * the previous behaviour; set NEXT_PUBLIC_CHECKOUT_PROVIDER=shopify to move
 * checkout onto Shopify (payments, tax and shipping then come from the store).
 *
 * Must be read as a full literal, not a variable — Next.js inlines
 * NEXT_PUBLIC_* at build time by textual match.
 */
export function getCheckoutProvider(): CheckoutProvider {
  return process.env.NEXT_PUBLIC_CHECKOUT_PROVIDER === "shopify"
    ? "shopify"
    : "stripe";
}

const ENDPOINTS: Record<CheckoutProvider, string> = {
  shopify: "/api/shopify/checkout",
  stripe: "/api/create-checkout-session",
};

/**
 * Creates a checkout session with the configured provider and redirects the
 * browser to it.
 */
export async function startCheckout(
  params: StartCheckoutParams
): Promise<void> {
  const res = await fetch(ENDPOINTS[getCheckoutProvider()], {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  });

  const data = (await res.json().catch(() => ({}))) as {
    url?: string;
    error?: string;
  };

  if (!res.ok) {
    throw new CheckoutError(data.error ?? "Checkout failed");
  }
  if (!data.url) {
    throw new CheckoutError("No checkout URL returned");
  }

  window.location.href = data.url;
}
