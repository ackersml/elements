import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "de", "fr", "id"],
  defaultLocale: "en",
  localePrefix: "as-needed",
});
