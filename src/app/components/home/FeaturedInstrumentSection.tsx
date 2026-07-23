"use client";

import { ArrowRight, Flame } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ProductPhoto } from "@/app/components/shop/ProductPhoto";
import { MoodLoopVideo } from "@/app/components/home/MoodLoopVideo";
import { canvaAssets } from "@/lib/canva-assets";
import { brandLockup } from "@/lib/brand/elements-brand";
import type { Product } from "@/lib/products";

/**
 * Looping demo clip for the featured stage (extracted from the Drive demo).
 * Keyed by slug — the D Kurd 10 clip is the same instrument in both series, so
 * both slugs map to it. The Origins key is the one in use while Signature is
 * hidden; keep the Signature key so the clip returns with the series.
 */
const FEATURED_VIDEOS: Record<string, { src: string; poster: string }> = {
  "signature-d-kurd-10": {
    src: "/videos/featured-d-kurd-10.mp4",
    poster: "/videos/featured-d-kurd-10.jpg",
  },
  "origins-d-kurd-10": {
    src: "/videos/featured-d-kurd-10.mp4",
    poster: "/videos/featured-d-kurd-10.jpg",
  },
};

type FeaturedInstrumentSectionProps = {
  product: Product;
  id: string;
  variant?: "default" | "canva";
};

export function FeaturedInstrumentSection({
  product,
  id,
  variant = "default",
}: FeaturedInstrumentSectionProps) {
  const tm = useTranslations("mag");
  const featuredVideo = FEATURED_VIDEOS[product.slug];

  if (variant === "canva") {
    return (
      <section
        id={id}
        aria-labelledby={`${id}-title`}
        className="canva-featured relative overflow-hidden"
      >
        <div className="featured-instrument-glow" aria-hidden />

        <div className="canva-featured__inner">
          <div className="canva-featured__brand">
            <Image
              src={brandLockup.logomarkSrc}
              alt=""
              width={40}
              height={40}
              className="opacity-90"
              aria-hidden
            />
            <p className="canva-featured__wordmark">{brandLockup.wordmark}</p>
          </div>

          <div className="canva-featured__stage">
            {featuredVideo ? (
              <MoodLoopVideo
                src={featuredVideo.src}
                poster={featuredVideo.poster}
                label={`${product.title} being played`}
                className="h-full w-full object-cover object-center"
              />
            ) : (
              <Image
                src={canvaAssets.featuredLifestyle}
                alt={product.title}
                fill
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover object-center"
                priority
              />
            )}
          </div>

          <div className="canva-featured__bar">
            <div className="canva-featured__bar-left">
              <Flame size={18} className="text-[color:var(--bronze-accent)]" aria-hidden />
              <div>
                <h2 id={`${id}-title`} className="canva-featured__title">
                  {product.title}
                </h2>
                <p className="canva-featured__series">{tm("premiumSeries")}</p>
              </div>
            </div>
            <Link href={`/shop/${product.slug}`} className="canva-featured__cta">
              {tm("featuredCta").toUpperCase()} <ArrowRight size={14} aria-hidden />
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="featured-instrument relative overflow-hidden border-b border-white/10 section-band-dark"
    >
      <div className="featured-instrument-glow" aria-hidden />
      <div className="grain elements-grain" aria-hidden />

      <div className="relative container-x py-16 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <Image
            src={brandLockup.logomarkSrc}
            alt=""
            width={48}
            height={48}
            className="mx-auto opacity-90"
            aria-hidden
          />
          <p className="mt-4 font-display text-sm tracking-[0.35em] text-white/50">
            {brandLockup.wordmark}
          </p>
        </div>

        <div className="relative mx-auto mt-10 max-w-2xl">
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
            <Image
              src={canvaAssets.featuredLifestyle}
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 672px"
              className="object-cover object-center"
              priority
            />
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20"
              aria-hidden
            />
            <div className="absolute inset-x-0 bottom-0 flex justify-center pb-6 md:pb-10">
              <ProductPhoto
                src={product.heroImageUrl}
                alt={product.title}
                aspect="square"
                variant="studio"
                sizes="240px"
                frameClassName="!w-40 !max-w-[40vw] md:!w-52 shadow-2xl"
              />
            </div>
          </div>
        </div>

        <div className="mt-10 text-center">
          <div className="inline-flex items-center gap-2 text-[color:var(--bronze-accent)]">
            <Flame size={14} aria-hidden />
            <p className="smallcaps">{tm("featuredEyebrow")}</p>
          </div>
          <h2
            id={`${id}-title`}
            className="mt-3 font-display text-3xl tracking-tight text-white md:text-4xl"
          >
            {product.title}
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-[color:var(--sandstone)]/75 md:text-base">
            {product.description}
          </p>
          <Link
            href={`/shop/${product.slug}`}
            className="btn-pill btn-primary mt-8 inline-flex"
          >
            {tm("featuredCta")} <ArrowRight size={16} aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
