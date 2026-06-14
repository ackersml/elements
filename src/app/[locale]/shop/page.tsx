import { redirect } from "@/i18n/navigation";
import { Link } from "@/i18n/navigation";
import { getProducts } from "@/lib/products";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ProductCard } from "@/app/components/shop/ProductCard";
import { SectionBackdrop } from "@/app/components/layout/SectionBackdrop";
import { isValidCollection } from "@/lib/shop-nav";

export const metadata: Metadata = {
  title: "Shop",
};

type Props = {
  searchParams: Promise<{ collection?: string }>;
  params: Promise<{ locale: string }>;
};

export default async function ShopPage({ searchParams, params }: Props) {
  const { collection } = await searchParams;
  const { locale } = await params;

  if (collection && isValidCollection(collection)) {
    redirect({ href: `/collections/${collection}`, locale });
  }

  const tm = await getTranslations("mag");
  const list = getProducts();

  return (
    <>
      <section className="relative flex min-h-[45vh] items-center overflow-hidden bg-[color:var(--surface-accent)] md:min-h-[50vh]">
        <div className="relative container-x pt-24 pb-12 md:pt-28 md:pb-16">
          <p className="eyebrow eyebrow-rule">Shop</p>
          <h1 className="mt-5 font-display text-4xl leading-[1.05] tracking-tight md:text-5xl lg:text-[4rem]">
            {tm("collectionTitle")}
          </h1>
          <p className="mt-6 max-w-xl text-muted-foreground leading-relaxed md:text-lg">
            {tm("collectionBlurb")}
          </p>
        </div>
      </section>
      <section className="relative overflow-hidden bg-white section-padding">
        <SectionBackdrop src="/images/handpan-lifestyle-7.jpg" opacity={0.05} />
        <div className="relative container-x">
          {list.length === 0 ? (
            <p className="text-muted-foreground">
              Nothing here yet.{" "}
              <Link href="/shop" className="link-arrow">
                View all
              </Link>
            </p>
          ) : (
            <div className="product-grid">
              {list.map((p) => (
                <ProductCard key={p.id} product={p} aspect="4/3" showElement />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
