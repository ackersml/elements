/**
 * Master switch for whether search engines may index the storefront.
 *
 * Currently `false`. The store is publicly reachable at elementshandpans.com,
 * but the Shopify checkout is still behind the "Opening soon" password — so we
 * don't want Google indexing a shop that can't take orders yet. Keeping it
 * unindexed also means no half-finished pages get cached in search results.
 *
 * TO GO LIVE: set this to `true` and redeploy. That re-enables indexing in
 * robots.txt and drops the `noindex` meta tag from every page. Do it at the
 * same time as removing Shopify's "Opening soon" password.
 */
export const SITE_INDEXABLE = false;
