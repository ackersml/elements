"use client";

import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { Link } from "@/i18n/navigation";
import { ProductCard } from "@/app/components/shop/ProductCard";
import type { Product } from "@/lib/products";
import { cn } from "@/lib/utils";
import { ShopSectionShell } from "@/app/components/home/ShopSectionShell";
import {
  MotionHorizontalRail,
  MotionMagnetic,
  MotionReveal,
} from "./motion/motion-primitives";

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
  backdropOpacity?: number;
  beforeRail?: ReactNode;
  watermark?: string;
  /** Default cards with borders (Yatao white islands); rail = flush image cells. */
  cardLayout?: "default" | "rail";
  /** Grid on desktop; carousel = horizontal scroll at all breakpoints. */
  display?: "grid" | "carousel";
  quickAddOnHover?: boolean;
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
  backdropOpacity,
  beforeRail,
  watermark,
  cardLayout = "default",
  display = "grid",
  quickAddOnHover = false,
}: ProductRailProps) {
  if (products.length === 0) return null;

  const isCarousel = display === "carousel";
  const isWide = aspect === "21/9";

  return (
    <ShopSectionShell
      id={id}
      labelledBy={id}
      band={band}
      backdrop={backdrop}
      backdropTint={backdropTint}
      backdropOpacity={backdropOpacity}
      watermark={watermark}
      className={className}
      deckClassName={cn(isCarousel && "shop-section-deck--carousel")}
      header={
        <MotionReveal className="max-w-3xl">
          {eyebrow ? <p className="eyebrow eyebrow-rule">{eyebrow}</p> : null}
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
      }
      beforeDeck={beforeRail}
      deck={
        <MotionHorizontalRail
          staggerDelay={0.08}
          trackClassName={cn(
            isCarousel && "product-rail-track--carousel",
            isCarousel && isWide && "product-rail-track--wide"
          )}
          childClassName={cn(isCarousel && isWide && "product-rail-item--wide")}
        >
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              aspect={aspect}
              showElement={showElement}
              collectionScene={collectionScene}
              layout={cardLayout}
              quickAddOnHover={quickAddOnHover && cardLayout === "default"}
              className={cardLayout === "default" ? "shop-product-card" : undefined}
            />
          ))}
        </MotionHorizontalRail>
      }
      footer={
        <MotionReveal className="flex justify-end" delay={0.1}>
          <MotionMagnetic>
            <Link href={ctaHref} className="btn-pill btn-primary">
              {ctaLabel} <ArrowRight size={16} aria-hidden />
            </Link>
          </MotionMagnetic>
        </MotionReveal>
      }
    />
  );
}
