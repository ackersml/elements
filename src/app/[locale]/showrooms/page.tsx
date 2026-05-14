import { InfoPage } from "@/app/components/info/InfoPage";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages" });
  return { title: t("showrooms.title") };
}

export default async function ShowroomsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "pages" });
  return (
    <InfoPage title={t("showrooms.title")}>
      <p>{t("showrooms.p1")}</p>
      <p>{t("showrooms.p2")}</p>
      <p>{t("showrooms.p3")}</p>
    </InfoPage>
  );
}
