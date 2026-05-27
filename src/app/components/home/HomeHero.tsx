"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { SiteHeader } from "@/app/components/layout/SiteHeader";

const HERO_HANDPAN_SRC = "/products/d-kurd-12.png";

export function HomeHero() {
  const t = useTranslations("hero");

  return (
    <section className="hero-home relative flex min-h-[100svh] flex-col overflow-hidden">
      <Image
        src="/images/hero-bg.png"
        alt=""
        fill
        priority
        className="object-cover"
        aria-hidden
      />
      <div className="hero-fade absolute inset-0" aria-hidden />
      <div className="hero-home-smoke absolute inset-0" aria-hidden />
      <div className="grain absolute inset-0 z-[1]" aria-hidden />

      <SiteHeader variant="home" />

      <div className="relative z-10 container-x flex flex-1 flex-col justify-center gap-10 pb-16 pt-28 md:pb-20 md:pt-32 lg:grid lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:items-center lg:gap-8">
        <div className="max-w-xl lg:max-w-2xl">
          <h1 className="font-body text-[2rem] font-semibold leading-[1.08] tracking-tight text-[var(--sandstone)] sm:text-[2.35rem] md:text-5xl lg:text-[3.35rem] lg:leading-[1.06]">
            {t("title")}
          </h1>
          <p className="mt-6 max-w-lg text-base font-normal leading-relaxed text-[color-mix(in_oklab,var(--sandstone)_88%,transparent)] md:mt-7 md:text-[1.05rem]">
            {t("sub")}
          </p>
          <div className="mt-9 flex items-center gap-2 md:mt-10">
            <Link href="/shop" className="btn-pill btn-primary min-h-[52px] px-8 text-[0.95rem]">
              {t("ctaPrimary")}
            </Link>
            <Link
              href="/shop"
              className="btn-hero-circle"
              aria-label={t("ctaPrimary")}
            >
              <ArrowRight size={18} strokeWidth={2} aria-hidden />
            </Link>
          </div>
        </div>

        <div className="relative flex justify-center lg:justify-end lg:overflow-visible">
          <Image
            src={HERO_HANDPAN_SRC}
            alt="Golden handpan instrument"
            width={1200}
            height={1200}
            priority
            className="hero-home-handpan h-auto w-full max-w-sm object-contain sm:max-w-md lg:absolute lg:right-0 lg:top-1/2 lg:max-w-none lg:w-[min(52vw,680px)] lg:-translate-y-1/2 lg:translate-x-[10%]"
          />
        </div>
      </div>
    </section>
  );
}
