"use client";

import { useLocale, useTranslations } from "next-intl";
import { useState, type MouseEvent } from "react";
import { useCartStore } from "@/lib/cart-store";
import {
  CheckoutError,
  redirectToStripeCheckout,
} from "@/lib/checkout-client";
import { formatProductDisplay, getProductBySlug } from "@/lib/products";
import { cn } from "@/lib/utils";

export function QuickBuyButton({
  slug,
  className,
}: {
  slug: string;
  className?: string;
}) {
  const t = useTranslations("product");
  const locale = useLocale();
  const currency = useCartStore((s) => s.currency);
  const [loading, setLoading] = useState(false);

  const p = getProductBySlug(slug);
  if (!p || p.stockStatus === "sold_out") return null;

  async function onClick(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    e.stopPropagation();
    setLoading(true);
    try {
      await redirectToStripeCheckout({
        items: [{ slug, quantity: 1 }],
        currency,
        locale,
      });
    } catch (err) {
      const message =
        err instanceof CheckoutError ? err.message : t("checkoutError");
      window.alert(message);
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={(e) => void onClick(e)}
      disabled={loading}
      className={cn(
        "btn-pill btn-ghost !min-h-10 whitespace-nowrap !px-4 text-xs disabled:opacity-60",
        className
      )}
    >
      {loading
        ? t("redirecting")
        : `${t("quickBuy")} · ${formatProductDisplay(p.priceCents, currency)}`}
    </button>
  );
}
