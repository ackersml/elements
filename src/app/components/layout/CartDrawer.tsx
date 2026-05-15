"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { Minus, Plus, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useMemo, useState } from "react";
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

  const subtotalCents = useMemo(
    () =>
      lines.reduce((sum, line) => {
        const p = getProductBySlug(line.slug);
        return sum + (p ? p.priceCents * line.quantity : 0);
      }, 0),
    [lines]
  );

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
        <Dialog.Overlay className="fixed inset-0 z-[90] bg-black/60 data-[state=open]:animate-in fade-in-0" />
        <Dialog.Content
          className={cn(
            "fixed right-0 top-0 z-[95] flex h-full w-full max-w-md flex-col border-l border-border bg-background",
            "data-[state=open]:animate-in slide-in-from-right duration-300"
          )}
        >
          <div className="flex items-center justify-between border-b border-border p-6">
            <Dialog.Title className="font-display text-2xl tracking-tight text-foreground">
              {t("title")}
            </Dialog.Title>
            <Dialog.Close
              className="p-2 text-muted-foreground transition hover:text-[color:var(--accent-c)]"
              aria-label="Close"
            >
              <X size={20} />
            </Dialog.Close>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            {lines.length === 0 ? (
              <p className="text-sm text-muted-foreground">{t("empty")}</p>
            ) : (
              <ul className="space-y-6">
                {lines.map((line) => {
                  const p = getProductBySlug(line.slug);
                  if (!p) return null;
                  return (
                    <li
                      key={line.slug}
                      className="flex flex-col gap-2 border-b border-border pb-6"
                    >
                      <div className="flex justify-between gap-3">
                        <p className="font-display text-base leading-tight text-foreground">
                          {p.title}
                        </p>
                        <p className="text-sm text-foreground">
                          {formatProductDisplay(p.priceCents * line.quantity, currency)}
                        </p>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div className="inline-flex items-center rounded-full border border-border">
                          <button
                            type="button"
                            onClick={() => setQty(line.slug, line.quantity - 1)}
                            className="grid size-9 place-items-center transition hover:text-[color:var(--accent-c)]"
                            aria-label="Decrease"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-8 text-center">{line.quantity}</span>
                          <button
                            type="button"
                            onClick={() => setQty(line.slug, line.quantity + 1)}
                            className="grid size-9 place-items-center transition hover:text-[color:var(--accent-c)]"
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
                          Remove
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          {err && <p className="text-destructive px-6 py-2 text-sm">{err}</p>}

          {lines.length > 0 && (
            <div className="space-y-3 border-t border-border p-6">
              <div className="flex justify-between text-sm">
                <span className="smallcaps text-muted-foreground">Subtotal</span>
                <span>{formatProductDisplay(subtotalCents, currency)}</span>
              </div>
              <button
                type="button"
                onClick={checkout}
                disabled={loading}
                className="btn-pill btn-primary w-full"
              >
                {loading ? "…" : t("checkout")}
              </button>
              <button
                type="button"
                onClick={() => clear()}
                className="mx-auto block text-xs text-muted-foreground transition hover:text-foreground"
              >
                Clear cart
              </button>
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
