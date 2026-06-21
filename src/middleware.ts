import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  // Land the bare domain on the course landing page.
  if (request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/course", request.url));
  }
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    "/",
    "/((?!api|_next|_next/static|_next/image|favicon.ico|icon.svg|sitemap.xml|robots.txt|course|.*\\.(?:svg|ico|png|jpg|jpeg|gif|webp|avif|woff2?)$).*)",
  ],
};
