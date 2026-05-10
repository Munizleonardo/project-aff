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

export const defaultTechCategories: CategoryRecord[] = [
  {
    id: "setup-gamer",
    name: "Setup Gamer",
    slug: "setup-gamer",
    description: "Mouses, teclados, headsets e acessórios para jogar melhor.",
    iconName: "gamepad",
    accent: "from-cyan-400 to-blue-600",
    sortOrder: 10,
  },
  {
    id: "home-office",
    name: "Home Office",
    slug: "home-office",
    description: "Produtos para produtividade, ergonomia e rotina de trabalho.",
    iconName: "briefcase-business",
    accent: "from-emerald-400 to-teal-600",
    sortOrder: 20,
  },
  {
    id: "perifericos",
    name: "Periféricos",
    slug: "perifericos",
    description: "Teclados, mouses, webcams e controles para comparar.",
    iconName: "keyboard",
    accent: "from-violet-400 to-fuchsia-600",
    sortOrder: 30,
  },
  {
    id: "monitores",
    name: "Monitores",
    slug: "monitores",
    description: "Telas para jogos, trabalho, edição e estudo.",
    iconName: "monitor",
    accent: "from-sky-400 to-indigo-600",
    sortOrder: 40,
  },
  {
    id: "notebooks",
    name: "Notebooks",
    slug: "notebooks",
    description: "Modelos para estudo, trabalho, criação e performance.",
    iconName: "laptop",
    accent: "from-amber-300 to-orange-600",
    sortOrder: 50,
  },
  {
    id: "smartphones",
    name: "Smartphones",
    slug: "smartphones",
    description: "Celulares para câmera, bateria, jogos e custo-benefício.",
    iconName: "smartphone",
    accent: "from-lime-300 to-emerald-600",
    sortOrder: 60,
  },
  {
    id: "gadgets",
    name: "Gadgets",
    slug: "gadgets",
    description: "Achados inteligentes para facilitar o dia a dia.",
    iconName: "sparkles",
    accent: "from-rose-400 to-red-600",
    sortOrder: 70,
  },
  {
    id: "casa-inteligente",
    name: "Casa Inteligente",
    slug: "casa-inteligente",
    description: "Automação, iluminação, sensores e dispositivos conectados.",
    iconName: "home",
    accent: "from-cyan-300 to-emerald-600",
    sortOrder: 80,
  },
  {
    id: "audio",
    name: "Áudio",
    slug: "audio",
    description: "Fones, caixas e headsets para diferentes usos.",
    iconName: "headphones",
    accent: "from-blue-400 to-violet-600",
    sortOrder: 90,
  },
  {
    id: "acessorios",
    name: "Acessórios",
    slug: "acessorios",
    description: "Cabos, hubs, suportes, carregadores e complementos.",
    iconName: "plug-zap",
    accent: "from-slate-300 to-cyan-600",
    sortOrder: 100,
  },
];

export async function getCategories(): Promise<Category[]> {
  const categories = await supabaseSelect<CategoryRecord>(
    "category_public",
    { select: "*", order: "sortOrder.asc,name.asc" },
    { revalidate: 300 }
  );
  return (categories.length ? categories : defaultTechCategories).map(withCategoryIcon);
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const categories = await supabaseSelect<CategoryRecord>(
    "category_public",
    { select: "*", slug: `eq.${slug}`, limit: 1 },
    { revalidate: 300 }
  );
  const category = categories[0] ?? defaultTechCategories.find((item) => item.slug === slug);
  return category ? withCategoryIcon(category) : null;
}
