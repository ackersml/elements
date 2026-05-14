import { InfoPage } from "@/app/components/info/InfoPage";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages" });
  return { title: t("contact.title") };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "pages" });
  return (
    <InfoPage title={t("contact.title")}>
      <p>{t("contact.p1")}</p>
      <p>{t("contact.p2")}</p>
      <p>{t("contact.p3")}</p>
    </InfoPage>
  );
}
