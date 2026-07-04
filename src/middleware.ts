import createMiddleware from "next-intl/middleware";
import type { NextRequest } from "next/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    "/",
    "/((?!api|_next|_next/static|_next/image|favicon.ico|icon.svg|sitemap.xml|robots.txt|course|.*\\.(?:svg|ico|png|jpg|jpeg|gif|webp|avif|woff2?|mp4|webm|mov)$).*)",
  ],
};
