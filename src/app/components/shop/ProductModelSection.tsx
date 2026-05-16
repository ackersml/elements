"use client";

import type { Product } from "@/lib/products";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { ProductPhoto } from "./ProductPhoto";

type Props = {
  product: Product;
};

export function ProductModelSection({ product }: Props) {
  const images =
    product.images.length > 0 ? product.images : [product.heroImageUrl];
  const [active, setActive] = useState(0);
  const mainSrc = images[active] ?? product.heroImageUrl;

  return (
    <div className="flex flex-col gap-4">
      <ProductPhoto
        src={mainSrc}
        alt={product.title}
        aspect="square"
        priority
        sizes="(max-width: 1024px) 100vw, 50vw"
      />
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-5">
          {images.map((src, i) => (
            <button
              key={`${src}-${i}`}
              type="button"
              onClick={() => setActive(i)}
              className={cn(
                "overflow-hidden rounded-lg border-2 transition",
                active === i
                  ? "border-[color:var(--accent-c)]"
                  : "border-transparent opacity-80 hover:opacity-100"
              )}
              aria-label={`View image ${i + 1}`}
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
        </div>
      )}
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
