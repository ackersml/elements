"use client";

import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function InfoStrip() {
  const t = useTranslations("mag");

  return (
    <section
      aria-label={t("infoStripLabel")}
      className="border-b border-border bg-white py-4 md:py-5"
    >
      <div className="container-x flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
        <p className="text-sm text-foreground/85 md:text-base">{t("infoStripMessage")}</p>
        <Link href="/shop" className="link-arrow shrink-0 text-sm">
          {t("infoStripCta")} <ArrowRight size={14} aria-hidden />
        </Link>
      </div>
    </section>
  );
}
