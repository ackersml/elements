/**
 * Master switch for whether search engines may index the storefront.
 *
 * `true` as of launch (2026-07-23): robots.txt allows crawling and advertises
 * the sitemap, and no `noindex` meta tag is emitted. Paired with removing
 * Shopify's "Opening soon" password — the store is open for orders.
 *
 * Set back to `false` and redeploy to pull the store out of search results
 * (e.g. if you need to take it down or re-gate it for a rebuild). That restores
 * the robots.txt disallow and the site-wide `noindex, nofollow`.
 */
export const SITE_INDEXABLE = true;
