"use client";

import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import { Link } from "@/i18n/navigation";
import { useCartStore } from "@/lib/cart-store";
import {
  CheckoutError,
  redirectToStripeCheckout,
} from "@/lib/checkout-client";
import {
  formatProductDisplay,
  getProductBySlug,
} from "@/lib/products";

export function CartView({ showTitle = true }: { showTitle?: boolean }) {
  const t = useTranslations("cart");
  const locale = useLocale();
  const lines = useCartStore((s) => s.lines);
  const currency = useCartStore((s) => s.currency);
  const remove = useCartStore((s) => s.remove);
  const setQty = useCartStore((s) => s.setQuantity);
  const clear = useCartStore((s) => s.clear);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const subtotalCents = useMemo(
    () =>
      lines.reduce((sum, line) => {
        const p = getProductBySlug(line.slug);
        return sum + (p ? p.priceCents * line.quantity : 0);
      }, 0),
    [lines]
  );

  async function checkout() {
    if (lines.length === 0) return;
    setLoading(true);
    setErr(null);
    try {
      await redirectToStripeCheckout({
        items: lines.map((l) => ({
          slug: l.slug,
          quantity: l.quantity,
        })),
        currency,
        locale,
      });
    } catch (e) {
      setErr(e instanceof CheckoutError ? e.message : t("checkoutError"));
      setLoading(false);
    }
  }

  return (
    <div>
      {showTitle && (
        <h1 className="font-display text-3xl tracking-tight md:text-4xl">
          {t("title")}
        </h1>
      )}

      {lines.length === 0 ? (
        <div className="mt-8 space-y-4">
          <p className="text-muted-foreground">{t("empty")}</p>
          <Link href="/shop" className="link-arrow text-sm">
            {t("continue")}
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-12">
          <ul className="space-y-6 lg:col-span-7">
            {lines.map((line) => {
              const p = getProductBySlug(line.slug);
              if (!p) return null;
              return (
                <li
                  key={line.slug}
                  className="flex gap-4 border-b border-border pb-6"
                >
                  <div className="relative size-24 shrink-0 overflow-hidden rounded-md border border-border bg-white">
                    <Image
                      src={p.heroImageUrl}
                      alt=""
                      fill
                      sizes="96px"
                      className="object-contain p-2"
                    />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col gap-2">
                    <div className="flex justify-between gap-3">
                      <div className="min-w-0">
                        <Link
                          href={`/shop/${p.slug}`}
                          className="font-display text-base leading-tight text-foreground hover:text-[color:var(--sale-bg)]"
                        >
                          {p.title}
                        </Link>
                        <p className="mt-0.5 text-xs text-muted-foreground">
                          {p.scale}
                        </p>
                      </div>
                      <p className="shrink-0 text-sm text-foreground">
                        {formatProductDisplay(
                          p.priceCents * line.quantity,
                          currency
                        )}
                      </p>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="inline-flex items-center rounded-md border border-border">
                        <button
                          type="button"
                          onClick={() => setQty(line.slug, line.quantity - 1)}
                          className="grid size-9 place-items-center transition hover:text-[color:var(--sale-bg)]"
                          aria-label="Decrease"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-8 text-center">{line.quantity}</span>
                        <button
                          type="button"
                          onClick={() => setQty(line.slug, line.quantity + 1)}
                          className="grid size-9 place-items-center transition hover:text-[color:var(--sale-bg)]"
                          aria-label="Increase"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => remove(line.slug)}
                        className="text-muted-foreground underline-offset-4 transition hover:text-foreground hover:underline"
                      >
                        {t("remove")}
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="rounded-lg border border-border bg-[color:var(--surface-muted)] p-6 lg:col-span-5 lg:sticky lg:top-28 lg:self-start">
            <div className="flex justify-between text-sm">
              <span className="smallcaps text-muted-foreground">
                {t("subtotal")}
              </span>
              <span className="font-display text-lg">
                {formatProductDisplay(subtotalCents, currency)}
              </span>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">{t("secureNote")}</p>
            {err && (
              <p className="text-destructive mt-3 text-sm" role="alert">
                {err}
              </p>
            )}
            <button
              type="button"
              onClick={() => void checkout()}
              disabled={loading}
              className="btn-pill btn-primary mt-6 w-full"
            >
              {loading ? t("redirecting") : t("checkout")}
            </button>
            <button
              type="button"
              onClick={() => clear()}
              className="mx-auto mt-4 block text-xs text-muted-foreground transition hover:text-foreground"
            >
              {t("clear")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
