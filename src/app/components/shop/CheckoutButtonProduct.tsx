"use client";

import { useLocale } from "next-intl";
import { useState } from "react";
import { formatProductDisplay, getProductBySlug } from "@/lib/products";
import { useCartStore } from "@/lib/cart-store";

export function CheckoutButtonProduct({ slug }: { slug: string }) {
  const [loading, setLoading] = useState(false);
  const locale = useLocale();
  const currency = useCartStore((s) => s.currency);
  const p = getProductBySlug(slug);
  if (!p) return null;

  async function startCheckout() {
    setLoading(true);
    try {
      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: [{ slug, quantity: 1 }],
          currency,
          locale,
        }),
      });
      const data: { url?: string; error?: string } = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Checkout failed");
      if (data.url) window.location.href = data.url;
      else throw new Error("No checkout URL returned");
    } catch (e) {
      alert(e instanceof Error ? e.message : "Checkout failed");
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={() => void startCheckout()}
      disabled={loading}
      className="border border-primary bg-primary px-8 py-4 text-sm font-semibold uppercase tracking-[0.12em] text-primary-foreground transition hover:brightness-110 disabled:opacity-60"
    >
      {loading
        ? "Redirecting…"
        : `Buy — ${formatProductDisplay(p.priceCents, currency)}`}
    </button>
  );
}
