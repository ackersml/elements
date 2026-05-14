export const checkoutCurrencies = ["usd", "eur", "idr", "cad"] as const;
export type CheckoutCurrency = (typeof checkoutCurrencies)[number];

export function isCheckoutCurrency(value: string): value is CheckoutCurrency {
  return (checkoutCurrencies as readonly string[]).includes(value);
}

/** Catalog stores EUR cents on each Product.priceCents */
export function stripeAmountFromEurCents(
  eurCents: number,
  target: CheckoutCurrency
): number {
  const eur = eurCents / 100;
  switch (target) {
    case "eur":
      return eurCents;
    case "usd":
      return Math.round(eur * 1.09 * 100);
    case "cad":
      return Math.round(eur * 1.59 * 100);
    case "idr":
      return Math.max(1000, Math.round(eur * 17_000));
    default: {
      const _x: never = target;
      return _x;
    }
  }
}

export function formatMoney(amountSmallest: number, currency: CheckoutCurrency): string {
  const code = currency.toUpperCase();
  if (currency === "idr") {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(amountSmallest);
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: code,
  }).format(amountSmallest / 100);
}
