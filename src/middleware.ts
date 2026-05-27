import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: [
    "/",
    "/((?!api|_next|_next/static|_next/image|favicon.ico|icon.png|apple-icon.png|sitemap.xml|robots.txt|.*\\.(?:svg|ico|png|jpg|jpeg|gif|webp|avif|woff2?)$).*)",
  ],
};
