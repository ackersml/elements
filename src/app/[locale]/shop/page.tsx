import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { getProducts, getProductsByCollection } from "@/lib/products";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ProductElementLine } from "@/app/components/shop/ProductElementLine";
import { ProductPhoto } from "@/app/components/shop/ProductPhoto";
import { SectionBackdrop } from "@/app/components/layout/SectionBackdrop";
import { ClientPrice } from "./ShopPriceClient";

export const metadata: Metadata = {
  title: "Shop",
};

type Props = {
  searchParams: Promise<{ collection?: string }>;
};

function collectionTitle(slug: string): string {
  return slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export default async function ShopPage({ searchParams }: Props) {
  const { collection } = await searchParams;
  const tm = await getTranslations("mag");
  const list = collection
    ? getProductsByCollection(collection)
    : getProducts();

  const title = collection ? collectionTitle(collection) : tm("collectionTitle");

  return (
    <>
      <section className="relative flex min-h-[55vh] items-end overflow-hidden md:min-h-[60vh]">
        <Image
          src="/images/handpan-lifestyle-4.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(13,13,13,0.78) 0%, rgba(13,13,13,0.55) 40%, rgba(13,13,13,0.30) 80%, rgba(13,13,13,0.55) 100%), linear-gradient(180deg, rgba(13,13,13,0.30) 0%, rgba(13,13,13,0.05) 30%, rgba(13,13,13,0.92) 100%)",
          }}
          aria-hidden
        />
        <div className="grain" aria-hidden />
        <div className="relative container-x pb-16 pt-36 md:pb-24 md:pt-44">
          <p className="eyebrow eyebrow-rule">Shop</p>
          <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl lg:text-[5rem]">
            {title}
          </h1>
          <p className="mt-6 max-w-xl text-foreground/80 leading-relaxed md:text-lg">
            {!collection ? tm("collectionBlurb") : null}
            {collection
              ? `${list.length} ${list.length === 1 ? "instrument" : "instruments"} available. Each piece allocated by hand.`
              : null}
          </p>
        </div>
      </section>
      <section className="relative overflow-hidden py-20 md:py-28">
        <SectionBackdrop src="/images/handpan-lifestyle-7.jpg" opacity={0.25} />
        <div className="relative container-x">
          {list.length === 0 ? (
            <p className="text-muted-foreground">
              Nothing here yet.{" "}
              <Link href="/shop" className="link-arrow">
                View all
              </Link>
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {list.map((p) => (
                <Link key={p.id} href={`/shop/${p.slug}`} className="group block">
                  <ProductPhoto
                    src={p.heroImageUrl}
                    alt={p.title}
                    aspect="4/3"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                  />
                  <div className="mt-4 flex items-start justify-between gap-4">
                    <div>
                      <h2 className="font-display text-xl group-hover:text-[color:var(--accent-c)]">
                        {p.title}
                      </h2>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {p.scale} · {p.noteCount} notes
                      </p>
                      {p.element ? (
                        <ProductElementLine
                          element={p.element}
                          className="mt-2 text-[10px]"
                        />
                      ) : null}
                    </div>
                    <p className="font-display text-lg whitespace-nowrap">
                      <ClientPrice eurCents={p.priceCents} />
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
