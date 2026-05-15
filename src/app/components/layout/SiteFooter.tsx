"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function SiteFooter() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-border">
      <div className="container-x flex flex-col items-start justify-between gap-6 py-10 text-sm text-muted-foreground md:flex-row md:items-center">
        <p>{t("rights", { year })}</p>
        <nav className="flex flex-wrap gap-6">
          <Link href="/shipping" className="transition hover:text-foreground">
            {t("shipping")}
          </Link>
          <Link href="/returns" className="transition hover:text-foreground">
            {t("returns")}
          </Link>
          <Link href="/contact" className="transition hover:text-foreground">
            {t("contact")}
          </Link>
          <Link href="/privacy" className="transition hover:text-foreground">
            {t("privacy")}
          </Link>
          <Link href="/track" className="transition hover:text-foreground">
            {t("track")}
          </Link>
        </nav>
      </div>
    </footer>
  );
}
