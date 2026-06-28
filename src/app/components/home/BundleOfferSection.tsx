"use client";

import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ProductCard } from "@/app/components/shop/ProductCard";
import type { Product } from "@/lib/products";
import { shopCollectionHref } from "@/lib/shop-nav";

type BundleOfferSectionProps = {
  id: string;
  products: Product[];
};

export function BundleOfferSection({ id, products }: BundleOfferSectionProps) {
  const tm = useTranslations("mag");

  if (products.length === 0) return null;

  return (
    <section
      aria-labelledby={id}
      className="border-b border-border section-band-accent section-padding"
    >
      <div className="container-x">
        <div className="max-w-3xl">
          <p className="eyebrow eyebrow-rule">{tm("bundlesEyebrow")}</p>
          <h2
            id={id}
            className="mt-4 font-display text-3xl leading-[1.05] tracking-tight md:text-5xl"
          >
            {tm("bundlesTitle")}
          </h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">{tm("bundlesBlurb")}</p>
        </div>

        <div className="bundle-offer-grid mt-10">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              aspect="4/3"
              layout="default"
              quickAddOnHover
              className="bundle-offer-card"
            />
          ))}
        </div>

        <div className="mt-10 flex justify-end">
          <Link href={shopCollectionHref("bundles")} className="btn-pill btn-primary">
            {tm("shopCtaBundles")} <ArrowRight size={16} aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
