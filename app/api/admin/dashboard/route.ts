import { NextResponse } from "next/server";
import { adminCount, adminSelect } from "@/app/_lib/supabase-admin";
import { requireAdmin } from "../_utils";

export async function GET(request: Request) {
  const unauthorized = requireAdmin(request);
  if (unauthorized) return unauthorized;

  const [productCount, categoryCount, profileCount, clickCount, topProducts, products, categories, recentClicks, recentProfiles] = await Promise.all([
    adminCount("products"),
    adminCount("categories"),
    adminCount("profiles"),
    adminCount("click_events"),
    adminSelect("product_catalog", { select: "id,name,slug,clicks,price", order: "clicks.desc", limit: 8 }),
    adminSelect("products", { select: "id,name,slug", order: "name.asc", limit: 200 }),
    adminSelect("categories", { select: "id,name,slug", order: "sort_order.asc,name.asc", limit: 100 }),
    adminSelect("click_events", { select: "id,product_id,source,created_at", order: "created_at.desc", limit: 10 }),
    adminSelect("profiles", { select: "id,full_name,email,created_at", order: "created_at.desc", limit: 8 }),
  ]);

  return NextResponse.json({
    counts: { productCount, categoryCount, profileCount, clickCount },
    topProducts,
    products,
    categories,
    recentClicks,
    recentProfiles,
  });
}
