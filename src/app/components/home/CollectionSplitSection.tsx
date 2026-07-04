"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { shopCollectionHref } from "@/lib/shop-nav";
import { MotionScaleReveal } from "@/app/components/home/motion/motion-primitives";

const SIGNATURE_HERO = "/images/collection/signature-series-hero.png";
const ORIGINS_HERO = "/images/collection/origins-hero.png";

type CollectionTile = {
  key: "signature" | "origins";
  titleKey: "shopSignature" | "shopOrigins";
  blurbKey: "signatureCollectionBlurb" | "originsCollectionBlurb";
  href: string;
  image: string;
  imageAlt: string;
};

export function CollectionSplitSection({ id }: { id: string }) {
  const tn = useTranslations("nav");
  const tm = useTranslations("mag");

  const tiles: CollectionTile[] = [
    {
      key: "signature",
      titleKey: "shopSignature",
      blurbKey: "signatureCollectionBlurb",
      href: shopCollectionHref("signature"),
      image: SIGNATURE_HERO,
      imageAlt: "Elements Handpan Signature Series",
    },
    {
      key: "origins",
      titleKey: "shopOrigins",
      blurbKey: "originsCollectionBlurb",
      href: shopCollectionHref("origins"),
      image: ORIGINS_HERO,
      imageAlt: "Elements Handpan Origins",
    },
  ];

  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className="border-b border-border section-band-accent section-padding"
    >
      <div className="container-x">
        <p className="eyebrow eyebrow-rule">{tm("collectionEyebrow")}</p>
        <h2
          id={`${id}-heading`}
          className="mt-4 max-w-2xl font-display text-3xl leading-[1.05] tracking-tight md:text-5xl"
        >
          {tm("collectionTitle")}
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-2">
          {tiles.map((tile, index) => (
            <MotionScaleReveal key={tile.key} delay={index * 0.1}>
              <Link
                href={tile.href}
                className="collection-split-tile group relative block overflow-hidden rounded-xl border border-border bg-black"
              >
                <div className="relative aspect-[4/3] overflow-hidden md:aspect-[16/10]">
                  <Image
                    src={tile.image}
                    alt={tile.imageAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                  <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent"
                    aria-hidden
                  />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-6 text-white md:p-8">
                  <p className="smallcaps text-[color:var(--bronze-accent)]">
                    Elements Handpan
                  </p>
                  <h3 className="mt-2 font-display text-2xl leading-tight md:text-3xl">
                    {tn(tile.titleKey)}
                  </h3>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-white/75">
                    {tm(tile.blurbKey)}
                  </p>
                  <span className="smallcaps mt-5 inline-flex items-center gap-2 text-[color:var(--bronze-accent)] transition group-hover:gap-3">
                    {tm("seeMore")} <ArrowRight size={14} aria-hidden />
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
