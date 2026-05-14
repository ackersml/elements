"use client";

import { formatProductDisplay } from "@/lib/products";
import { useCartStore } from "@/lib/cart-store";

export function ClientPrice({ eurCents }: { eurCents: number }) {
  const currency = useCartStore((s) => s.currency);
  return (
    <span className="text-sm font-medium text-primary">
      {formatProductDisplay(eurCents, currency)}
    </span>
  );
}
