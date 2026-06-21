"use client";

import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { Link } from "@/i18n/navigation";
import { SectionBackdrop } from "@/app/components/layout/SectionBackdrop";
import { ProductCard } from "@/app/components/shop/ProductCard";
import type { Product } from "@/lib/products";
import { cn } from "@/lib/utils";
import { MotionReveal, MotionStagger } from "./motion/motion-primitives";

type RailBand = "white" | "accent" | "muted" | "sandstone" | "forest";

type ProductRailProps = {
  id: string;
  eyebrow?: string;
  title: string;
  description?: string;
  products: Product[];
  ctaLabel: string;
  ctaHref: string;
  showElement?: boolean;
  collectionScene?: boolean;
  aspect?: "square" | "4/3" | "video" | "21/9" | "3/4" | "4/5";
  className?: string;
  band?: RailBand;
  backdrop?: string;
  backdropTint?: "white" | "cream" | "forest" | "sandstone";
  beforeRail?: ReactNode;
};

const bandClass: Record<RailBand, string> = {
  white: "bg-white",
  accent: "section-band-accent",
  muted: "section-band-muted",
  sandstone: "section-band-sandstone",
  forest: "section-band-forest",
};

export function ProductRail({
  id,
  eyebrow,
  title,
  description,
  products,
  ctaLabel,
  ctaHref,
  showElement = false,
  collectionScene = false,
  aspect = "square",
  className,
  band = "accent",
  backdrop,
  backdropTint = "cream",
  beforeRail,
}: ProductRailProps) {
  if (products.length === 0) return null;

  return (
    <section
      aria-labelledby={id}
      className={cn(
        "relative overflow-hidden border-b border-border section-padding",
        bandClass[band],
        className
      )}
    >
      {backdrop ? (
        <SectionBackdrop src={backdrop} tint={backdropTint} opacity={0.22} />
      ) : null}

      <div className="relative container-x">
        <MotionReveal className="max-w-3xl">
          {eyebrow ? (
            <p className="eyebrow eyebrow-rule">{eyebrow}</p>
          ) : null}
          <h2
            id={id}
            className="mt-4 font-display text-3xl leading-[1.05] tracking-tight md:text-5xl"
          >
            {title}
          </h2>
          {description ? (
            <p className="mt-4 max-w-2xl text-muted-foreground">{description}</p>
          ) : null}
        </MotionReveal>

        {beforeRail ? <div className="mt-8">{beforeRail}</div> : null}

        <div className="product-rail mt-10">
          <MotionStagger
            className="product-rail-track no-scrollbar"
            childClassName="product-rail-item"
            staggerDelay={0.08}
          >
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                aspect={aspect}
                showElement={showElement}
                collectionScene={collectionScene}
                layout="rail"
              />
            ))}
          </MotionStagger>
        </div>

        <MotionReveal className="mt-10 flex justify-end" delay={0.1}>
          <Link href={ctaHref} className="btn-pill btn-primary">
            {ctaLabel} <ArrowRight size={16} aria-hidden />
          </Link>
        </MotionReveal>
      </div>
    </section>
  );
}
