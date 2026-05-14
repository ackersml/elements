import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getSupabase() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY is not set");
  return createClient(url, key);
}

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const email = searchParams.get("email");
  const id = searchParams.get("id");
  const sessionId = searchParams.get("session_id");

  if (!email?.trim()) {
    return NextResponse.json(
      { error: "email is required" },
      { status: 400 }
    );
  }

  if (!id && !sessionId) {
    return NextResponse.json(
      { error: "id or session_id is required" },
      { status: 400 }
    );
  }

  try {
    const supabase = getSupabase();

    let query = supabase
      .from("orders")
      .select("id, status, tracking_url, tracking_number, created_at, line_items")
      .eq("email", email.trim().toLowerCase());

    if (id) {
      query = query.eq("id", id);
    } else if (sessionId) {
      query = query.eq("stripe_session_id", sessionId);
    }

    const { data, error } = await query.maybeSingle();

    if (error) {
      console.error("Orders lookup error:", error);
      return NextResponse.json(
        { error: "Failed to lookup order" },
        { status: 500 }
      );
    }

    if (!data) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    const lineItemsSummary = Array.isArray(data.line_items)
      ? data.line_items.map((item: { productName?: string; quantity?: number }) => ({
          productName: item.productName,
          quantity: item.quantity,
        }))
      : undefined;

    return NextResponse.json({
      id: data.id,
      status: data.status,
      tracking_url: data.tracking_url,
      tracking_number: data.tracking_number,
      created_at: data.created_at,
      line_items: lineItemsSummary,
    });
  } catch (err) {
    console.error("Orders API error:", err);
    return NextResponse.json(
      { error: "Failed to lookup order" },
      { status: 500 }
    );
  }
}
