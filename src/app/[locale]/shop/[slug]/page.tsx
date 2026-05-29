import { ProductElementLine } from "@/app/components/shop/ProductElementLine";
import { ProductModelSection } from "@/app/components/shop/ProductModelSection";
import { ProductBuyActions } from "@/app/components/shop/ProductBuyActions";
import { ClientPrice } from "@/app/[locale]/shop/ShopPriceClient";
import { Link } from "@/i18n/navigation";
import { getProductBySlug } from "@/lib/products";
import type { Metadata } from "next";
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
      <div className="container-x py-16 md:py-24">
        <nav className="smallcaps text-muted-foreground" aria-label="Breadcrumb">
          <Link href="/shop" className="transition hover:text-foreground">
            Shop
          </Link>{" "}
          <span className="mx-2">/</span> <span>{product.title}</span>
        </nav>

        <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Image gallery (left column on desktop) */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <ProductModelSection product={product} />
          </div>

          {/* Details (right column on desktop) */}
          <div className="max-w-xl">
            <h1 className="font-display text-3xl leading-tight tracking-tight md:text-4xl lg:text-5xl">
              {product.title}
            </h1>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              {product.description}
            </p>

            {product.element ? (
              <ProductElementLine
                element={product.element}
                showKeywords
                className="mt-5"
              />
            ) : null}

            <dl className="mt-6 grid grid-cols-1 gap-x-8 gap-y-3 text-sm sm:grid-cols-2">
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

            <p className="mt-8 font-display text-3xl md:text-4xl">
              <ClientPrice eurCents={product.priceCents} />
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <ProductBuyActions slug={product.slug} />
              <Link href="/shop" className="link-arrow">
                Back to shop
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
