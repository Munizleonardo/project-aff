import { NextResponse } from "next/server";
import { adminInsert } from "@/app/_lib/supabase-admin";
import { requireAdmin } from "../_utils";

export async function POST(request: Request) {
  const unauthorized = requireAdmin(request);
  if (unauthorized) return unauthorized;

  const body = await request.json();
  const isActive = body.isActive === "true" || body.isActive === true || body.isActive === "on";
  const category = {
    name: body.name,
    slug: body.slug,
    description: body.description ?? "",
    icon_name: body.iconName ?? "tag",
    accent_from: body.accentFrom ?? "from-cyan-400",
    accent_to: body.accentTo ?? "to-blue-600",
    sort_order: Number(body.sortOrder ?? 0),
    is_active: isActive,
  };

  const rows = await adminInsert("categories", category);
  return NextResponse.json(rows[0] ?? null);
}
