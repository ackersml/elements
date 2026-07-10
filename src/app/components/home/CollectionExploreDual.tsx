"use client";

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
    <section aria-label="Explore collections">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {tiles.map((tile, index) => (
          <MotionScaleReveal key={tile.key} delay={index * 0.08}>
            <Link
              href={tile.href}
              aria-label={`${tm("exploreCta")} ${tile.title}`}
              className={`explore-dual-tile group relative flex min-h-[540px] flex-col items-center justify-end overflow-hidden p-8 md:min-h-[640px] md:p-12 ${
                tile.variant === "origins" ? "explore-dual-tile--origins" : ""
              }`}
            >
              <Image
                src={tile.image}
                alt={tile.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
              />
              <div className="explore-dual-tile__shade" aria-hidden />
              <span className="btn-pill relative z-10 !bg-white !px-8 !text-[color:var(--ink)] font-medium shadow-lg transition group-hover:!bg-white/90">
                {tm("exploreCta")}
              </span>
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
