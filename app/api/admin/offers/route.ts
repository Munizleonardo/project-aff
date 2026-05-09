import { NextResponse } from "next/server";
import { adminInsert } from "@/app/_lib/supabase-admin";
import { requireAdmin } from "../_utils";

export async function POST(request: Request) {
  const unauthorized = requireAdmin(request);
  if (unauthorized) return unauthorized;

  const body = await request.json();
  const isPrimary = body.isPrimary === "true" || body.isPrimary === true || body.isPrimary === "on";
  const isActive = body.isActive === "true" || body.isActive === true || body.isActive === "on";
  const offer = {
    product_id: body.productId,
    marketplace_name: body.marketplaceName,
    affiliate_url: body.affiliateUrl,
    price: body.price === "" || body.price == null ? null : Number(body.price),
    old_price: body.oldPrice === "" || body.oldPrice == null ? null : Number(body.oldPrice),
    installment: body.installment || null,
    discount_percentage: body.discountPercentage === "" || body.discountPercentage == null ? null : Number(body.discountPercentage),
    is_primary: isPrimary,
    is_active: isActive,
    starts_at: body.startsAt || null,
    ends_at: body.endsAt || null,
  };

  const rows = await adminInsert("affiliate_offers", offer);
  return NextResponse.json(rows[0] ?? null);
}
