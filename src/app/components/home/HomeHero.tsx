"use client";

import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { HeroVideoBackground } from "./HeroVideoBackground";

type HomeHeroProps = {
  eyebrow: string;
  titleLine1: string;
  titleAccent: string;
  sub: string;
  kicker: string;
  ctaPrimary: string;
  ctaSecondary: string;
  ctaLearn: string;
};

export function HomeHero({
  eyebrow,
  titleLine1,
  titleAccent,
  sub,
  kicker,
  ctaPrimary,
  ctaSecondary,
  ctaLearn,
}: HomeHeroProps) {
  return (
    <section className="relative flex min-h-[78svh] items-center overflow-hidden md:min-h-[82vh]">
      <div className="absolute inset-0">
        <HeroVideoBackground />
      </div>

      <div className="absolute inset-0 hero-fade hero-fade--video" aria-hidden />

      <div className="relative container-x pt-20 pb-12 md:pt-24 md:pb-16">
        <div className="max-w-4xl text-white">
          <p className="eyebrow eyebrow-rule !text-white/70">{eyebrow}</p>

          <h1 className="mt-6 font-display text-4xl leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-[4.25rem]">
            {titleLine1}
            <br />
            <span className="bronze-text">{titleAccent}</span>
          </h1>

          <p className="mt-8 max-w-xl text-base text-white/85 md:text-lg">{sub}</p>
          <p className="mt-3 max-w-lg text-sm italic text-white/60 md:text-base">
            {kicker}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link href="/shop" className="btn-pill btn-primary">
              {ctaPrimary} <ArrowRight size={16} aria-hidden />
            </Link>
            <Link href="/collections/beginner" className="btn-pill btn-ghost-on-dark">
              {ctaSecondary}
            </Link>
          </div>

          <div className="mt-7 flex flex-wrap gap-x-8 gap-y-3">
            <a
              href="#how-order"
              className="link-arrow !text-white hover:!border-[color:var(--bronze-accent)] hover:!text-[color:var(--bronze-accent)]"
            >
              {ctaLearn} <ArrowRight size={14} aria-hidden />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
