import { NextResponse } from "next/server";
import { getCategories } from "@/data/categories";

export async function GET() {
  const categories = await getCategories();
  return NextResponse.json(categories.map((category) => ({
    id: category.id,
    name: category.name,
    slug: category.slug,
    description: category.description,
    iconName: category.iconName,
    accent: category.accent,
    sortOrder: category.sortOrder,
  })));
}
