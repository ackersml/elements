"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useCartStore } from "@/lib/cart-store";
import {
  formatProductDisplay,
  getCollectionSceneUrl,
  type Product,
} from "@/lib/products";
import { cn } from "@/lib/utils";
import { ProductElementLine } from "@/app/components/shop/ProductElementLine";
import { ProductPhoto } from "@/app/components/shop/ProductPhoto";
import { QuickBuyButton } from "@/app/components/shop/QuickBuyButton";

type ProductCardProps = {
  product: Product;
  aspect?: "square" | "4/3" | "video" | "21/9" | "3/4" | "4/5";
  showElement?: boolean;
  /** Use elemental scene art instead of product cutout photography. */
  collectionScene?: boolean;
  className?: string;
};

export function ProductCard({
  product,
  aspect = "square",
  showElement = false,
  collectionScene = false,
  className,
}: ProductCardProps) {
  const t = useTranslations("product");
  const currency = useCartStore((s) => s.currency);
  const images =
    product.images.length > 0 ? product.images : [product.heroImageUrl];
  const [imageIndex, setImageIndex] = useState(0);
  const sceneUrl = collectionScene ? getCollectionSceneUrl(product) : undefined;
  const displaySrc = sceneUrl ?? images[imageIndex] ?? product.heroImageUrl;
  const photoVariant = sceneUrl ? "scene" : "commerce";
  const showImageDots = !sceneUrl && images.length > 1;

  const isSale =
    product.compareAtPriceCents != null &&
    product.compareAtPriceCents > product.priceCents;
  const soldOut = product.stockStatus === "sold_out";
  const isPreorder = product.stockStatus === "preorder";

  return (
    <article className={cn("product-card group", className)}>
      <Link href={`/shop/${product.slug}`} className="block">
        <div className="product-card-media relative">
          <div className="pointer-events-none absolute left-3 top-3 z-10 flex flex-wrap gap-1.5">
            {soldOut ? (
              <span className="product-card-badge product-card-badge--sold">
                {t("soldOut")}
              </span>
            ) : null}
            {!soldOut && isSale ? (
              <span className="product-card-badge product-card-badge--sale">
                {t("sale")}
              </span>
            ) : null}
            {!soldOut && isPreorder ? (
              <span className="product-card-badge product-card-badge--preorder">
                {t("preorder")}
              </span>
            ) : null}
          </div>

          <ProductPhoto
            src={displaySrc}
            alt={product.title}
            aspect={aspect}
            variant={photoVariant}
            frameClassName={sceneUrl ? "product-photo-frame--scene" : undefined}
            sizes="(max-width: 768px) 100vw, 25vw"
            className="transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />

          {showImageDots ? (
            <div
              className="absolute inset-x-0 bottom-3 z-10 flex justify-center gap-1.5"
              onClick={(e) => e.preventDefault()}
            >
              {images.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Image ${i + 1}`}
                  className={cn(
                    "h-1.5 w-1.5 rounded-full transition",
                    i === imageIndex
                      ? "bg-[color:var(--ink)]"
                      : "bg-[color:var(--ink)]/25 hover:bg-[color:var(--ink)]/50"
                  )}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setImageIndex(i);
                  }}
                />
              ))}
            </div>
          ) : null}
        </div>
      </Link>

      <div className="product-card-body">
        <Link href={`/shop/${product.slug}`} className="block min-w-0 flex-1">
          <p className="font-display text-base leading-snug text-foreground transition group-hover:text-[color:var(--sale-bg)] md:text-lg">
            {product.title}
          </p>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {product.scale}
            {product.noteCount ? ` · ${product.noteCount} notes` : null}
          </p>
          {showElement && product.element ? (
            <ProductElementLine
              element={product.element}
              className="mt-2 text-[10px] !text-muted-foreground"
            />
          ) : null}
        </Link>

        <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-foreground">
            <span className="text-xs text-muted-foreground">{t("from")}</span>{" "}
            <span className="font-display text-base">
              {formatProductDisplay(product.priceCents, currency)}
            </span>
            {isSale && product.compareAtPriceCents ? (
              <span className="ml-2 text-xs text-muted-foreground line-through">
                {formatProductDisplay(product.compareAtPriceCents, currency)}
              </span>
            ) : null}
          </p>
          {!soldOut ? (
            <QuickBuyButton slug={product.slug} />
          ) : null}
        </div>
      </div>
    </article>
  );
}
