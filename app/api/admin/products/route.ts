import { NextResponse } from "next/server";
import { adminInsert } from "@/app/_lib/supabase-admin";
import { requireAdmin } from "../_utils";

export async function POST(request: Request) {
  const unauthorized = requireAdmin(request);
  if (unauthorized) return unauthorized;

  const body = await request.json();
  const isFeatured = body.featured === "true" || body.featured === true || body.featured === "on";
  const isActive = body.isActive === "true" || body.isActive === true || body.isActive === "on";
  const product = {
    name: body.name,
    slug: body.slug,
    short_description: body.shortDescription ?? "",
    full_description: body.fullDescription ?? "",
    category_id: body.categoryId || null,
    department_slug: body.departmentSlug || null,
    main_image_url: body.mainImageUrl ?? "",
    old_price: Number(body.oldPrice ?? 0),
    price: Number(body.price ?? 0),
    installment: body.installment ?? "",
    discount_percentage: Number(body.discountPercentage ?? 0),
    rating: Number(body.rating ?? 0),
    reviews_count: Number(body.reviewsCount ?? 0),
    clicks_count: Number(body.clicksCount ?? 0),
    tags: Array.isArray(body.tags) ? body.tags : String(body.tags ?? "").split(",").map((tag) => tag.trim()).filter(Boolean),
    specs: body.specs && typeof body.specs === "object" ? body.specs : {},
    pros: Array.isArray(body.pros) ? body.pros : String(body.pros ?? "").split("\n").map((item) => item.trim()).filter(Boolean),
    cons: Array.isArray(body.cons) ? body.cons : String(body.cons ?? "").split("\n").map((item) => item.trim()).filter(Boolean),
    featured: isFeatured,
    is_active: isActive,
  };

  const rows = await adminInsert("products", product);
  return NextResponse.json(rows[0] ?? null);
}
