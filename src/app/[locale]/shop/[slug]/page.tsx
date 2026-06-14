import { ProductElementLine } from "@/app/components/shop/ProductElementLine";
import { ProductModelSection } from "@/app/components/shop/ProductModelSection";
import { ProductBuyActions } from "@/app/components/shop/ProductBuyActions";
import { ProductCard } from "@/app/components/shop/ProductCard";
import { ClientPrice } from "@/app/[locale]/shop/ShopPriceClient";
import { Link } from "@/i18n/navigation";
import { getProductBySlug, getProductsByCollection } from "@/lib/products";
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
  const related = getProductsByCollection(product.collections[0] ?? "beginner")
    .filter((p) => p.slug !== product.slug)
    .slice(0, 4);

  const isSale =
    product.compareAtPriceCents != null &&
    product.compareAtPriceCents > product.priceCents;
  const soldOut = product.stockStatus === "sold_out";
  const isPreorder = product.stockStatus === "preorder";

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
        <div className="container-x py-12 md:py-20">
          <nav className="smallcaps text-muted-foreground" aria-label="Breadcrumb">
            <Link href="/shop" className="transition hover:text-foreground">
              Shop
            </Link>{" "}
            <span className="mx-2">/</span> <span>{product.title}</span>
          </nav>

          <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <ProductModelSection product={product} />
            </div>

            <div className="max-w-xl">
              <div className="flex flex-wrap gap-2">
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
                {product.scale} · {product.noteCount} notes · {product.maker}
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

              <p className="mt-6 leading-relaxed text-muted-foreground">
                {product.description}
              </p>

              {product.element ? (
                <ProductElementLine
                  element={product.element}
                  showKeywords
                  className="mt-5"
                />
              ) : null}

              <dl className="mt-6 grid grid-cols-1 gap-x-8 gap-y-3 rounded-lg border border-border bg-[color:var(--surface-muted)] p-5 text-sm sm:grid-cols-2">
                <div>
                  <dt className="smallcaps inline text-muted-foreground">Scale:</dt>{" "}
                  <dd className="inline">{product.scale}</dd>
                </div>
                <div>
                  <dt className="smallcaps inline text-muted-foreground">Notes:</dt>{" "}
                  <dd className="inline">{product.noteCount}</dd>
                </div>
                <div>
                  <dt className="smallcaps inline text-muted-foreground">Maker:</dt>{" "}
                  <dd className="inline">{product.maker}</dd>
                </div>
                <div>
                  <dt className="smallcaps inline text-muted-foreground">
                    Weight / dimensions:
                  </dt>{" "}
                  <dd className="inline">
                    {product.weightKg} kg · {product.dimensionsCm}
                  </dd>
                </div>
              </dl>

              <div className="mt-10 flex flex-wrap items-center gap-4">
                <ProductBuyActions slug={product.slug} />
                <Link href="/shop" className="link-arrow">
                  Back to shop
                </Link>
              </div>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <section className="border-t border-border section-band-accent section-padding">
            <div className="container-x">
              <h2 className="font-display text-2xl tracking-tight md:text-3xl">
                {t("related")}
              </h2>
              <div className="product-grid mt-8">
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
