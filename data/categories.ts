import {
  BriefcaseBusiness,
  Gamepad2,
  Headphones,
  Home,
  Keyboard,
  Laptop,
  Monitor,
  PlugZap,
  Smartphone,
  Sparkles,
  Tag,
  TrendingUp,
} from "lucide-react";

export type Category = {
  name: string;
  slug: string;
  description: string;
  icon: typeof Monitor;
  accent: string;
};

export const categories: Category[] = [
  { name: "Setup Gamer", slug: "setup-gamer", description: "Cadeiras, mesas, RGB e performance.", icon: Gamepad2, accent: "from-cyan-400 to-blue-600" },
  { name: "Home Office", slug: "home-office", description: "Produtividade, conforto e foco.", icon: BriefcaseBusiness, accent: "from-blue-400 to-violet-600" },
  { name: "Perifericos", slug: "perifericos", description: "Mouses, teclados e controles precisos.", icon: Keyboard, accent: "from-fuchsia-400 to-cyan-500" },
  { name: "Monitores", slug: "monitores", description: "Telas ultrawide, 4K e alta taxa.", icon: Monitor, accent: "from-sky-400 to-indigo-600" },
  { name: "Notebooks", slug: "notebooks", description: "Maquinas para trabalho, criacao e jogos.", icon: Laptop, accent: "from-violet-400 to-blue-600" },
  { name: "Smartphones", slug: "smartphones", description: "Celulares equilibrados e premium.", icon: Smartphone, accent: "from-cyan-400 to-teal-500" },
  { name: "Gadgets", slug: "gadgets", description: "Achados inteligentes para o dia a dia.", icon: Sparkles, accent: "from-purple-400 to-pink-500" },
  { name: "Casa Inteligente", slug: "casa-inteligente", description: "Automacao, seguranca e economia.", icon: Home, accent: "from-emerald-400 to-cyan-500" },
  { name: "Audio", slug: "audio", description: "Fones, caixas e microfones.", icon: Headphones, accent: "from-blue-400 to-purple-600" },
  { name: "Acessorios", slug: "acessorios", description: "Suportes, hubs, cabos e energia.", icon: PlugZap, accent: "from-cyan-300 to-slate-600" },
  { name: "Ofertas", slug: "ofertas", description: "Promocoes curadas todos os dias.", icon: Tag, accent: "from-rose-400 to-orange-500" },
  { name: "Mais Acessados", slug: "mais-acessados", description: "O que esta chamando mais cliques.", icon: TrendingUp, accent: "from-amber-300 to-cyan-500" },
];

export const getCategoryBySlug = (slug: string) =>
  categories.find((category) => category.slug === slug);
