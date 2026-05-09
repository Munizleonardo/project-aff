export type BlogPost = {
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  readingTime: string;
  date: string;
  author: string;
  image: string;
  tags: string[];
};

export const blogPosts: BlogPost[] = [
  {
    title: "Como montar um setup gamer equilibrado sem desperdiçar dinheiro",
    slug: "setup-gamer-custo-beneficio",
    excerpt: "O que priorizar em monitor, perifericos, cadeira e iluminacao para ganhar conforto e performance.",
    category: "Setup Gamer",
    readingTime: "7 min",
    date: "2026-04-20",
    author: "Equipe TechHub",
    image: "https://images.unsplash.com/photo-1598550476439-6847785fcea6?auto=format&fit=crop&w=900&q=80",
    tags: ["setup gamer", "perifericos", "review"],
  },
  {
    title: "Produtos inteligentes que realmente fazem sentido no home office",
    slug: "casa-inteligente-home-office",
    excerpt: "Automacoes simples para luz, energia, chamadas e seguranca que melhoram sua rotina.",
    category: "Casa Inteligente",
    readingTime: "5 min",
    date: "2026-04-12",
    author: "Equipe TechHub",
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=900&q=80",
    tags: ["home office", "automacao", "gadgets"],
  },
  {
    title: "Monitor ultrawide vale a pena para trabalho e jogos?",
    slug: "monitor-ultrawide-vale-a-pena",
    excerpt: "Entenda produtividade, ergonomia, imersao e os pontos de atencao antes de comprar.",
    category: "Monitores",
    readingTime: "6 min",
    date: "2026-03-28",
    author: "Equipe TechHub",
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=900&q=80",
    tags: ["monitor", "comparativo", "custo-beneficio"],
  },
];

export const getBlogPostBySlug = (slug: string) =>
  blogPosts.find((post) => post.slug === slug);
