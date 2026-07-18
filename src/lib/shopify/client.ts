/**
 * Shopify Storefront API client.
 *
 * Deliberately dependency-free — the repo has no GraphQL client and the
 * Storefront API is a single POST endpoint, so `fetch` is the whole client.
 */

const DEFAULT_API_VERSION = "2025-10";

export type ShopifyConfig = {
  /** myshopify domain, e.g. "s5uurk-eg.myshopify.com" */
  domain: string;
  token: string;
  apiVersion: string;
};

export class ShopifyError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ShopifyError";
  }
}

/** Returns null when the store isn't configured, so callers can fall back. */
export function getShopifyConfig(): ShopifyConfig | null {
  const domain = process.env.SHOPIFY_STORE_DOMAIN?.trim();
  const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN?.trim();
  if (!domain || !token) return null;

  return {
    domain: domain.replace(/^https?:\/\//, "").replace(/\/+$/, ""),
    token,
    apiVersion:
      process.env.SHOPIFY_STOREFRONT_API_VERSION?.trim() || DEFAULT_API_VERSION,
  };
}

export function isShopifyConfigured(): boolean {
  return getShopifyConfig() !== null;
}

export function storefrontEndpoint(config: ShopifyConfig): string {
  return `https://${config.domain}/api/${config.apiVersion}/graphql.json`;
}

type GraphQLResponse<T> = {
  data?: T;
  errors?: { message: string }[];
};

/**
 * POST a Storefront GraphQL operation. Throws ShopifyError on transport
 * failure or any GraphQL error — callers get data or an exception, never a
 * half-populated result.
 */
export async function shopifyFetch<T>(
  query: string,
  variables: Record<string, unknown> = {}
): Promise<T> {
  const config = getShopifyConfig();
  if (!config) {
    throw new ShopifyError(
      "Shopify is not configured — set SHOPIFY_STORE_DOMAIN and SHOPIFY_STOREFRONT_ACCESS_TOKEN"
    );
  }

  let res: Response;
  try {
    res = await fetch(storefrontEndpoint(config), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": config.token,
      },
      body: JSON.stringify({ query, variables }),
      cache: "no-store",
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    throw new ShopifyError(`Storefront API request failed: ${message}`);
  }

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new ShopifyError(
      `Storefront API returned ${res.status}${body ? `: ${body.slice(0, 300)}` : ""}`
    );
  }

  const json = (await res.json().catch(() => null)) as GraphQLResponse<T> | null;
  if (!json) throw new ShopifyError("Storefront API returned invalid JSON");

  if (json.errors?.length) {
    throw new ShopifyError(
      `Storefront API error: ${json.errors.map((e) => e.message).join("; ")}`
    );
  }
  if (!json.data) throw new ShopifyError("Storefront API returned no data");

  return json.data;
}
