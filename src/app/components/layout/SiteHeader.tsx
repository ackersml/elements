"use client";

import * as Dropdown from "@radix-ui/react-dropdown-menu";
import {
  ChevronDown,
  Coins,
  Globe,
  Menu,
  Search,
  ShoppingCart,
  ShoppingBag,
  Truck,
  X,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useState, type FormEvent } from "react";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { checkoutCurrencies, type CheckoutCurrency } from "@/lib/currency";
import { useCartStore } from "@/lib/cart-store";
import { shopCollectionHref, shopNavCollections } from "@/lib/shop-nav";
import { cn } from "@/lib/utils";
import { ElementsLogoLink } from "@/app/components/brand/ElementsLogo";
import { CartDrawer } from "./CartDrawer";

const shopLinks = shopNavCollections.map((item) => ({
  key: item.key,
  href: shopCollectionHref(item.collection),
}));

export type SiteHeaderVariant = "sticky" | "overlay" | "home";

const homeNavLinks = [
  { key: "products" as const, href: "/shop" },
  { key: "services" as const, href: "/showrooms" },
  { key: "about" as const, href: "/journal" },
  { key: "contact" as const, href: "/contact" },
];

export function SiteHeader({ variant = "sticky" }: { variant?: SiteHeaderVariant }) {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const locale = useLocale();
  const router = useRouter();
  const setCurrency = useCartStore((s) => s.setCurrency);
  const currency = useCartStore((s) => s.currency);
  const lines = useCartStore((s) => s.lines);
  const count = lines.reduce((n, l) => n + l.quantity, 0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const shell =
    variant === "overlay" || variant === "home"
      ? "absolute inset-x-0 top-0 z-30"
      : "sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur";

  const onSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
    const q = searchQuery.trim();
    router.push(q ? `/shop?q=${encodeURIComponent(q)}` : "/shop");
    setMobileOpen(false);
  };

  if (variant === "home") {
    return (
      <header className={shell}>
        <div className="container-x relative flex items-center justify-between gap-4 py-5 md:py-6">
          <ElementsLogoLink compact variant="light" />

          <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 md:flex">
            {homeNavLinks.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="font-body text-[0.82rem] font-medium tracking-[0.04em] text-[color-mix(in_oklab,var(--sandstone)_82%,transparent)] transition hover:text-[var(--sandstone)]"
              >
                {t(item.key)}
              </Link>
            ))}
          </nav>

          <div className="flex items-center justify-end gap-2 sm:gap-3 md:gap-4">
            <span className="hidden items-center gap-2 rounded-full border border-[color-mix(in_oklab,var(--sandstone)_35%,transparent)] px-3 py-2 text-[0.78rem] text-[var(--sandstone)] md:inline-flex">
              <Truck size={14} strokeWidth={1.75} aria-hidden />
              {t("regionIndonesia")}
            </span>

            <form
              onSubmit={onSearchSubmit}
              className="hidden min-w-[140px] items-center rounded-full bg-[var(--sandstone)] px-4 py-2.5 sm:flex md:min-w-[168px]"
            >
              <label htmlFor="hero-search" className="sr-only">
                {t("search")}
              </label>
              <input
                id="hero-search"
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t("search")}
                className="w-full min-w-0 flex-1 bg-transparent text-[0.82rem] text-[var(--deep-soil)] placeholder:text-[color-mix(in_oklab,var(--deep-soil)_55%,transparent)] outline-none"
              />
              <Search
                size={16}
                className="shrink-0 text-[color-mix(in_oklab,var(--deep-soil)_70%,transparent)]"
                aria-hidden
              />
            </form>

            <CartDrawer>
              <button
                type="button"
                aria-label={t("cart")}
                className="relative inline-flex h-11 w-11 items-center justify-center rounded-full bg-[var(--sandstone)] text-[var(--deep-soil)] transition hover:bg-[#f6f2ec]"
              >
                <ShoppingCart size={18} strokeWidth={1.75} />
                {count > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[var(--deep-soil)] px-1 text-[9px] font-medium text-[var(--sandstone)]">
                    {count}
                  </span>
                )}
              </button>
            </CartDrawer>

            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[color-mix(in_oklab,var(--sandstone)_35%,transparent)] text-[var(--sandstone)] md:hidden"
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
            "border-t border-[color-mix(in_oklab,var(--sandstone)_18%,transparent)] bg-[color-mix(in_oklab,var(--pine-grove)_92%,black)] backdrop-blur md:hidden",
            mobileOpen ? "block" : "hidden"
          )}
        >
          <ul className="container-x space-y-1 py-6 text-sm">
            {homeNavLinks.map((item) => (
              <li key={item.key}>
                <Link
                  href={item.href}
                  className="block py-2.5 text-[var(--sandstone)]"
                  onClick={() => setMobileOpen(false)}
                >
                  {t(item.key)}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <form
                onSubmit={onSearchSubmit}
                className="flex items-center rounded-full bg-[var(--sandstone)] px-4 py-2.5"
              >
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t("search")}
                  className="w-full bg-transparent text-sm text-[var(--deep-soil)] outline-none"
                />
                <Search size={16} className="text-[var(--deep-soil)]" aria-hidden />
              </form>
            </li>
          </ul>
        </div>
      </header>
    );
  }

  return (
    <header className={shell}>
      <div className="container-x flex items-center justify-between py-4 md:py-6">
        <ElementsLogoLink compact variant="light" />

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
