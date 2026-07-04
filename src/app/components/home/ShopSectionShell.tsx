"use client";

import type { ReactNode } from "react";
import { SectionBackdrop } from "@/app/components/layout/SectionBackdrop";
import { cn } from "@/lib/utils";

type ShopBand = "white" | "accent" | "muted" | "sandstone" | "forest";

type ShopSectionShellProps = {
  id: string;
  labelledBy: string;
  band?: ShopBand;
  backdrop?: string;
  backdropTint?: "white" | "cream" | "forest" | "sandstone";
  backdropOpacity?: number;
  watermark?: string;
  className?: string;
  header: ReactNode;
  beforeDeck?: ReactNode;
  deck: ReactNode;
  footer?: ReactNode;
  deckClassName?: string;
};

const bandClass: Record<ShopBand, string> = {
  white: "shop-section--white",
  accent: "shop-section--accent",
  muted: "shop-section--muted",
  sandstone: "shop-section--sandstone",
  forest: "shop-section--forest",
};

export function ShopSectionShell({
  id,
  labelledBy,
  band = "accent",
  backdrop,
  backdropTint = "cream",
  backdropOpacity = 0.34,
  watermark,
  className,
  header,
  beforeDeck,
  deck,
  footer,
  deckClassName,
}: ShopSectionShellProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn(
        "shop-section relative overflow-hidden border-b border-border section-padding-shop",
        bandClass[band],
        className
      )}
    >
      {backdrop ? (
        <SectionBackdrop
          src={backdrop}
          tint={backdropTint}
          opacity={backdropOpacity}
          parallax
        />
      ) : null}

      <div className="shop-section-atmosphere" aria-hidden />
      <div className="grain shop-section-grain" aria-hidden />

      {watermark ? (
        <span className="shop-section-watermark" aria-hidden>
          {watermark}
        </span>
      ) : null}

      <div className="relative z-[1] container-x">
        {header}

        {beforeDeck ? <div className="mt-8">{beforeDeck}</div> : null}

        <div className={cn("shop-section-deck mt-10", deckClassName)}>{deck}</div>

        {footer ? <div className="mt-10">{footer}</div> : null}
      </div>
    </section>
  );
}
