"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { useCartStore } from "@/lib/cart-store";
import {
  formatProductDisplay,
  getProductBySlug,
} from "@/lib/products";
import { cn } from "@/lib/utils";

export function CartDrawer({ children }: { children: React.ReactNode }) {
  const t = useTranslations("cart");
  const locale = useLocale();
  const [open, setOpen] = useState(false);
  const lines = useCartStore((s) => s.lines);
  const currency = useCartStore((s) => s.currency);
  const remove = useCartStore((s) => s.remove);
  const setQty = useCartStore((s) => s.setQuantity);
  const clear = useCartStore((s) => s.clear);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function checkout() {
    setLoading(true);
    setErr(null);
    try {
      const payload =
        lines.length > 0
          ? {
              items: lines.map((l) => ({
                slug: l.slug,
                quantity: l.quantity,
              })),
              currency,
              locale,
            }
          : {
              items: [
                {
                  slug: "studio-handpan-d-kurd-10",
                  quantity: 1,
                },
              ],
              currency,
              locale,
            };

      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data: { url?: string; error?: string } = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Checkout failed");
      if (data.url) window.location.href = data.url;
      else throw new Error("No checkout URL returned");
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Checkout failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[90] bg-background/80 backdrop-blur-sm data-[state=open]:animate-in fade-in-0" />
        <Dialog.Content
          className={cn(
            "fixed right-0 top-0 z-[95] flex h-full w-full max-w-md flex-col border-l border-border bg-card p-6 shadow-elements-soft",
            "data-[state=open]:animate-in slide-in-from-right duration-300"
          )}
        >
          <div className="mb-6 flex items-center justify-between border-b border-border pb-4">
            <Dialog.Title className="font-display text-2xl tracking-tight text-foreground">
              {t("title")}
            </Dialog.Title>
            <Dialog.Close className="text-sm text-muted-foreground hover:text-foreground">
              Close
            </Dialog.Close>
          </div>

          <div className="flex-1 space-y-4 overflow-y-auto">
            {(lines.length === 0 ? [] : lines).map((line) => {
              const p = getProductBySlug(line.slug);
              if (!p) return null;
              return (
                <div
                  key={line.slug}
                  className="flex gap-4 border-b border-border/60 pb-4"
                >
                  <div className="min-w-0 flex-1">
                    <p className="font-display text-lg leading-tight text-foreground">
                      {p.title}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {formatProductDisplay(p.priceCents, currency)} · ×
                      {line.quantity}
                    </p>
                    <div className="mt-2 flex gap-2">
                      <button
                        type="button"
                        className="text-xs uppercase tracking-wide text-primary hover:underline"
                        onClick={() => setQty(line.slug, line.quantity - 1)}
                      >
                        −
                      </button>
                      <button
                        type="button"
                        className="text-xs uppercase tracking-wide text-primary hover:underline"
                        onClick={() => setQty(line.slug, line.quantity + 1)}
                      >
                        +
                      </button>
                      <button
                        type="button"
                        className="text-xs uppercase tracking-wide text-muted-foreground hover:text-foreground"
                        onClick={() => remove(line.slug)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
            {lines.length === 0 && (
              <p className="text-sm text-muted-foreground">{t("empty")}</p>
            )}
          </div>

          {err && <p className="text-destructive py-2 text-sm">{err}</p>}

          <div className="mt-4 space-y-3 border-t border-border pt-4">
            <button
              type="button"
              onClick={checkout}
              disabled={loading}
              className="w-full border border-primary bg-primary px-6 py-3 text-sm font-medium uppercase tracking-[0.12em] text-primary-foreground transition hover:brightness-110 disabled:opacity-60"
            >
              {loading ? "…" : t("checkout")}
            </button>
            {lines.length > 0 && (
              <button
                type="button"
                onClick={() => clear()}
                className="w-full py-2 text-xs text-muted-foreground hover:text-foreground"
              >
                Clear cart
              </button>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
