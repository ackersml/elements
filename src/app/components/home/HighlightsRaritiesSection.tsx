"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ProductPhoto } from "@/app/components/shop/ProductPhoto";
import { QuickBuyButton } from "@/app/components/shop/QuickBuyButton";
import { useCartStore } from "@/lib/cart-store";
import { formatProductDisplay, type Product } from "@/lib/products";

/** "Highlights and Rarities" — cream section from the Canva comp (`.canva-highlights`). */
export function HighlightsRaritiesSection({
  id,
  products,
}: {
  id: string;
  products: Product[];
}) {
  const tm = useTranslations("mag");
  const tp = useTranslations("product");
  const currency = useCartStore((s) => s.currency);

  const visible = products.slice(0, 4);
  if (visible.length === 0) return null;

  return (
    <section id={id} aria-labelledby={`${id}-title`} className="canva-highlights">
      <div className="container-x py-16 md:py-24">
        <div className="canva-highlights__intro">
          <p
            className="smallcaps"
            style={{ color: "rgba(26,36,33,0.6)" }}
          >
            {tm("raritiesEyebrow")}
          </p>
          <h2 id={`${id}-title`} className="canva-highlights__title mt-3">
            {tm("highlightsTitle")}
          </h2>
          <p className="canva-highlights__blurb">{tm("highlightsBlurb")}</p>
        </div>

        <div className="canva-highlights__grid">
          {visible.map((product) => (
            <article key={product.id} className="canva-highlight-card">
              <Link
                href={`/shop/${product.slug}`}
                className="canva-highlight-card__media block"
                aria-label={product.title}
              >
                <ProductPhoto
                  src={product.heroImageUrl}
                  alt={product.title}
                  aspect="square"
                  variant="studio"
                  sizes="176px"
                  frameClassName="!rounded-full"
                />
              </Link>
              <p className="canva-highlight-card__name">{product.title}</p>
              <p className="canva-highlight-card__price">
                {tp("from")} {formatProductDisplay(product.priceCents, currency)}
              </p>
              <div className="canva-highlight-card__cta">
                <QuickBuyButton slug={product.slug} className="canva-quick-buy" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
