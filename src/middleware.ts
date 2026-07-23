import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  // Canonicalise on the bare domain: www.* -> apex, before locale handling, so
  // visitors get one clean 308 instead of chaining through a locale redirect.
  // Host-agnostic on purpose — works for any domain the site is served on.
  const host = request.headers.get("host");
  if (host?.startsWith("www.")) {
    const url = request.nextUrl.clone();
    url.protocol = "https:";
    url.port = "";
    url.host = host.slice(4);
    return NextResponse.redirect(url, 308);
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: [
    "/",
    "/((?!api|_next|_next/static|_next/image|favicon.ico|icon.svg|sitemap.xml|robots.txt|course|.*\\.(?:svg|ico|png|jpg|jpeg|gif|webp|avif|woff2?|mp4|webm|mov)$).*)",
  ],
};
