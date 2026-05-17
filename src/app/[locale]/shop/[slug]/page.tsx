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
      <div className="container-x max-w-[1100px] py-16 md:py-24">
        <nav className="smallcaps text-muted-foreground" aria-label="Breadcrumb">
          <Link href="/shop" className="transition hover:text-foreground">
            Shop
          </Link>{" "}
          <span className="mx-2">/</span> <span>{product.title}</span>
        </nav>
        <h1 className="mt-6 font-display text-4xl leading-tight tracking-tight md:text-5xl">
          {product.title}
        </h1>
        <p className="mt-5 max-w-2xl leading-relaxed text-muted-foreground">
          {product.description}
        </p>

        {product.element ? (
          <ProductElementLine
            element={product.element}
            showKeywords
            className="mt-4"
          />
        ) : null}

        <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-2 text-sm">
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

        <p className="mt-8 font-display text-3xl">
          <ClientPrice eurCents={product.priceCents} />
        </p>

        <div className="mt-12">
          <ProductModelSection product={product} />
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-4">
          <ProductBuyActions slug={product.slug} />
          <Link href="/shop" className="link-arrow">
            Back to shop
          </Link>
        </div>
      </div>
    </>
  );
}
