"use client";

import { useTranslations } from "next-intl";
import { ElementsLogomark } from "@/app/components/brand/ElementsLogo";
import { Link } from "@/i18n/navigation";

export function SiteFooter() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-secondary/20">
      <div className="hairline-rule mx-auto max-w-[1400px]" />
      <div className="mx-auto max-w-[1400px] px-4 py-16 md:px-8">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3">
              <ElementsLogomark size={40} />
              <p className="font-display text-2xl font-semibold uppercase tracking-[0.28em] text-foreground">
                lements
              </p>
            </div>
            <span className="sr-only">Elements</span>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Ceremonial instruments and sound tools — editorial presentation,
              insured logistics, human tuning support from inquiry to unboxing.
            </p>
          </div>
          <div className="flex flex-wrap gap-10 md:col-span-4 md:justify-end">
            <div className="space-y-3 text-sm">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Shop
              </p>
              <Link href="/shop" className="block text-foreground hover:text-primary">
                All instruments
              </Link>
              <Link
                href="/shop?collection=beginner"
                className="block text-muted-foreground hover:text-foreground"
              >
                Beginner
              </Link>
              <Link
                href="/shop?collection=sound-healing"
                className="block text-muted-foreground hover:text-foreground"
              >
                Sound healing
              </Link>
            </div>
            <div className="space-y-3 text-sm">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Support
              </p>
              <Link href="/track" className="block text-muted-foreground hover:text-foreground">
                {t("track")}
              </Link>
              <Link href="/shipping" className="block text-muted-foreground hover:text-foreground">
                {t("shipping")}
              </Link>
              <Link href="/returns" className="block text-muted-foreground hover:text-foreground">
                {t("returns")}
              </Link>
              <Link href="/privacy" className="block text-muted-foreground hover:text-foreground">
                {t("privacy")}
              </Link>
              <Link href="/contact" className="block text-muted-foreground hover:text-foreground">
                {t("contact")}
              </Link>
            </div>
          </div>
          <div className="md:col-span-3 md:text-right">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Payments
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Visa · Mastercard · Amex · Apple Pay · Google Pay
            </p>
            <p className="mt-6 text-xs text-muted-foreground">
              {t("rights", { year })}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
