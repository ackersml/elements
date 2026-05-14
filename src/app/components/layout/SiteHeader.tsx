"use client";

import * as Dropdown from "@radix-ui/react-dropdown-menu";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { checkoutCurrencies, type CheckoutCurrency } from "@/lib/currency";
import { useCartStore } from "@/lib/cart-store";
import { cn } from "@/lib/utils";
import { ElementsLogoLink } from "@/app/components/brand/ElementsLogo";
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

export function SiteHeader() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const locale = useLocale();
  const setCurrency = useCartStore((s) => s.setCurrency);
  const currency = useCartStore((s) => s.currency);
  const lines = useCartStore((s) => s.lines);
  const count = lines.reduce((n, l) => n + l.quantity, 0);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-4 py-4 md:px-8">
        <ElementsLogoLink href="/" />

        <nav className="hidden items-center gap-8 lg:flex">
          <Dropdown.Root>
            <Dropdown.Trigger className="flex items-center gap-1 text-sm uppercase tracking-[0.14em] text-muted-foreground transition hover:text-foreground">
              {t("shop")}
              <span className="text-[10px]">▾</span>
            </Dropdown.Trigger>
            <Dropdown.Content
              className="z-[80] min-w-[240px] border border-border bg-card p-2 shadow-elements-soft"
              align="start"
              sideOffset={8}
            >
              {shopLinks.map((item) => (
                <Dropdown.Item key={item.key} asChild>
                  <Link
                    href={item.href}
                    className="block px-3 py-2 text-sm text-foreground outline-none hover:bg-secondary"
                  >
                    {t(item.key as "shopBeginner")}
                  </Link>
                </Dropdown.Item>
              ))}
            </Dropdown.Content>
          </Dropdown.Root>

          <Link
            href="/journal"
            className="text-sm uppercase tracking-[0.14em] text-muted-foreground transition hover:text-foreground"
          >
            {t("journal")}
          </Link>
          <Link
            href="/handpan-scales"
            className="text-sm uppercase tracking-[0.14em] text-muted-foreground transition hover:text-foreground"
          >
            {t("learn")}
          </Link>
          <Link
            href="/showrooms"
            className="text-sm uppercase tracking-[0.14em] text-muted-foreground transition hover:text-foreground"
          >
            {t("showrooms")}
          </Link>
        </nav>

        <div className="flex items-center gap-2 md:gap-4">
          <Dropdown.Root>
            <Dropdown.Trigger className="hidden items-center gap-1 border border-border bg-secondary/40 px-3 py-1.5 text-xs uppercase tracking-[0.12em] text-muted-foreground transition hover:border-primary/40 sm:flex">
              {locale.toUpperCase()}
            </Dropdown.Trigger>
            <Dropdown.Content
              className="z-[80] min-w-[120px] border border-border bg-card p-1 shadow-elements-soft"
              align="end"
            >
              {routing.locales.map((loc) => (
                <Dropdown.Item key={loc} asChild>
                  <Link
                    href={pathname}
                    locale={loc}
                    className="block px-3 py-2 text-sm capitalize outline-none hover:bg-secondary"
                  >
                    {loc}
                  </Link>
                </Dropdown.Item>
              ))}
            </Dropdown.Content>
          </Dropdown.Root>

          <Dropdown.Root>
            <Dropdown.Trigger className="flex items-center gap-1 border border-border bg-secondary/40 px-3 py-1.5 text-xs uppercase tracking-[0.12em] text-muted-foreground transition hover:border-primary/40">
              {currency}
            </Dropdown.Trigger>
            <Dropdown.Content
              className="z-[80] min-w-[100px] border border-border bg-card p-1 shadow-elements-soft"
              align="end"
            >
              {checkoutCurrencies.map((c) => (
                <Dropdown.Item
                  key={c}
                  className="px-3 py-2 text-sm capitalize outline-none hover:bg-secondary"
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
              className="relative border border-border bg-transparent px-4 py-2 text-xs uppercase tracking-[0.14em] text-foreground transition hover:border-primary/50"
            >
              {t("cart")}
              {count > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-medium text-primary-foreground">
                  {count}
                </span>
              )}
            </button>
          </CartDrawer>

          <button
            type="button"
            className="border border-border px-3 py-2 text-xs uppercase tracking-[0.14em] text-muted-foreground lg:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
          >
            Menu
          </button>
        </div>
      </div>

      <div
        className={cn(
          "border-t border-border lg:hidden",
          mobileOpen ? "block" : "hidden"
        )}
      >
        <div className="mx-auto max-w-[1400px] space-y-3 px-4 py-4">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            {t("shop")}
          </p>
          <div className="grid gap-2">
            {shopLinks.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="py-1 text-sm text-foreground"
                onClick={() => setMobileOpen(false)}
              >
                {t(item.key as "shopBeginner")}
              </Link>
            ))}
          </div>
          <Link
            href="/handpan-scales"
            className="block py-2 text-sm"
            onClick={() => setMobileOpen(false)}
          >
            {t("learn")}
          </Link>
          <Link
            href="/journal"
            className="block py-2 text-sm"
            onClick={() => setMobileOpen(false)}
          >
            {t("journal")}
          </Link>
          <Link
            href="/showrooms"
            className="block py-2 text-sm"
            onClick={() => setMobileOpen(false)}
          >
            {t("showrooms")}
          </Link>
        </div>
      </div>
    </header>
  );
}
