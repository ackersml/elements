import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { CartView } from "@/app/components/shop/CartView";

export const metadata: Metadata = {
  title: "Cart",
};

export default async function CartPage() {
  const t = await getTranslations("cart");

  return (
    <div className="bg-white">
      <section className="section-band-accent">
        <div className="container-x py-12 md:py-16">
          <p className="eyebrow eyebrow-rule">{t("title")}</p>
        </div>
      </section>
      <section className="section-padding">
        <div className="container-x max-w-5xl">
          <CartView showTitle={false} />
        </div>
      </section>
    </div>
  );
}
