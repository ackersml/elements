/** Build an absolute URL from the request origin and a site-relative path. */
export function toAbsoluteUrl(origin: string, path: string): string {
  const base = origin.replace(/\/$/, "");
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
