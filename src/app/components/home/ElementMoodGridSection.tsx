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

/** Looping handpan demo clips (extracted from the Drive demo videos). */
const MOOD_VIDEOS: Record<string, { src: string; poster: string }> = {
  "signature-d-kurd-10": {
    src: "/videos/mood-d-kurd-10.mp4",
    poster: "/videos/mood-d-kurd-10.jpg",
  },
  "origins-f-sharp-nordlys-15": {
    src: "/videos/mood-nordlys-15.mp4",
    poster: "/videos/mood-nordlys-15.jpg",
  },
};

export type MoodGridItem = {
  product: Product;
  lifestyleSrc: string;
  seriesLabel: string;
};

function MoodLifestyle({ src }: { src: string }) {
  return (
    <div className="canva-mood-cell canva-mood-cell--image">
      <Image
        src={src}
        alt=""
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover object-center"
      />
      <div className="pointer-events-none absolute inset-0 bg-black/15" aria-hidden />
    </div>
  );
}

function MoodProductCard({
  item,
  moodLabel,
}: {
  item: MoodGridItem;
  moodLabel: string;
}) {
  const { product, seriesLabel } = item;
  const currency = useCartStore((s) => s.currency);
  const price = formatProductDisplay(product.priceCents, currency);
  const moods = product.moods ?? [];
  const vid = MOOD_VIDEOS[product.slug];

  return (
    <div className="canva-mood-cell canva-mood-cell--card">
      <div className="canva-mood-card__top">
        <div className="canva-mood-card__media">
          {vid ? (
            <MoodLoopVideo
              src={vid.src}
              poster={vid.poster}
              label={`${product.title} being played`}
              className="h-full w-full object-cover"
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
        <div>
          <p className="canva-mood-card__series">{seriesLabel}</p>
          <h3 className="canva-mood-card__title">{product.title}</h3>
        </div>
      </div>
      <p className="canva-mood-card__desc">{product.description}</p>
      {moods.length > 0 ? (
        <div className="canva-mood-card__moods">
          <p className="canva-mood-card__mood-label">{moodLabel}</p>
          <div className="flex flex-wrap gap-2">
            {moods.map((mood) => (
              <span key={mood} className="mood-chip">
                {mood}
              </span>
            ))}
          </div>
        </div>
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
          <div className="mt-5">
            <p className="smallcaps text-white/50">{moodLabel}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {moods.map((mood) => (
                <span key={mood} className="mood-chip">
                  {mood}
                </span>
              ))}
            </div>
          </div>
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
          <MoodLifestyle src={first.lifestyleSrc} />
          <MoodProductCard item={first} moodLabel={tm("moodLabel")} />
          <MoodProductCard item={second} moodLabel={tm("moodLabel")} />
          <MoodLifestyle src={second.lifestyleSrc} />
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
