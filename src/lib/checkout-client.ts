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

/** Creates a Stripe Checkout session and redirects the browser. */
export async function redirectToStripeCheckout(
  params: StartCheckoutParams
): Promise<void> {
  const res = await fetch("/api/create-checkout-session", {
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
