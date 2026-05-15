"use client";

import type { Product } from "@/lib/products";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { ProductPhoto } from "./ProductPhoto";

type Props = {
  product: Product;
};

export function ProductModelSection({ product }: Props) {
  const [active, setActive] = useState(0);
  if (product.modelUrl) {
    return (
      <p className="text-sm text-muted-foreground">
        GLB at {product.modelUrl} — wire to &lt;Model /&gt; when asset is in /public.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <ProductPhoto
        src={product.images[0] ?? product.heroImageUrl}
        alt={product.title}
        aspect="square"
        priority
      />
      <div className="flex flex-col gap-4">
        <div className="flex aspect-square flex-col items-center justify-center rounded-2xl border border-border bg-card/40 p-8 text-center">
          <p className="max-w-xs text-sm italic text-muted-foreground">
            3D preview placeholder — Draco GLB + tone hotspots next
          </p>
          {product.audioSamples.length > 0 && (
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {product.audioSamples.map((s, i) => (
                <button
                  key={s.label}
                  type="button"
                  onClick={() => setActive(i)}
                  className={cn(
                    "smallcaps rounded-full border border-border px-4 py-2 transition hover:border-[color:var(--accent-c)] hover:text-[color:var(--accent-c)]",
                    active === i && "border-[color:var(--accent-c)] text-[color:var(--accent-c)]"
                  )}
                >
                  {s.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
