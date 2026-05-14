"use client";

import { useLocale } from "next-intl";
import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { product } from "@/lib/product";
import { formatProductDisplay } from "@/lib/products";
import { useCartStore } from "@/lib/cart-store";

export function CheckoutButton() {
  const [loading, setLoading] = useState(false);
  const locale = useLocale();
  const currency = useCartStore((s) => s.currency);

  async function handleCheckout() {
    setLoading(true);
    try {
      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: [{ slug: product.slug, quantity: 1 }],
          currency,
          locale,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Checkout failed");
      if (data.url) window.location.href = data.url;
      else throw new Error("No checkout URL returned");
    } catch (err) {
      setLoading(false);
      alert(err instanceof Error ? err.message : "Checkout failed");
    }
  }

  return (
    <button
      type="button"
      onClick={handleCheckout}
      disabled={loading}
      className="flex w-full items-center justify-center gap-3 rounded-lg bg-primary px-8 py-4 text-lg font-bold text-primary-foreground transition-all duration-300 hover:brightness-110 disabled:opacity-70 glow-gold"
    >
      <ShoppingCart className="h-5 w-5" />
      {loading
        ? "Redirecting…"
        : `Buy Now — ${formatProductDisplay(product.priceCents, currency)}`}
    </button>
  );
}
