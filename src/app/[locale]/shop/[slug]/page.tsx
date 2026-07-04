import { ProductElementLine } from "@/app/components/shop/ProductElementLine";
import { ProductModelSection } from "@/app/components/shop/ProductModelSection";
import { ProductBuyActions } from "@/app/components/shop/ProductBuyActions";
import { ProductCard } from "@/app/components/shop/ProductCard";
import { ClientPrice } from "@/app/[locale]/shop/ShopPriceClient";
import { Link } from "@/i18n/navigation";
import { getProductBySlug, getProductsByCollection } from "@/lib/products";
import { getCollectionLabelKey, shopCollectionHref } from "@/lib/shop-nav";
import { ShieldCheck, Truck, RotateCcw, Headphones } from "lucide-react";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = getProductBySlug(slug);
  if (!p) return { title: "Product" };
  return {
    title: p.title,
    description: p.description.slice(0, 160),
    openGraph: {
      title: p.title,
      description: p.description.slice(0, 160),
      images: p.images[0] ? [{ url: p.images[0] }] : undefined,
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const t = await getTranslations("product");
  const tm = await getTranslations("mag");
  const tn = await getTranslations("nav");

  const collection = product.collections[0] ?? "signature";
  const labelKey = getCollectionLabelKey(collection);
  const collectionLabel = labelKey ? tn(labelKey) : null;

  const related = getProductsByCollection(collection)
    .filter((p) => p.slug !== product.slug)
    .slice(0, 4);

  const isSale =
    product.compareAtPriceCents != null &&
    product.compareAtPriceCents > product.priceCents;
  const soldOut = product.stockStatus === "sold_out";
  const isPreorder = product.stockStatus === "preorder";

  const assurances = [
    { icon: Truck, title: tm("trustShippingTitle"), body: tm("trustShipping") },
    { icon: ShieldCheck, title: tm("trustTuningTitle"), body: tm("trustTuning") },
    { icon: RotateCcw, title: tm("trustReturnTitle"), body: tm("trustReturn") },
    { icon: Headphones, title: tm("trustSupportTitle"), body: tm("trustSupport") },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    offers: {
      "@type": "Offer",
      priceCurrency: "EUR",
      price: (product.priceCents / 100).toFixed(2),
      availability:
        product.stockStatus === "sold_out"
          ? "https://schema.org/OutOfStock"
          : "https://schema.org/InStock",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="bg-white">
        <div className="container-x pt-10 pb-14 md:pt-14 md:pb-20">
          <nav
            className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.12em] text-muted-foreground"
            aria-label="Breadcrumb"
          >
            <Link href="/shop" className="transition hover:text-foreground">
              {tn("shop")}
            </Link>
            {collectionLabel ? (
              <>
                <span aria-hidden>/</span>
                <Link
                  href={shopCollectionHref(collection)}
                  className="transition hover:text-foreground"
                >
                  {collectionLabel}
                </Link>
              </>
            ) : null}
            <span aria-hidden>/</span>
            <span className="text-foreground/80">{product.title}</span>
          </nav>

          <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <ProductModelSection product={product} />
            </div>

            <div className="max-w-xl">
              <div className="flex flex-wrap items-center gap-2">
                {collectionLabel ? (
                  <span className="eyebrow eyebrow-rule !mr-2">
                    {collectionLabel}
                  </span>
                ) : null}
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

              <h1 className="mt-4 font-display text-3xl leading-tight tracking-tight md:text-4xl lg:text-5xl">
                {product.title}
              </h1>
              <p className="mt-3 text-sm text-muted-foreground">
                {product.scale} &middot; {product.noteCount} notes &middot;{" "}
                {product.maker}
              </p>

              <div className="mt-6 flex items-baseline gap-3">
                <p className="font-display text-3xl md:text-4xl">
                  <ClientPrice eurCents={product.priceCents} />
                </p>
                {isSale && product.compareAtPriceCents ? (
                  <p className="text-lg text-muted-foreground line-through">
                    <ClientPrice eurCents={product.compareAtPriceCents} />
                  </p>
                ) : null}
              </div>

              <hr className="hairline-rule my-7" />

              <p className="leading-relaxed text-foreground/80">
                {product.description}
              </p>

              {product.element ? (
                <ProductElementLine
                  element={product.element}
                  showKeywords
                  className="mt-6 smallcaps text-[color:var(--sale-bg)]"
                />
              ) : null}

              <dl className="mt-7 grid grid-cols-2 gap-x-8 gap-y-5 rounded-xl border border-border bg-[color:var(--surface-muted)] p-6 text-sm">
                <div>
                  <dt className="smallcaps text-muted-foreground">Scale</dt>
                  <dd className="mt-1 font-display text-base">{product.scale}</dd>
                </div>
                <div>
                  <dt className="smallcaps text-muted-foreground">Notes</dt>
                  <dd className="mt-1 font-display text-base">
                    {product.noteCount}
                  </dd>
                </div>
                <div>
                  <dt className="smallcaps text-muted-foreground">Maker</dt>
                  <dd className="mt-1 font-display text-base">{product.maker}</dd>
                </div>
                <div>
                  <dt className="smallcaps text-muted-foreground">
                    Weight / size
                  </dt>
                  <dd className="mt-1 font-display text-base">
                    {product.weightKg} kg &middot; {product.dimensionsCm}
                  </dd>
                </div>
              </dl>

              <div className="mt-9 flex flex-wrap items-center gap-4">
                <ProductBuyActions slug={product.slug} />
                <Link href="/shop" className="link-arrow">
                  Back to shop
                </Link>
              </div>

              <ul className="mt-9 grid grid-cols-1 gap-4 border-t border-border pt-8 sm:grid-cols-2">
                {assurances.map((a) => {
                  const Icon = a.icon;
                  return (
                    <li key={a.title} className="flex gap-3">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-border bg-[color:var(--surface-muted)] text-[color:var(--sale-bg)]">
                        <Icon size={18} aria-hidden />
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-foreground">
                          {a.title}
                        </p>
                        <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                          {a.body}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <section className="border-t border-border section-band-accent section-padding md:py-24">
            <div className="container-x">
              <p className="eyebrow eyebrow-rule">More from this collection</p>
              <h2 className="mt-4 font-display text-2xl tracking-tight md:text-3xl">
                {t("related")}
              </h2>
              <div className="product-grid mt-10">
                {related.map((p) => (
                  <ProductCard key={p.id} product={p} aspect="4/3" />
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  );
}
