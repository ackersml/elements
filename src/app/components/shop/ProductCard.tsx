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
import {
  cardPhotosFor,
  isProductPhotoSlug,
} from "@/lib/product-photos";
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
  /** Homepage rails: even image cells, no card chrome. */
  layout?: "default" | "rail";
  /** Yatao-style Quick Buy overlay on image hover (default cards only). */
  quickAddOnHover?: boolean;
  className?: string;
};

const aspectClass: Record<NonNullable<ProductCardProps["aspect"]>, string> = {
  square: "aspect-square",
  "4/3": "aspect-[4/3]",
  video: "aspect-video",
  "21/9": "aspect-[21/9]",
  "3/4": "aspect-[3/4]",
  "4/5": "aspect-[4/5]",
};

export function ProductCard({
  product,
  aspect = "square",
  showElement = false,
  collectionScene = false,
  layout = "default",
  quickAddOnHover = false,
  className,
}: ProductCardProps) {
  const isRail = layout === "rail";
  const t = useTranslations("product");
  const currency = useCartStore((s) => s.currency);
  const images =
    product.images.length > 0 ? product.images : [product.heroImageUrl];
  const catalogCard = isProductPhotoSlug(product.slug)
    ? cardPhotosFor(product.slug)
    : null;
  /** Cards: top on load, side on hover; full gallery stays on PDP. */
  const cardImages = catalogCard
    ? [catalogCard.primary, catalogCard.hover]
    : images.slice(0, 2);
  const [imageIndex, setImageIndex] = useState(0);
  const sceneUrl = collectionScene ? getCollectionSceneUrl(product) : undefined;
  const primarySrc = sceneUrl ?? cardImages[0] ?? product.heroImageUrl;
  const hoverSrc = sceneUrl ?? cardImages[1] ?? primarySrc;
  const displaySrc = sceneUrl ?? cardImages[imageIndex] ?? product.heroImageUrl;
  const photoVariant = sceneUrl ? "scene" : "commerce";
  const showImageDots = !sceneUrl && cardImages.length > 2;
  const showHoverSwap = !sceneUrl && cardImages.length > 1 && imageIndex === 0;

  const isSale =
    product.compareAtPriceCents != null &&
    product.compareAtPriceCents > product.priceCents;
  const soldOut = product.stockStatus === "sold_out";
  const isPreorder = product.stockStatus === "preorder";

  const photoStackClass = cn(
    "product-card-photo-stack",
    isRail ? "product-card-photo-stack--rail" : aspectClass[aspect]
  );

  const primaryFrameClass = cn(
    "product-card-photo-layer product-card-photo-layer--primary",
    sceneUrl && "product-photo-frame--scene",
    isRail && "product-photo-frame--rail"
  );

  const hoverFrameClass = cn(
    "product-card-photo-layer product-card-photo-layer--hover",
    isRail && "product-photo-frame--rail"
  );

  function renderPhotos() {
    if (showHoverSwap) {
      return (
        <div className={photoStackClass}>
          <ProductPhoto
            src={primarySrc}
            alt={product.title}
            aspect={aspect}
            variant={photoVariant}
            frameClassName={primaryFrameClass}
            sizes={
              isRail
                ? "(max-width: 768px) 45vw, 20vw"
                : "(max-width: 768px) 100vw, 25vw"
            }
            className={cn(
              !isRail &&
                "transition-transform duration-500 ease-out group-hover:scale-[1.03]",
              isRail && "product-photo--rail"
            )}
          />
          <ProductPhoto
            src={hoverSrc}
            alt=""
            aspect={aspect}
            variant={photoVariant}
            frameClassName={hoverFrameClass}
            sizes={
              isRail
                ? "(max-width: 768px) 45vw, 20vw"
                : "(max-width: 768px) 100vw, 25vw"
            }
            className={cn(
              !isRail &&
                "transition-transform duration-500 ease-out group-hover:scale-[1.03]",
              isRail && "product-photo--rail"
            )}
          />
        </div>
      );
    }

    return (
      <ProductPhoto
        src={displaySrc}
        alt={product.title}
        aspect={aspect}
        variant={photoVariant}
        frameClassName={cn(
          sceneUrl && "product-photo-frame--scene",
          isRail && "product-photo-frame--rail"
        )}
        sizes={
          isRail
            ? "(max-width: 768px) 45vw, 20vw"
            : "(max-width: 768px) 100vw, 25vw"
        }
        className={cn(
          !isRail &&
            "transition-transform duration-500 ease-out group-hover:scale-[1.03]",
          isRail && "product-photo--rail"
        )}
      />
    );
  }

  return (
    <article
      className={cn(
        "product-card group",
        isRail && "product-card--rail product-card--rail-motion",
        className
      )}
    >
      <Link href={`/shop/${product.slug}`} className="block">
        <div className="product-card-media relative overflow-hidden">
          {renderPhotos()}

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

          {showImageDots ? (
            <div
              className="absolute inset-x-0 bottom-3 z-10 flex justify-center gap-1.5"
              onClick={(e) => e.preventDefault()}
            >
              {cardImages.map((_, i) => (
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

          {quickAddOnHover && !soldOut ? (
            <div
              className="product-card-quick-add pointer-events-none absolute inset-x-0 bottom-0 z-20 p-4 opacity-0 transition-opacity duration-300 group-hover:pointer-events-auto group-hover:opacity-100"
              onClick={(e) => e.preventDefault()}
            >
              <QuickBuyButton
                slug={product.slug}
                className="btn-primary pointer-events-auto w-full !justify-center !text-[11px] uppercase tracking-[0.12em]"
              />
            </div>
          ) : null}
        </div>
      </Link>

      <div className={cn("product-card-body flex flex-col", isRail && "product-card-body--rail")}>
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
