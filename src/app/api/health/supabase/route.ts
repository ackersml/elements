import { NextResponse } from "next/server";
import {
  createSupabaseAdmin,
  getStoreOrdersTable,
  getSupabaseConfig,
} from "@/lib/supabase-server";

export const runtime = "nodejs";

/** Verifies Supabase env + DB reachability (no secrets in response). */
export async function GET() {
  const config = getSupabaseConfig();
  if (!config) {
    return NextResponse.json(
      {
        ok: false,
        configured: false,
        hint: "Set SUPABASE_URL (or NEXT_PUBLIC_SUPABASE_URL) and SUPABASE_SERVICE_ROLE_KEY on Vercel, then redeploy.",
      },
      { status: 503 }
    );
  }

  const supabase = createSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json({ ok: false, configured: false }, { status: 503 });
  }

  const table = getStoreOrdersTable();
  const { error } = await supabase.from(table).select("id").limit(1);

  if (error) {
    const missingTable =
      error.code === "PGRST205" ||
      error.message.includes("Could not find the table");
    return NextResponse.json(
      {
        ok: false,
        configured: true,
        database: false,
        error: missingTable
          ? `${table} table missing — run supabase/migrations on this project`
          : error.message,
      },
      { status: 503 }
    );
  }

  return NextResponse.json({
    ok: true,
    configured: true,
    database: true,
    projectHost: new URL(config.url).hostname,
    ordersTable: table,
  });
}
