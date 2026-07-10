"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ProductPhoto } from "@/app/components/shop/ProductPhoto";
import { MoodLoopVideo } from "@/app/components/home/MoodLoopVideo";
import { useCartStore } from "@/lib/cart-store";
import { formatProductDisplay, type Product } from "@/lib/products";
import { canvaAssets } from "@/lib/canva-assets";
import { ELEMENT_ICON } from "@/app/components/home/ElementsWheelSection";
import type { BrandElementId } from "@/lib/brand/elements-brand";

/**
 * Canva mood-grid icon sets — the featured pairings use the catalogue's dual
 * elemental identity (e.g. D Kurd is "Fire + Earth"), which the single
 * `product.element` field doesn't capture.
 */
const MOOD_ELEMENT_ICONS: Record<string, BrandElementId[]> = {
  "signature-d-kurd-10": ["fire", "earth"],
  "origins-f-sharp-nordlys-15": ["space"],
};

/**
 * Mood media: the demo footage plays in the wide landscape cell, and a still
 * top-down handpan shot sits in the round product cell.
 */
const MOOD_MEDIA: Record<
  string,
  { rectVideo: string; rectPoster: string; circle: string }
> = {
  "signature-d-kurd-10": {
    rectVideo: "/videos/featured-d-kurd-10.mp4",
    rectPoster: "/videos/featured-d-kurd-10.jpg",
    circle: "/videos/mood-d-kurd-circle.webp",
  },
  "origins-f-sharp-nordlys-15": {
    rectVideo: "/videos/mood-nordlys-rect.mp4",
    rectPoster: "/images/canva/mood-nordlys-lifestyle.webp",
    circle: "/videos/mood-nordlys-circle.webp",
  },
};

export type MoodGridItem = {
  product: Product;
  lifestyleSrc: string;
  seriesLabel: string;
};

function MoodLifestyle({ item }: { item: MoodGridItem }) {
  const media = MOOD_MEDIA[item.product.slug];
  return (
    <div className="canva-mood-cell canva-mood-cell--image">
      {media ? (
        <MoodLoopVideo
          src={media.rectVideo}
          poster={media.rectPoster}
          label={`${item.product.title} being played`}
          className="h-full w-full object-cover object-center"
        />
      ) : (
        <Image
          src={item.lifestyleSrc}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover object-center"
        />
      )}
      <div className="pointer-events-none absolute inset-0 bg-black/15" aria-hidden />
    </div>
  );
}

function MoodProductCard({
  item,
  moodLabel,
  mirror = false,
}: {
  item: MoodGridItem;
  moodLabel: string;
  mirror?: boolean;
}) {
  const { product, seriesLabel } = item;
  const currency = useCartStore((s) => s.currency);
  const price = formatProductDisplay(product.priceCents, currency);
  const moods = product.moods ?? [];
  const media = MOOD_MEDIA[product.slug];
  const iconIds =
    MOOD_ELEMENT_ICONS[product.slug] ??
    (product.element ? [product.element] : []);

  return (
    <div
      className={`canva-mood-cell canva-mood-cell--card${mirror ? " canva-mood-cell--mirror" : ""}`}
    >
      <div className="canva-mood-card__top">
        <div className="canva-mood-card__media">
          {media ? (
            <Image
              src={media.circle}
              alt={product.title}
              fill
              sizes="220px"
              className="object-cover object-center"
            />
          ) : (
            <ProductPhoto
              src={product.heroImageUrl}
              alt={product.title}
              aspect="square"
              variant="studio"
              sizes="220px"
              className="h-full w-full object-cover"
            />
          )}
        </div>
        <div className="canva-mood-card__heading">
          <div>
            <h3 className="canva-mood-card__title">{product.title}</h3>
            <p className="canva-mood-card__series">{seriesLabel}</p>
          </div>
          {iconIds.length > 0 ? (
            <span className="canva-mood-card__el-icons">
              {iconIds.map((elId) => {
                const Icon = ELEMENT_ICON[elId];
                return (
                  <Icon
                    key={elId}
                    className="canva-mood-card__el-icon"
                    strokeWidth={1.4}
                    aria-hidden
                  />
                );
              })}
            </span>
          ) : null}
        </div>
      </div>
      <p className="canva-mood-card__desc">{product.description}</p>
      {moods.length > 0 ? (
        <p className="canva-mood-card__mood">
          <span className="canva-mood-card__mood-label">{moodLabel}:</span>{" "}
          {moods.join(" - ")}
        </p>
      ) : null}
      <div className="canva-mood-card__footer">
        <p className="canva-mood-card__price">{price}</p>
        <Link href={`/shop/${product.slug}`} className="canva-mood-card__link">
          View instrument <ArrowRight size={14} aria-hidden />
        </Link>
      </div>
    </div>
  );
}

