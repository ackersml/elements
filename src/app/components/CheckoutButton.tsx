"use client";

import { useLocale } from "next-intl";
import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { product } from "@/lib/product";
import { formatProductDisplay } from "@/lib/products";
import { useCartStore } from "@/lib/cart-store";
import {
  CheckoutError,
  redirectToStripeCheckout,
} from "@/lib/checkout-client";

export function CheckoutButton() {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const locale = useLocale();
  const currency = useCartStore((s) => s.currency);

  async function handleCheckout() {
    setLoading(true);
    setErr(null);
    try {
      await redirectToStripeCheckout({
        items: [{ slug: product.slug, quantity: 1 }],
        currency,
        locale,
      });
    } catch (e) {
      setErr(e instanceof CheckoutError ? e.message : "Checkout failed");
      setLoading(false);
    }
  }

  return (
    <div className="w-full">
      {err && (
        <p className="mb-2 text-center text-sm text-destructive" role="alert">
          {err}
        </p>
      )}
      <button
        type="button"
        onClick={() => void handleCheckout()}
        disabled={loading}
        className="flex w-full items-center justify-center gap-3 rounded-lg bg-primary px-8 py-4 text-lg font-bold text-primary-foreground transition-all duration-300 hover:brightness-110 disabled:opacity-70 glow-gold"
      >
        <ShoppingCart className="h-5 w-5" />
        {loading
          ? "Redirecting…"
          : `Buy Now — ${formatProductDisplay(product.priceCents, currency)}`}
      </button>
    </div>
  );
}
