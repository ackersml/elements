import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Resolves Supabase credentials from env.
 * Supports manual names and Vercel ↔ Supabase integration defaults.
 */
export function getSupabaseConfig(): { url: string; serviceRoleKey: string } | null {
  const url =
    process.env.SUPABASE_URL?.trim() ||
    process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() ||
    "";

  const serviceRoleKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() ||
    process.env.SUPABASE_SECRET_KEY?.trim() ||
    "";

  if (!url || !serviceRoleKey) return null;
  return { url, serviceRoleKey };
}

export function isSupabaseConfigured(): boolean {
  return getSupabaseConfig() !== null;
}

/**
 * PostgREST table for Stripe storefront orders.
 * Default `elements_store_orders` avoids clashing with other apps on a shared project.
 * Set SUPABASE_ORDERS_TABLE=orders if you use a dedicated project with supabase/migrations.
 */
export function getStoreOrdersTable(): string {
  return process.env.SUPABASE_ORDERS_TABLE?.trim() || "elements_store_orders";
}

/** Server-side client with service role (bypasses RLS). */
export function createSupabaseAdmin(): SupabaseClient | null {
  const config = getSupabaseConfig();
  if (!config) return null;
  return createClient(config.url, config.serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
