import { ProductModelSection } from "@/app/components/shop/ProductModelSection";
import { CheckoutButtonProduct } from "@/app/components/shop/CheckoutButtonProduct";
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
    <div className="border-b border-border/40 py-16 md:py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-[1100px] px-4 md:px-8">
        <nav className="mb-8 text-xs uppercase tracking-[0.14em] text-muted-foreground">
          <Link href="/shop" className="hover:text-foreground">
            Shop
          </Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{product.title}</span>
        </nav>
        <h1 className="font-display text-4xl tracking-tight md:text-5xl">
          {product.title}
        </h1>
        <p className="mt-4 max-w-2xl text-muted-foreground leading-relaxed">
          {product.description}
        </p>
        <div className="mt-10 space-y-6">
          <ProductModelSection product={product} />
          <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
            <span>Scale: {product.scale}</span>
            <span>Notes: {product.noteCount}</span>
            <span>Maker: {product.maker}</span>
            <span>
              {product.weightKg} kg · {product.dimensionsCm}
            </span>
          </div>
          <CheckoutButtonProduct slug={product.slug} />
        </div>
      </div>
    </div>
  );
}
