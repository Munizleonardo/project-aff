import type { LucideIcon } from "lucide-react";
import { supabaseSelect } from "@/app/_lib/supabase-rest";
import { withCategoryIcon } from "./category-icons";

export type CategoryRecord = {
  id: string;
  name: string;
  slug: string;
  description: string;
  iconName: string;
  accent: string;
  sortOrder: number;
};

export type Category = CategoryRecord & {
  icon: LucideIcon;
};

export async function getCategories(): Promise<Category[]> {
  const categories = await supabaseSelect<CategoryRecord>(
    "category_public",
    { select: "*", order: "sortOrder.asc,name.asc" },
    { revalidate: 300 }
  );
  return categories.map(withCategoryIcon);
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const categories = await supabaseSelect<CategoryRecord>(
    "category_public",
    { select: "*", slug: `eq.${slug}`, limit: 1 },
    { revalidate: 300 }
  );
  return categories[0] ? withCategoryIcon(categories[0]) : null;
}
