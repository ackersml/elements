import { Link } from "@/i18n/navigation";
import { getProducts, getProductsByCollection } from "@/lib/products";
import Image from "next/image";
import type { Metadata } from "next";
import { ClientPrice } from "./ShopPriceClient";

export const metadata: Metadata = {
  title: "Shop",
};

type Props = {
  searchParams: Promise<{ collection?: string }>;
};

export default async function ShopPage({ searchParams }: Props) {
  const { collection } = await searchParams;
  const list = collection
    ? getProductsByCollection(collection)
    : getProducts();

  return (
    <div className="border-b border-border/40 py-16 md:py-24">
      <div className="mx-auto max-w-[1400px] px-4 md:px-8">
        <h1 className="font-display text-4xl tracking-tight capitalize">
          {collection ? collection.replace(/-/g, " ") : "All instruments"}
        </h1>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p, i) => (
            <article
              key={p.id}
              className={i % 3 === 1 ? "lg:translate-y-5" : undefined}
            >
              <Link href={`/shop/${p.slug}`} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden border border-border/50">
                  <Image
                    src={p.heroImageUrl}
                    alt={p.title}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-[1.02]"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="mt-3 flex items-baseline justify-between gap-2">
                  <h2 className="font-display text-xl text-foreground">
                    {p.title}
                  </h2>
                  <ClientPrice eurCents={p.priceCents} />
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{p.scale}</p>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
