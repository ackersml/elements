"use client";

import * as Dropdown from "@radix-ui/react-dropdown-menu";
import { ChevronDown, Coins, Globe, Menu, ShoppingBag, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { checkoutCurrencies, type CheckoutCurrency } from "@/lib/currency";
import { useCartStore } from "@/lib/cart-store";
import { cn } from "@/lib/utils";
import { CartDrawer } from "./CartDrawer";

const shopLinks: { key: string; href: string }[] = [
  { key: "shopBeginner", href: "/shop?collection=beginner" },
  { key: "shopExtended", href: "/shop?collection=extended" },
  { key: "shopRare", href: "/shop?collection=rare" },
  { key: "shopBundles", href: "/shop?collection=bundles" },
  { key: "shopAccessories", href: "/shop?collection=accessories" },
  { key: "shopTongue", href: "/shop?collection=tongue-drums" },
  { key: "shopSoundHealing", href: "/shop?collection=sound-healing" },
];

export type SiteHeaderVariant = "sticky" | "overlay";

export function SiteHeader({ variant = "sticky" }: { variant?: SiteHeaderVariant }) {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const locale = useLocale();
  const setCurrency = useCartStore((s) => s.setCurrency);
  const currency = useCartStore((s) => s.currency);
  const lines = useCartStore((s) => s.lines);
  const count = lines.reduce((n, l) => n + l.quantity, 0);
  const [mobileOpen, setMobileOpen] = useState(false);

  const shell =
    variant === "overlay"
      ? "absolute inset-x-0 top-0 z-30"
      : "sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur";

  return (
    <header className={shell}>
      <div className="container-x flex items-center justify-between py-4 md:py-6">
        <Link href="/" className="font-display text-xl tracking-[0.3em] text-foreground">
          ELEMENTS
        </Link>

        <nav className="hidden items-center gap-8 text-sm lg:flex">
          <div className="group relative">
            <button
              type="button"
              className="inline-flex items-center gap-1 text-muted-foreground transition hover:text-[color:var(--accent-c)]"
            >
              {t("shop")}
              <ChevronDown size={14} aria-hidden />
            </button>
            <div className="invisible absolute left-1/2 top-full z-[80] -translate-x-1/2 pt-4 opacity-0 transition group-hover:visible group-hover:opacity-100">
              <div className="grid min-w-[360px] grid-cols-2 gap-x-8 gap-y-2 rounded-2xl border border-border bg-card p-5 shadow-2xl">
                {shopLinks.map((item) => (
                  <Link
                    key={item.key}
                    href={item.href}
                    className="text-sm text-foreground transition hover:text-[color:var(--accent-c)]"
                  >
                    {t(item.key as "shopBeginner")}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <Link
            href="/journal"
            className="text-muted-foreground transition hover:text-[color:var(--accent-c)]"
          >
            {t("journal")}
          </Link>
          <Link
            href="/handpan-scales"
            className="text-muted-foreground transition hover:text-[color:var(--accent-c)]"
          >
            {t("learn")}
          </Link>
          <Link
            href="/showrooms"
            className="text-muted-foreground transition hover:text-[color:var(--accent-c)]"
          >
            {t("showrooms")}
          </Link>
        </nav>

        <div className="flex items-center gap-4 text-sm md:gap-5">
          <Dropdown.Root>
            <Dropdown.Trigger className="hidden items-center gap-1 text-muted-foreground transition hover:text-foreground md:inline-flex">
              <Globe size={14} aria-hidden />
              {locale.toUpperCase()}
            </Dropdown.Trigger>
            <Dropdown.Content
              className="z-[80] min-w-[120px] rounded-xl border border-border bg-card p-1 shadow-2xl"
              align="end"
              sideOffset={8}
            >
              {routing.locales.map((loc) => (
                <Dropdown.Item key={loc} asChild>
                  <Link
                    href={pathname}
                    locale={loc}
                    className="block rounded-lg px-3 py-2 text-sm capitalize outline-none hover:bg-secondary"
                  >
                    {loc}
                  </Link>
                </Dropdown.Item>
              ))}
            </Dropdown.Content>
          </Dropdown.Root>

          <Dropdown.Root>
            <Dropdown.Trigger className="inline-flex items-center gap-1 text-muted-foreground transition hover:text-foreground">
              <Coins size={14} aria-hidden />
              {currency}
            </Dropdown.Trigger>
            <Dropdown.Content
              className="z-[80] min-w-[100px] rounded-xl border border-border bg-card p-1 shadow-2xl"
              align="end"
              sideOffset={8}
            >
              {checkoutCurrencies.map((c) => (
                <Dropdown.Item
                  key={c}
                  className="cursor-pointer rounded-lg px-3 py-2 text-sm capitalize outline-none hover:bg-secondary"
                  onSelect={() => setCurrency(c as CheckoutCurrency)}
                >
                  {c}
                </Dropdown.Item>
              ))}
            </Dropdown.Content>
          </Dropdown.Root>

          <CartDrawer>
            <button
              type="button"
              aria-label={t("cart")}
              className="relative text-muted-foreground transition hover:text-[color:var(--accent-c)]"
            >
              <ShoppingBag size={18} />
              <span className="absolute -right-2 -top-1.5 min-w-[1.25rem] rounded-full bg-[color:var(--accent-c)] px-1.5 text-center text-[10px] font-medium text-[color:var(--background)]">
                {count}
              </span>
            </button>
          </CartDrawer>

          <button
            type="button"
            className="border border-border px-3 py-2 text-xs uppercase tracking-[0.14em] text-muted-foreground lg:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
            aria-label="Menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "border-t border-border bg-background lg:hidden",
          mobileOpen ? "block" : "hidden"
        )}
      >
        <ul className="container-x space-y-1 py-6 text-sm">
          {shopLinks.map((item) => (
            <li key={item.key}>
              <Link
                href={item.href}
                className="block py-2.5 text-foreground"
                onClick={() => setMobileOpen(false)}
              >
                {t(item.key as "shopBeginner")}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/journal"
              className="block py-2.5"
              onClick={() => setMobileOpen(false)}
            >
              {t("journal")}
            </Link>
          </li>
          <li>
            <Link
              href="/handpan-scales"
              className="block py-2.5"
              onClick={() => setMobileOpen(false)}
            >
              {t("learn")}
            </Link>
          </li>
          <li>
            <Link
              href="/showrooms"
              className="block py-2.5"
              onClick={() => setMobileOpen(false)}
            >
              {t("showrooms")}
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
