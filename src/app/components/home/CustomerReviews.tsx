"use client";

import { Star } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  MotionHeading,
  MotionReveal,
  MotionStagger,
} from "./motion/motion-primitives";

const reviews = [
  {
    quote:
      "Finally a buying path that respects how fragile these decisions feel.",
    author: "M. R.",
    location: "Amsterdam",
  },
  {
    quote: "Shipping updates matched what happened at the carrier.",
    author: "J. K.",
    location: "Berlin",
  },
  {
    quote: "The voice check after delivery made tuning anxiety disappear.",
    author: "S. L.",
    location: "London",
  },
] as const;

export function CustomerReviews({ id }: { id: string }) {
  const tm = useTranslations("mag");

  return (
    <section
      aria-labelledby={id}
      className="border-y border-border bg-white section-padding"
    >
      <div className="container-x">
        <MotionHeading
          eyebrow={tm("reviewsEyebrow")}
          title={tm("reviewsTitle")}
          titleId={id}
          center
          className="mx-auto max-w-2xl"
          eyebrowClassName="eyebrow eyebrow-rule"
          titleClassName="mt-4 font-display text-3xl tracking-tight md:text-4xl"
        />

        <MotionReveal className="mx-auto mt-5 flex max-w-2xl flex-wrap items-center justify-center gap-2" delay={0.15}>
          <div className="flex items-center gap-0.5" aria-hidden>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={18}
                className="fill-[color:var(--sale-bg)] text-[color:var(--sale-bg)]"
              />
            ))}
          </div>
          <p className="text-sm text-foreground">
            <span className="font-display text-lg">4.9</span>
            <span className="text-muted-foreground"> / 5</span>
          </p>
          <span className="text-xs text-muted-foreground">
            · {tm("reviewsVerified")}
          </span>
        </MotionReveal>

        <MotionStagger
          className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3"
          staggerDelay={0.14}
        >
          {reviews.map((r) => (
            <blockquote
              key={r.author}
              className="rounded-lg border border-border bg-[color:var(--surface-muted)] p-6 md:p-8"
            >
              <div className="flex gap-0.5" aria-hidden>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={12}
                    className="fill-[color:var(--sale-bg)] text-[color:var(--sale-bg)]"
                  />
                ))}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-foreground/90 md:text-base">
                &ldquo;{r.quote}&rdquo;
              </p>
              <footer className="mt-4 text-xs text-muted-foreground">
                {r.author} · {r.location}
              </footer>
            </blockquote>
          ))}
        </MotionStagger>

        <MotionReveal className="mt-10 text-center" delay={0.2}>
          <Link href="/shop" className="link-arrow">
            {tm("reviewsCta")}
          </Link>
        </MotionReveal>
      </div>
    </section>
  );
}
