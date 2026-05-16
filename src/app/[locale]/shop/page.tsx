import { Link } from "@/i18n/navigation";
import { getProducts, getProductsByCollection } from "@/lib/products";
import type { Metadata } from "next";
import { ProductPhoto } from "@/app/components/shop/ProductPhoto";
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
  const list = collection
    ? getProductsByCollection(collection)
    : getProducts();

  const title = collection ? collectionTitle(collection) : "All instruments";

  return (
    <>
      <section className="border-b border-border py-16 md:py-24">
        <div className="container-x">
          <p className="smallcaps text-muted-foreground">Shop</p>
          <h1 className="mt-3 font-display text-4xl leading-tight tracking-tight uppercase md:text-6xl">
            {title}
          </h1>
          <p className="mt-4 max-w-xl text-muted-foreground">
            {list.length} {list.length === 1 ? "instrument" : "instruments"}{" "}
            available. Each piece allocated by hand.
          </p>
        </div>
      </section>
      <section className="border-t border-border py-16 md:py-20">
        <div className="container-x">
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
