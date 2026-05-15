"use client";

import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { useCartStore } from "@/lib/cart-store";
import {
  CheckoutError,
  redirectToStripeCheckout,
} from "@/lib/checkout-client";
import { formatProductDisplay, getProductBySlug } from "@/lib/products";
import { cn } from "@/lib/utils";

export function ProductBuyActions({
  slug,
  className,
}: {
  slug: string;
  className?: string;
}) {
  const t = useTranslations("product");
  const locale = useLocale();
  const currency = useCartStore((s) => s.currency);
  const add = useCartStore((s) => s.add);
  const openDrawer = useCartStore((s) => s.openDrawer);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const p = getProductBySlug(slug);
  if (!p) return null;

  const soldOut = p.stockStatus === "sold_out";
  const price = formatProductDisplay(p.priceCents, currency);

  async function buyNow() {
    setLoading(true);
    setErr(null);
    try {
      await redirectToStripeCheckout({
        items: [{ slug, quantity: 1 }],
        currency,
        locale,
      });
    } catch (e) {
      setErr(e instanceof CheckoutError ? e.message : t("checkoutError"));
      setLoading(false);
    }
  }

  function addToCart() {
    add(slug, 1);
    openDrawer();
  }

  return (
    <div className={cn(className)}>
      {err && (
        <p className="mb-3 text-sm text-destructive" role="alert">
          {err}
        </p>
      )}
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => void buyNow()}
          disabled={soldOut || loading}
          className="btn-pill btn-primary uppercase tracking-[0.12em] disabled:opacity-60"
        >
          {soldOut
            ? t("soldOut")
            : loading
              ? t("redirecting")
              : t("buyNow", { price })}
        </button>
        {!soldOut && (
          <button
            type="button"
            onClick={addToCart}
            className="btn-pill btn-ghost uppercase tracking-[0.12em]"
          >
            {t("addToCart")}
          </button>
        )}
      </div>
      {p.stockStatus === "preorder" && (
        <p className="mt-3 text-sm text-muted-foreground">{t("preorderNote")}</p>
      )}
    </div>
  );
}
