"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/app/components/home/motion/useReducedMotion";

const EASE = [0.16, 1, 0.3, 1] as const;

export type PageHeroCta = {
  label: string;
  href: string;
};

type PageHeroProps = {
  eyebrow: string;
  title: string;
  titleAccent?: string;
  sub?: string;
  kicker?: string;
  primaryCta?: PageHeroCta;
  secondaryCta?: PageHeroCta;
  /** Atmospheric backdrop photo, heavily darkened to read as forest silk. */
  backgroundImage?: string;
  /** Floating instrument cutout (transparent PNG) shown on the right. */
  floatImage?: string;
  floatAlt?: string;
  align?: "left" | "center";
};

export function PageHero({
  eyebrow,
  title,
  titleAccent,
  sub,
  kicker,
  primaryCta,
  secondaryCta,
  backgroundImage = "/images/sound-healing-2.jpg",
  floatImage,
  floatAlt = "",
  align = "left",
}: PageHeroProps) {
  const reduced = useReducedMotion();
  const centered = align === "center";

  return (
    <section className="relative isolate overflow-hidden hero-home">
      {/* Forest silk backdrop */}
      <div className="absolute inset-0" aria-hidden>
        <Image
          src={backgroundImage}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-35"
        />
        <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_15%_10%,rgba(62,74,60,0.55)_0%,rgba(47,58,46,0.85)_45%,rgba(31,37,28,0.96)_100%)]" />
        <div className="grain" />
      </div>

      {/* Floating bronze orbs */}
      {!reduced && (
        <>
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -left-10 top-24 h-64 w-64 rounded-full bg-[color:var(--bronze-accent)]/10 blur-3xl"
            animate={{ y: [0, -26, 0], opacity: [0.25, 0.45, 0.25] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            aria-hidden
            className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 rounded-full bg-[color:var(--forest-moss)]/30 blur-3xl"
            animate={{ y: [0, 32, 0], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
        </>
      )}

      <div
        className={cn(
          "relative container-x grid items-center gap-12 pb-20 pt-28 md:pb-28 md:pt-36 lg:gap-16",
          floatImage ? "lg:grid-cols-[1.05fr_0.95fr]" : "lg:grid-cols-1"
        )}
      >
        <div
          className={cn(
            "max-w-2xl text-[color:var(--sandstone)]",
            centered && "mx-auto text-center"
          )}
        >
          <motion.p
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
            className={cn(
              "eyebrow eyebrow-rule !text-[color:var(--bronze-accent)]",
              centered && "[&::before]:hidden"
            )}
          >
            {eyebrow}
          </motion.p>

          <motion.h1
            initial={reduced ? false : { opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.22, ease: EASE }}
            className="mt-6 font-display text-4xl leading-[1.04] tracking-tight text-white sm:text-5xl md:text-6xl"
          >
            {title}
            {titleAccent ? (
              <>
                <br />
                <span className="bronze-text">{titleAccent}</span>
              </>
            ) : null}
          </motion.h1>

          {sub ? (
            <motion.p
              initial={reduced ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.36, ease: EASE }}
              className={cn(
                "mt-7 max-w-xl text-base leading-relaxed text-[color:var(--sandstone)]/80 md:text-lg",
                centered && "mx-auto"
              )}
            >
              {sub}
            </motion.p>
          ) : null}

          {kicker ? (
            <motion.p
              initial={reduced ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.46, ease: EASE }}
              className="mt-3 text-sm italic text-[color:var(--sandstone)]/55 md:text-base"
            >
              {kicker}
            </motion.p>
          ) : null}

          {(primaryCta || secondaryCta) && (
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.56, ease: EASE }}
              className={cn(
                "mt-10 flex flex-wrap items-center gap-4",
                centered && "justify-center"
              )}
            >
              {primaryCta ? (
                <div className="flex items-center gap-3">
                  <Link
                    href={primaryCta.href}
                    className="inline-flex min-h-12 items-center rounded-full bg-[color:var(--sandstone)] px-7 text-xs font-bold uppercase tracking-[0.14em] text-[color:var(--deep-soil)] transition hover:bg-white"
                  >
                    {primaryCta.label}
                  </Link>
                  <Link
                    href={primaryCta.href}
                    aria-hidden
                    tabIndex={-1}
                    className="grid h-12 w-12 place-items-center rounded-full border border-[color:var(--sandstone)]/40 text-[color:var(--sandstone)] transition hover:border-[color:var(--bronze-accent)] hover:text-[color:var(--bronze-accent)]"
                  >
                    <ArrowRight size={18} />
                  </Link>
                </div>
              ) : null}
              {secondaryCta ? (
                <Link
                  href={secondaryCta.href}
                  className="btn-pill btn-ghost-on-dark"
                >
                  {secondaryCta.label}
                </Link>
              ) : null}
            </motion.div>
          )}
        </div>

        {floatImage ? (
          <motion.div
            initial={reduced ? false : { opacity: 0, scale: 0.94, x: 30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: EASE }}
            className="relative hidden lg:block"
          >
            <motion.div
              animate={reduced ? undefined : { y: [0, -18, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="relative mx-auto aspect-square w-full max-w-lg"
            >
              <Image
                src={floatImage}
                alt={floatAlt}
                fill
                priority
                sizes="(max-width: 1024px) 0px, 40vw"
                className="object-contain drop-shadow-[0_40px_60px_rgba(0,0,0,0.55)]"
              />
            </motion.div>
          </motion.div>
        ) : null}
      </div>
    </section>
  );
}
