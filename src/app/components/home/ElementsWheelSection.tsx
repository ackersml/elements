"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Droplet, Flame, Leaf, Moon, Wind, type LucideIcon } from "lucide-react";
import {
  brandElements,
  formatElementTagline,
  type BrandElementId,
} from "@/lib/brand/elements-brand";
import { canvaAssets } from "@/lib/canva-assets";
import {
  MotionReveal,
  MotionStagger,
} from "@/app/components/home/motion/motion-primitives";

const WHEEL_ORDER: BrandElementId[] = ["space", "fire", "water", "earth", "air"];

/** Element line-icons — used for the small bronze icons on the mood-grid cards. */
export const ELEMENT_ICON: Record<BrandElementId, LucideIcon> = {
  space: Moon,
  fire: Flame,
  water: Droplet,
  earth: Leaf,
  air: Wind,
};

/** Exact Canva elements-wheel glyphs (extracted from the design). */
const ELEMENT_SYMBOL: Record<BrandElementId, string> = {
  space: "/images/canva/elements/symbols/space.webp",
  fire: "/images/canva/elements/symbols/fire.webp",
  water: "/images/canva/elements/symbols/water.webp",
  earth: "/images/canva/elements/symbols/earth.webp",
  air: "/images/canva/elements/symbols/air.webp",
};

const PANEL_SLOT: Record<BrandElementId, string> = {
  space: "element-wheel-panel--space",
  fire: "element-wheel-panel--fire",
  water: "element-wheel-panel--water",
  earth: "element-wheel-panel--earth",
  air: "element-wheel-panel--air",
};

function ElementPanel({
  id,
  compact,
  inlineSymbol = true,
}: {
  id: BrandElementId;
  compact?: boolean;
  inlineSymbol?: boolean;
}) {
  const el = brandElements.find((e) => e.id === id)!;

  return (
    <article
      className={`element-wheel-panel group ${PANEL_SLOT[id]} ${compact ? "element-wheel-panel--compact" : ""}`}
      aria-labelledby={`element-${id}`}
    >
      <Image
        src={el.imageSrc}
        alt=""
        fill
        sizes="(max-width: 1024px) 100vw, 360px"
        className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]"
      />
      <div className="element-wheel-panel__shade" aria-hidden />
      <div className="element-wheel-panel__copy">
        <h3 id={`element-${id}`} className="font-display text-xl text-white md:text-2xl">
          {el.name}
        </h3>
        <p className="element-wheel-panel__tagline mt-1">
          {formatElementTagline(id)}
        </p>
        <p className="mt-3 text-xs leading-relaxed text-white/75 md:text-sm">
          {el.description}
        </p>
        {inlineSymbol ? (
          <Image
            src={ELEMENT_SYMBOL[id]}
            alt=""
            width={48}
            height={48}
            className="element-wheel-panel__symbol"
            aria-hidden
          />
        ) : null}
      </div>
    </article>
  );
}

export function ElementsWheelSection({
  id,
  variant = "default",
}: {
  id: string;
  variant?: "default" | "canva";
}) {
  const tm = useTranslations("mag");

  return (
    <section
      id={id}
      aria-label={variant === "canva" ? "Five elements" : undefined}
      aria-labelledby={variant === "canva" ? undefined : `${id}-heading`}
      className={`relative overflow-hidden section-band-dark ${
        variant === "canva" ? "canva-wheel" : "border-b border-white/10 section-padding"
      }`}
    >
      {variant === "default" ? <div className="grain elements-grain" aria-hidden /> : null}

      <div className={variant === "canva" ? "canva-wheel__inner" : "relative container-x"}>
        {variant === "default" ? (
          <MotionReveal className="mx-auto max-w-2xl text-center">
            <p className="eyebrow eyebrow-rule !text-[color:var(--bronze-accent)]">
              {tm("elementsWheelEyebrow")}
            </p>
            <h2
              id={`${id}-heading`}
              className="mt-5 font-display text-3xl leading-tight text-white md:text-5xl"
            >
              {tm("elementsWheelTitle")}
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-[color:var(--sandstone)]/75 md:text-base">
              {tm("elementsWheelBlurb")}
            </p>
          </MotionReveal>
        ) : null}

        <div className={`element-wheel ${variant === "canva" ? "canva-wheel__grid" : "mt-12 md:mt-16"}`}>
          <div className="element-wheel__desktop hidden lg:block">
            <ElementPanel id="space" compact={variant === "canva"} />
            <div className="element-wheel__quad">
              <ElementPanel id="fire" compact={variant === "canva"} inlineSymbol={false} />
              <ElementPanel id="water" compact={variant === "canva"} inlineSymbol={false} />
              <ElementPanel id="earth" compact={variant === "canva"} inlineSymbol={false} />
              <ElementPanel id="air" compact={variant === "canva"} inlineSymbol={false} />
              <div className="element-wheel__center">
                <Image
                  src={canvaAssets.elements.centerHandpan}
                  alt=""
                  fill
                  sizes="420px"
                  className="object-contain object-center drop-shadow-2xl"
                />
              </div>
              {/* Element glyphs circling the central handpan (Canva layout). */}
              <div className="element-wheel__symbol-ring" aria-hidden>
                {(["fire", "water", "earth", "air"] as const).map((elId) => (
                  <Image
                    key={elId}
                    src={ELEMENT_SYMBOL[elId]}
                    alt=""
                    width={48}
                    height={48}
                    className={`element-wheel__ring-symbol element-wheel__ring-symbol--${elId}`}
                  />
                ))}
              </div>
            </div>
          </div>

          <MotionStagger className="grid gap-3 px-4 py-6 lg:hidden" staggerDelay={0.08}>
            {WHEEL_ORDER.map((elId) => (
              <ElementPanel key={elId} id={elId} />
            ))}
            <div className="relative mx-auto aspect-square w-48">
              <Image
                src={canvaAssets.elements.centerHandpan}
                alt=""
                fill
                sizes="192px"
                className="object-contain object-center"
              />
            </div>
          </MotionStagger>
        </div>
      </div>
    </section>
  );
}
