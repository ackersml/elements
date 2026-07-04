"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { canvaAssets } from "@/lib/canva-assets";
import { MotionScaleReveal } from "@/app/components/home/motion/motion-primitives";

type ExploreTile = {
  key: string;
  title: string;
  href: string;
  image: string;
  variant: "elements" | "origins";
  productImages: string[];
};

export function CollectionExploreDual({ tiles }: { tiles: ExploreTile[] }) {
  const tm = useTranslations("mag");

  return (
    <section
      aria-label="Explore collections"
      className="border-b border-border"
    >
      <div className="grid grid-cols-1 md:grid-cols-2">
        {tiles.map((tile, index) => (
          <MotionScaleReveal key={tile.key} delay={index * 0.08}>
            <Link
              href={tile.href}
              className={`explore-dual-tile group relative flex min-h-[420px] flex-col items-center justify-end overflow-hidden p-8 md:min-h-[480px] md:p-12 ${
                tile.variant === "origins" ? "explore-dual-tile--origins" : ""
              }`}
            >
              <Image
                src={tile.image}
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
              />
              <div className="explore-dual-tile__shade" aria-hidden />
              <div className="relative z-10 flex flex-col items-center text-center">
                <p className="font-display text-2xl tracking-[0.25em] text-white md:text-3xl">
                  {tile.title}
                </p>
                <div className="mt-6 flex gap-3">
                  {tile.productImages.slice(0, 2).map((src) => (
                    <div
                      key={src}
                      className="relative h-16 w-16 overflow-hidden rounded-full border border-white/20 bg-white/10 md:h-20 md:w-20"
                    >
                      <Image
                        src={src}
                        alt=""
                        fill
                        sizes="80px"
                        className="object-contain object-center p-1"
                      />
                    </div>
                  ))}
                </div>
                <span className="btn-pill mt-8 border border-white/30 bg-white/10 text-white backdrop-blur-sm transition group-hover:bg-white group-hover:text-[color:var(--ink)]">
                  {tm("exploreCta")} <ArrowRight size={14} aria-hidden />
                </span>
              </div>
            </Link>
          </MotionScaleReveal>
        ))}
      </div>
    </section>
  );
}

export function defaultExploreTiles(
  signatureTitle: string,
  originsTitle: string,
  signatureHref: string,
  originsHref: string,
  signatureProducts: string[],
  originsProducts: string[]
): ExploreTile[] {
  return [
    {
      key: "signature",
      title: signatureTitle,
      href: signatureHref,
      image: canvaAssets.explore.elements,
      variant: "elements",
      productImages: signatureProducts,
    },
    {
      key: "origins",
      title: originsTitle,
      href: originsHref,
      image: canvaAssets.explore.origins,
      variant: "origins",
      productImages: originsProducts,
    },
  ];
}
