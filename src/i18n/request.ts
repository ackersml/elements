import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

const localeList = routing.locales as readonly string[];

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  if (!locale || !localeList.includes(locale)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
