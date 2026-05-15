"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CheckoutCurrency } from "@/lib/currency";
import { isCheckoutCurrency } from "@/lib/currency";

export type CartLine = {
  slug: string;
  quantity: number;
};

type CartState = {
  lines: CartLine[];
  currency: CheckoutCurrency;
  drawerOpen: boolean;
  add: (slug: string, quantity?: number) => void;
  setQuantity: (slug: string, quantity: number) => void;
  remove: (slug: string) => void;
  clear: () => void;
  setCurrency: (currency: CheckoutCurrency) => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  setDrawerOpen: (open: boolean) => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      lines: [],
      currency: "usd",
      drawerOpen: false,
      add: (slug, quantity = 1) => {
        const lines = [...get().lines];
        const idx = lines.findIndex((l) => l.slug === slug);
        if (idx >= 0) {
          lines[idx] = {
            slug,
            quantity: lines[idx].quantity + quantity,
          };
        } else {
          lines.push({ slug, quantity });
        }
        set({ lines, drawerOpen: true });
      },
      setQuantity: (slug, quantity) => {
        const lines = get()
          .lines.map((l) => (l.slug === slug ? { ...l, quantity } : l))
          .filter((l) => l.quantity > 0);
        set({ lines });
      },
      remove: (slug) =>
        set({ lines: get().lines.filter((l) => l.slug !== slug) }),
      clear: () => set({ lines: [] }),
      setCurrency: (currency) => set({ currency }),
      openDrawer: () => set({ drawerOpen: true }),
      closeDrawer: () => set({ drawerOpen: false }),
      setDrawerOpen: (open) => set({ drawerOpen: open }),
    }),
    {
      name: "elements-cart-v1",
      partialize: (state) => ({
        lines: state.lines,
        currency: isCheckoutCurrency(state.currency)
          ? state.currency
          : "usd",
      }),
    }
  )
);