function MoodCardRow({ item, moodLabel }: { item: MoodGridItem; moodLabel: string }) {
  const { product, lifestyleSrc, seriesLabel } = item;
  const currency = useCartStore((s) => s.currency);
  const price = formatProductDisplay(product.priceCents, currency);
  const moods = product.moods ?? [];

  return (
    <div className="mood-grid-row grid grid-cols-1 overflow-hidden rounded-lg border border-white/10 bg-[color:var(--forest-moss)] md:grid-cols-2">
      <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[280px]">
        <Image
          src={lifestyleSrc}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover object-center"
        />
        <div className="pointer-events-none absolute inset-0 bg-black/20" aria-hidden />
      </div>
      <div className="flex flex-col justify-center p-6 md:p-8 lg:p-10">
        <p className="smallcaps text-[color:var(--bronze-accent)]">{seriesLabel}</p>
        <h3 className="mt-2 font-display text-2xl text-white md:text-3xl">
          {product.title}
        </h3>
        <p className="mt-4 text-sm leading-relaxed text-[color:var(--sandstone)]/80">
          {product.description}
        </p>
        {moods.length > 0 ? (
          <p className="mt-5 text-sm text-[color:var(--sandstone)]/85">
            <span className="smallcaps text-white/50">{moodLabel}:</span>{" "}
            {moods.join(" - ")}
          </p>
        ) : null}
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <p className="font-display text-xl text-white">{price}</p>
          <Link
            href={`/shop/${product.slug}`}
            className="link-arrow !text-[color:var(--bronze-accent)]"
          >
            View instrument <ArrowRight size={14} aria-hidden />
          </Link>
        </div>
      </div>
    </div>
  );
}

export function ElementMoodGridSection({
  id,
  items,
  variant = "default",
}: {
  id: string;
  items: MoodGridItem[];
  variant?: "default" | "canva";
}) {
  const tm = useTranslations("mag");

  if (items.length === 0) return null;

  if (variant === "canva" && items.length >= 2) {
    const [first, second] = items;

    return (
      <section
        id={id}
        aria-label="Featured instruments by mood"
        className="canva-mood-grid section-band-forest"
      >
        <div className="canva-mood-grid__board">
          <MoodLifestyle item={first} />
          <MoodProductCard item={first} moodLabel={tm("moodLabel")} />
          <MoodProductCard item={second} moodLabel={tm("moodLabel")} mirror />
          <MoodLifestyle item={second} />
        </div>
      </section>
    );
  }

  return (
    <section
      id={id}
      aria-label="Featured instruments by mood"
      className="section-band-forest border-b border-white/10 section-padding"
    >
      <div className="container-x">
        <div className="grid gap-6 md:gap-8">
          {items.map((item) => (
            <MoodCardRow key={item.product.slug} item={item} moodLabel={tm("moodLabel")} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function buildMoodGridItems(
  products: Product[],
  premiumLabel: string
): MoodGridItem[] {
  const lifestyles = [
    canvaAssets.featuredLifestyle,
    "/images/canva/mood-nordlys-lifestyle.webp",
  ];

  return products.map((product, i) => ({
    product,
    lifestyleSrc: lifestyles[i] ?? canvaAssets.heroBali,
    seriesLabel: premiumLabel,
  }));
}
