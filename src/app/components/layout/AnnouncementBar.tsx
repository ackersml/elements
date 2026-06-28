"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function AnnouncementBar() {
  const t = useTranslations("mag");

  return (
    <div className="announcement-bar relative z-40 border-b border-white/10 bg-[color:var(--ink)] text-white">
      <div className="container-x flex min-h-10 items-center justify-center py-2 text-center text-[11px] uppercase tracking-[0.18em] md:text-xs">
        <p>{t("announcementText")}</p>
        <Link
          href="/shipping"
          className="ml-2 hidden underline decoration-white/40 underline-offset-4 transition hover:decoration-white sm:inline"
        >
          {t("announcementLink")}
        </Link>
      </div>
    </div>
  );
}
