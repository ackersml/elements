"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { MotionScaleReveal } from "@/app/components/home/motion/motion-primitives";

export type SeriesCard = {
  key: string;
  title: string;
  href: string;
  image: string;
};

export function SeriesCardsSection({
  id,
  cards,
  variant = "default",
}: {
  id: string;
  cards: SeriesCard[];
  variant?: "default" | "canva";
}) {
  const tm = useTranslations("mag");

  if (variant === "canva") {
    return (
      <section id={id} aria-label="Shop by series" className="canva-series">
        <div className="canva-series__grid">
          {cards.map((card) => (
            <Link
              key={card.key}
              href={card.href}
              className="canva-series__card group"
            >
              <Image
                src={card.image}
                alt=""
                fill
                sizes="(max-width: 640px) 50vw, 25vw"
                className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <div className="canva-series__shade" aria-hidden />
              <span className="sr-only">{card.title}</span>
            </Link>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className="border-b border-border section-band-accent section-padding"
    >
      <div className="container-x">
        <p className="eyebrow eyebrow-rule">{tm("seriesCardsEyebrow")}</p>
        <h2
          id={`${id}-heading`}
          className="mt-4 max-w-2xl font-display text-3xl leading-[1.05] tracking-tight md:text-5xl"
        >
          {tm("categoriesTitle")}
        </h2>

        <div className="mt-10 grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
          {cards.map((card, index) => (
            <MotionScaleReveal key={card.key} delay={index * 0.08}>
              <Link
                href={card.href}
                className="series-card group relative block overflow-hidden rounded-lg border border-border"
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={card.image}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 50vw, 25vw"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                  <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent"
                    aria-hidden
                  />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-5 text-white md:p-6">
                  <h3 className="font-display text-lg md:text-xl">{card.title}</h3>
                  <span className="smallcaps mt-2 inline-flex items-center gap-2 text-[color:var(--bronze-accent)]">
                    {tm("seeMore")} <ArrowRight size={12} aria-hidden />
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
