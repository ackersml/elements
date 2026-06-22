"use client";

import * as Dropdown from "@radix-ui/react-dropdown-menu";
import { ChevronDown, Coins, Globe, Menu, ShoppingBag, X } from "lucide-react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { checkoutCurrencies, type CheckoutCurrency } from "@/lib/currency";
import { useCartStore } from "@/lib/cart-store";
import {
  getCollectionPreviewImage,
  shopCollectionHref,
  shopNavCollections,
} from "@/lib/shop-nav";
import { cn } from "@/lib/utils";
import { ElementsLogoLink } from "@/app/components/brand/ElementsLogo";
import { CartDrawer } from "./CartDrawer";

const shopLinks = shopNavCollections.map((item) => ({
  key: item.key,
  href: shopCollectionHref(item.collection),
}));

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
  const [scrolled, setScrolled] = useState(false);

  const isOverlay = variant === "overlay";

  useEffect(() => {
    if (!isOverlay) return;
    const onScroll = () => setScrolled(window.scrollY > 72);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isOverlay]);

  const shell = isOverlay
    ? cn(
        "absolute inset-x-0 top-0 z-30 transition-[padding,background-color,backdrop-filter] duration-500",
        scrolled && "bg-black/25 backdrop-blur-md"
      )
    : "sticky top-0 z-30 border-b border-border bg-white/95 backdrop-blur-md shadow-elements-soft";

  const navLink = isOverlay
    ? "text-white/80 transition hover:text-white"
    : "text-muted-foreground transition hover:text-foreground";

  const iconBtn = isOverlay
    ? "text-white/80 transition hover:text-white"
    : "text-muted-foreground transition hover:text-foreground";

  return (
    <header className={shell}>
      <div
        className={cn(
          "container-x flex items-center justify-between transition-[padding] duration-500",
          isOverlay && scrolled ? "py-3 md:py-3.5" : "py-4 md:py-5"
        )}
      >
        <ElementsLogoLink
          compact
          className={cn(
            isOverlay ? "text-white" : "text-foreground",
            "origin-left transition-transform duration-500",
            isOverlay && scrolled && "scale-[0.92]"
          )}
        />

        <nav className="hidden items-center gap-8 text-sm lg:flex">
          <div className="group relative">
            <Link
              href="/products"
              className={cn("inline-flex items-center gap-1", navLink)}
            >
              {t("products")}
              <ChevronDown size={14} aria-hidden />
            </Link>
            <div className="invisible absolute left-1/2 top-full z-[80] -translate-x-1/2 pt-4 opacity-0 transition group-hover:visible group-hover:opacity-100">
              <div className="w-[min(92vw,42rem)] rounded-lg border border-border bg-white p-4 shadow-2xl md:p-5">
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
                  {shopNavCollections.map((item) => {
                    const preview = getCollectionPreviewImage(item.collection);
                    return (
                      <Link
                        key={item.key}
                        href={shopCollectionHref(item.collection)}
                        className="group/item block rounded-lg p-1.5 transition hover:bg-secondary"
                      >
                        <div className="relative aspect-square overflow-hidden rounded-md border border-border bg-white">
                          {preview ? (
                            <Image
                              src={preview}
                              alt=""
                              fill
                              sizes="96px"
                              className="object-contain p-2 transition duration-500 group-hover/item:scale-[1.04]"
                            />
                          ) : null}
                        </div>
                        <span className="mt-2 block text-center text-xs leading-tight text-foreground transition group-hover/item:text-[color:var(--sale-bg)]">
                          {t(item.key as "shopBeginner")}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <Link href="/services" className={navLink}>
            {t("services")}
          </Link>
          <Link href="/about" className={navLink}>
            {t("about")}
          </Link>
          <Link href="/contact" className={navLink}>
            {t("contact")}
          </Link>
        </nav>

        <div className="flex items-center gap-4 text-sm md:gap-5">
          <Dropdown.Root>
            <Dropdown.Trigger
              className={cn(
                "hidden items-center gap-1 md:inline-flex",
                iconBtn
              )}
            >
              <Globe size={14} aria-hidden />
              {locale.toUpperCase()}
            </Dropdown.Trigger>
            <Dropdown.Content
              className="z-[80] min-w-[120px] rounded-lg border border-border bg-white p-1 shadow-2xl"
              align="end"
              sideOffset={8}
            >
              {routing.locales.map((loc) => (
                <Dropdown.Item key={loc} asChild>
                  <Link
                    href={pathname}
                    locale={loc}
                    className="block rounded-md px-3 py-2 text-sm capitalize outline-none hover:bg-secondary"
                  >
                    {loc}
                  </Link>
                </Dropdown.Item>
              ))}
            </Dropdown.Content>
          </Dropdown.Root>

          <Dropdown.Root>
            <Dropdown.Trigger className={cn("inline-flex items-center gap-1", iconBtn)}>
              <Coins size={14} aria-hidden />
              {currency}
            </Dropdown.Trigger>
            <Dropdown.Content
              className="z-[80] min-w-[100px] rounded-lg border border-border bg-white p-1 shadow-2xl"
              align="end"
              sideOffset={8}
            >
              {checkoutCurrencies.map((c) => (
                <Dropdown.Item
                  key={c}
                  className="cursor-pointer rounded-md px-3 py-2 text-sm capitalize outline-none hover:bg-secondary"
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
              className={cn("relative", iconBtn)}
            >
              <ShoppingBag size={18} />
              <span
                className={cn(
                  "absolute -right-2 -top-1.5 min-w-[1.25rem] rounded-full px-1.5 text-center text-[10px] font-semibold",
                  isOverlay
                    ? "bg-white text-[color:var(--ink)]"
                    : "bg-[color:var(--cta-bg)] text-white"
                )}
              >
                {count}
              </span>
            </button>
          </CartDrawer>

          <button
            type="button"
            className={cn(
              "border px-3 py-2 text-xs uppercase tracking-[0.14em] lg:hidden",
              isOverlay
                ? "border-white/30 text-white"
                : "border-border text-muted-foreground"
            )}
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
          "border-t border-border bg-white lg:hidden",
          mobileOpen ? "block" : "hidden"
        )}
      >
        <ul className="container-x space-y-1 py-6 text-sm">
          <li>
            <Link
              href="/products"
              className="block py-2.5 font-display text-base text-foreground"
              onClick={() => setMobileOpen(false)}
            >
              {t("products")}
            </Link>
          </li>
          {shopLinks.map((item) => (
            <li key={item.key}>
              <Link
                href={item.href}
                className="block py-2 pl-4 text-muted-foreground"
                onClick={() => setMobileOpen(false)}
              >
                {t(item.key as "shopBeginner")}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/services"
              className="block py-2.5 font-display text-base text-foreground"
              onClick={() => setMobileOpen(false)}
            >
              {t("services")}
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="block py-2.5 font-display text-base text-foreground"
              onClick={() => setMobileOpen(false)}
            >
              {t("about")}
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className="block py-2.5 font-display text-base text-foreground"
              onClick={() => setMobileOpen(false)}
            >
              {t("contact")}
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
