"use client";

import { useTranslations } from "next-intl";
import { type MouseEvent } from "react";
import { useCartStore } from "@/lib/cart-store";
import { formatProductDisplay, getProductBySlug } from "@/lib/products";
import { cn } from "@/lib/utils";

export function QuickBuyButton({
  slug,
  className,
  labelOnly = false,
}: {
  slug: string;
  className?: string;
  labelOnly?: boolean;
}) {
  const t = useTranslations("product");
  const currency = useCartStore((s) => s.currency);
  const add = useCartStore((s) => s.add);
  const openDrawer = useCartStore((s) => s.openDrawer);

  const p = getProductBySlug(slug);
  if (!p || p.stockStatus === "sold_out") return null;

  function onClick(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    e.stopPropagation();
    add(slug, 1);
    openDrawer();
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "btn-pill btn-ghost !min-h-10 whitespace-nowrap !px-4 !text-xs",
        className
      )}
    >
      {labelOnly
        ? t("quickBuy").toUpperCase()
        : `${t("quickBuy")} · ${formatProductDisplay(p.priceCents, currency)}`}
    </button>
  );
}
