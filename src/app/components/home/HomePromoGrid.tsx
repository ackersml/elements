"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { MotionReveal, MotionScaleReveal } from "./motion/motion-primitives";

type PromoTile = {
  key: string;
  title: string;
  subtitle: string;
  href: string;
  image: string;
  accent?: boolean;
};

export function HomePromoGrid() {
  const tm = useTranslations("mag");
  const tn = useTranslations("nav");

  const tiles: PromoTile[] = [
    {
      key: "all",
      title: tm("promoAllTitle"),
      subtitle: tm("promoAllSub"),
      href: "/shop",
      image: "/images/handpan-lifestyle-11.jpg",
      accent: true,
    },
    {
      key: "extended",
      title: tn("shopExtended"),
      subtitle: tm("promoExtendedSub"),
      href: "/collections/extended",
      image: "/images/handpan-lifestyle-9.jpg",
    },
    {
      key: "sound",
      title: tm("catSound"),
      subtitle: tm("promoSoundSub"),
      href: "/services",
      image: "/images/sound-healing-15.jpg",
    },
    {
      key: "cases",
      title: tm("catCases"),
      subtitle: tm("promoCasesSub"),
      href: "/collections/accessories",
      image: "/images/handpan-lifestyle-6.jpg",
      accent: true,
    },
  ];

  return (
    <section
      aria-labelledby="home-promo-grid"
      className="border-b border-border section-band-sandstone section-padding"
    >
      <div className="container-x">
        <MotionReveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow eyebrow-rule">{tm("promoEyebrow")}</p>
          <h2
            id="home-promo-grid"
            className="mt-4 font-display text-3xl leading-tight tracking-tight md:text-5xl"
          >
            {tm("promoTitle")}
          </h2>
        </MotionReveal>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-6">
          {tiles.map((tile, index) => (
            <MotionScaleReveal key={tile.key} delay={index * 0.1}>
              <Link
                href={tile.href}
                className="home-promo-tile home-promo-tile--motion group relative block min-h-[220px] overflow-hidden rounded-xl border border-border md:min-h-[280px]"
              >
              <Image
                src={tile.image}
                alt=""
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-black/10"
                aria-hidden
              />
              {tile.accent ? (
                <div
                  className="absolute inset-0 bg-[color:var(--sale-bg)]/15 mix-blend-multiply"
                  aria-hidden
                />
              ) : null}
              <div className="absolute inset-x-0 bottom-0 p-6 text-white md:p-8">
                <p className="smallcaps text-[color:var(--bronze-accent)]">
                  {tile.subtitle}
                </p>
                <h3 className="mt-2 font-display text-2xl md:text-3xl">{tile.title}</h3>
                <span className="mt-4 inline-flex items-center gap-2 text-sm uppercase tracking-[0.14em] text-white/90 transition group-hover:text-[color:var(--bronze-accent)]">
                  Shop now <ArrowRight size={14} aria-hidden />
                </span>
              </div>
            </Link>
            </MotionScaleReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
