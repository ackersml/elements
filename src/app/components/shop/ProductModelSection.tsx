"use client";

import { Play } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import type { Product } from "@/lib/products";
import { videoDriveViewUrl, videoStreamUrl } from "@/lib/product-videos";
import { cn } from "@/lib/utils";
import { ProductPhoto } from "./ProductPhoto";
import { ProductVideoEmbed } from "./ProductVideoEmbed";

type Props = {
  product: Product;
};

type ActiveMedia = number | "video";

export function ProductModelSection({ product }: Props) {
  const t = useTranslations("product");
  const images =
    product.images.length > 0 ? product.images : [product.heroImageUrl];
  const streamUrl = videoStreamUrl(product.slug);
  const fallbackUrl = videoDriveViewUrl(product.slug);
  const [active, setActive] = useState<ActiveMedia>(0);
  const mainSrc = images[typeof active === "number" ? active : 0] ?? product.heroImageUrl;
  const showThumbs = images.length > 1 || streamUrl;

  return (
    <div className="flex flex-col gap-4">
      {active === "video" && streamUrl && fallbackUrl ? (
        <ProductVideoEmbed
          streamUrl={streamUrl}
          fallbackUrl={fallbackUrl}
          title={t("watchVideo", { title: product.title })}
          poster={product.heroImageUrl}
        />
      ) : (
        <ProductPhoto
          src={mainSrc}
          alt={product.title}
          aspect="square"
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      )}

      {showThumbs ? (
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-5">
          {images.map((src, i) => (
            <button
              key={`${src}-${i}`}
              type="button"
              onClick={() => setActive(i)}
              className={cn(
                "overflow-hidden rounded-lg border-2 transition",
                active === i
                  ? "border-[color:var(--ink)]"
                  : "border-transparent opacity-80 hover:opacity-100"
              )}
              aria-label={t("viewImage", { index: i + 1 })}
              aria-pressed={active === i}
            >
              <ProductPhoto
                src={src}
                alt=""
                aspect="square"
                sizes="80px"
                className="pointer-events-none"
              />
            </button>
          ))}

          {streamUrl ? (
            <button
              type="button"
              onClick={() => setActive("video")}
              className={cn(
                "flex aspect-square flex-col items-center justify-center gap-1 overflow-hidden rounded-lg border-2 bg-[color:var(--surface-muted)] transition",
                active === "video"
                  ? "border-[color:var(--ink)]"
                  : "border-transparent opacity-80 hover:opacity-100"
              )}
              aria-label={t("watchVideo", { title: product.title })}
              aria-pressed={active === "video"}
            >
              <span className="grid h-9 w-9 place-items-center rounded-full border border-border bg-white text-[color:var(--ink)]">
                <Play size={16} aria-hidden className="ml-0.5" />
              </span>
              <span className="smallcaps px-1 text-[9px] text-muted-foreground">
                {t("video")}
              </span>
            </button>
          ) : null}
        </div>
      ) : null}

      {product.audioSamples.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {product.audioSamples.map((s) => (
            <span
              key={s.label}
              className="smallcaps rounded-full border border-border px-4 py-2 text-muted-foreground"
            >
              {s.label}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
