"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ProductPhoto } from "@/app/components/shop/ProductPhoto";
import { QuickBuyButton } from "@/app/components/shop/QuickBuyButton";
import { useCartStore } from "@/lib/cart-store";
import { formatProductDisplay, type Product } from "@/lib/products";
import { cn } from "@/lib/utils";
import { MotionReveal } from "@/app/components/home/motion/motion-primitives";

type YataoShowcaseSectionProps = {
  id: string;
  title: string;
  eyebrow?: string;
  description?: string;
  products: Product[];
  ctaLabel: string;
  ctaHref: string;
  maxProducts?: number;
  showFromPrice?: boolean;
  showQuickBuy?: boolean;
};

function YataoProductTile({
  product,
  showFromPrice,
  showQuickBuy,
}: {
  product: Product;
  showFromPrice?: boolean;
  showQuickBuy?: boolean;
}) {
  const t = useTranslations("product");
  const currency = useCartStore((s) => s.currency);
  const soldOut = product.stockStatus === "sold_out";
  const isSale =
    product.compareAtPriceCents != null &&
    product.compareAtPriceCents > product.priceCents;

  return (
    <article className="yatao-showcase-tile group">
      <Link href={`/shop/${product.slug}`} className="block">
        <div className="yatao-showcase-tile__media relative">
          <ProductPhoto
            src={product.heroImageUrl}
            alt={product.title}
            aspect="square"
            variant="studio"
            sizes="(max-width: 640px) 50vw, 25vw"
            frameClassName="yatao-showcase-tile__frame"
            className="yatao-showcase-tile__photo transition-transform duration-500 ease-out group-hover:scale-[1.02]"
          />
          {soldOut ? (
            <span className="product-card-badge product-card-badge--sold absolute left-0 top-0 z-10">
              {t("soldOut")}
            </span>
          ) : null}
          {!soldOut && isSale ? (
            <span className="product-card-badge product-card-badge--sale absolute left-0 top-0 z-10">
              {t("sale")}
            </span>
          ) : null}
        </div>
        <div className="yatao-showcase-tile__meta">
          <p className="yatao-showcase-tile__name">{product.title}</p>
          <p className="yatao-showcase-tile__price">
            {showFromPrice ? (
              <span className="yatao-showcase-tile__from">{t("from")} </span>
            ) : null}
            {formatProductDisplay(product.priceCents, currency)}
          </p>
        </div>
      </Link>
      {showQuickBuy ? (
        <QuickBuyButton
          slug={product.slug}
          className="yatao-showcase-tile__quick-buy mt-3 w-full"
        />
      ) : null}
    </article>
  );
}

export function YataoShowcaseSection({
  id,
  title,
  eyebrow,
  description,
  products,
  ctaLabel,
  ctaHref,
  maxProducts = 4,
  showFromPrice = false,
  showQuickBuy = false,
}: YataoShowcaseSectionProps) {
  const visible = products.slice(0, maxProducts);
  if (visible.length === 0) return null;

  const gridCols =
    visible.length >= 4
      ? "sm:grid-cols-2 lg:grid-cols-4"
      : visible.length === 3
        ? "sm:grid-cols-3"
        : "sm:grid-cols-2 mx-auto max-w-3xl";

  return (
    <section
      id={id}
      aria-labelledby={id}
      className="yatao-showcase border-b border-border"
    >
      <div className="container-x">
        <MotionReveal className="yatao-showcase__header">
          {eyebrow ? (
            <p className="eyebrow eyebrow-rule yatao-showcase__eyebrow">{eyebrow}</p>
          ) : null}
          <h2 id={id} className="yatao-showcase__title">
            {title}
          </h2>
          {description ? (
            <p className="yatao-showcase__description">{description}</p>
          ) : null}
        </MotionReveal>

        <div className={cn("yatao-showcase__grid grid grid-cols-2 gap-x-6 gap-y-10", gridCols)}>
          {visible.map((product) => (
            <YataoProductTile
              key={product.id}
              product={product}
              showFromPrice={showFromPrice}
              showQuickBuy={showQuickBuy}
            />
          ))}
        </div>

        <MotionReveal className="yatao-showcase__footer" delay={0.08}>
          <Link href={ctaHref} className="btn-pill btn-yatao">
            {ctaLabel}
          </Link>
        </MotionReveal>
      </div>
    </section>
  );
}
