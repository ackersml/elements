"use client";

import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ProductCard } from "@/app/components/shop/ProductCard";
import { ShopSectionShell } from "@/app/components/home/ShopSectionShell";
import type { Product } from "@/lib/products";
import { shopCollectionHref } from "@/lib/shop-nav";
import { MotionReveal } from "./motion/motion-primitives";

type BundleOfferSectionProps = {
  id: string;
  products: Product[];
};

export function BundleOfferSection({ id, products }: BundleOfferSectionProps) {
  const tm = useTranslations("mag");

  if (products.length === 0) return null;

  return (
    <ShopSectionShell
      id={id}
      labelledBy={id}
      band="accent"
      backdrop="/images/handpan-lifestyle-6.jpg"
      backdropTint="cream"
      backdropOpacity={0.28}
      watermark="Bundles"
      header={
        <MotionReveal className="max-w-3xl">
          <p className="eyebrow eyebrow-rule">{tm("bundlesEyebrow")}</p>
          <h2
            id={id}
            className="mt-4 font-display text-3xl leading-[1.05] tracking-tight md:text-5xl"
          >
            {tm("bundlesTitle")}
          </h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">{tm("bundlesBlurb")}</p>
        </MotionReveal>
      }
      deck={
        <div className="bundle-offer-grid">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              aspect="4/3"
              layout="default"
              quickAddOnHover
              className="shop-product-card bundle-offer-card"
            />
          ))}
        </div>
      }
      footer={
        <MotionReveal className="flex justify-end" delay={0.1}>
          <Link href={shopCollectionHref("bundles")} className="btn-pill btn-primary">
            {tm("shopCtaBundles")} <ArrowRight size={16} aria-hidden />
          </Link>
        </MotionReveal>
      }
    />
  );
}
