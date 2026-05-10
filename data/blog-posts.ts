import { isSupabaseConfigured, supabaseSelect } from "@/app/_lib/supabase-rest";

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  category: string;
  readingTime: string;
  date: string;
  author: string;
  image: string;
  tags: string[];
};

type BlogPostRow = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  category_slug: string | null;
  reading_time: string;
  published_at: string;
  author_name: string;
  image_url: string;
  tags: string[];
};

const fallbackBlogPosts: BlogPost[] = [
  {
    id: "guia-mouses-gamer-custo-beneficio",
    title: "Melhores mouses gamer custo-benefício",
    slug: "melhores-mouses-gamer-custo-beneficio",
    excerpt: "Como comparar sensor, pegada, peso, preço e ofertas antes de escolher um mouse gamer.",
    body: "Um bom mouse gamer custo-benefício precisa equilibrar sensor confiável, formato confortável, peso adequado e preço competitivo.\nAntes de decidir, compare o menor preço entre marketplaces, veja avaliações recentes e confira se o frete não anula a economia.\nModelos de entrada podem valer muito a pena quando entregam boa precisão sem cobrar por recursos premium que você talvez não use.",
    category: "setup-gamer",
    readingTime: "4 min",
    date: new Date().toISOString(),
    author: "TechParks",
    image: "https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=1200&q=80",
    tags: ["mouse gamer", "custo-benefício", "comparativo"],
  },
  {
    id: "guia-teclados-programadores",
    title: "Melhores teclados para programadores",
    slug: "melhores-teclados-para-programadores",
    excerpt: "Veja quando vale escolher teclado mecânico, membrana, layout compacto ou ABNT2.",
    body: "Para programação, conforto e consistência importam mais do que luzes ou recursos decorativos.\nCompare layout, tipo de switch, ruído, ergonomia e preço final entre lojas.\nTeclados mecânicos tendem a entregar melhor resposta, enquanto opções de membrana podem ser mais silenciosas e acessíveis.",
    category: "perifericos",
    readingTime: "5 min",
    date: new Date().toISOString(),
    author: "TechParks",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1200&q=80",
    tags: ["teclado", "programação", "home office"],
  },
  {
    id: "guia-monitores-home-office",
    title: "Melhores monitores para home office",
    slug: "melhores-monitores-para-home-office",
    excerpt: "Compare tamanho, resolução, ergonomia e custo-benefício para trabalhar melhor.",
    body: "Um monitor para home office precisa melhorar leitura, organização de janelas e conforto visual.\nAntes de escolher, compare resolução, tamanho, ajuste de altura, painel e preço médio.\nModelos de 24 a 27 polegadas costumam entregar bom equilíbrio para produtividade sem ocupar espaço demais.",
    category: "monitores",
    readingTime: "4 min",
    date: new Date().toISOString(),
    author: "TechParks",
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=1200&q=80",
    tags: ["monitor", "home office", "produtividade"],
  },
];

function normalizeBlogPost(post: BlogPostRow): BlogPost {
  return {
    id: post.id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    body: post.body,
    category: post.category_slug ?? "",
    readingTime: post.reading_time,
    date: post.published_at,
    author: post.author_name,
    image: post.image_url,
    tags: post.tags ?? [],
  };
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const posts = await supabaseSelect<BlogPostRow>(
    "blog_posts",
    { select: "*", is_active: "eq.true", order: "published_at.desc" },
    { revalidate: 300 }
  );
  return posts.length || isSupabaseConfigured() ? posts.map(normalizeBlogPost) : fallbackBlogPosts;
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await supabaseSelect<BlogPostRow>(
    "blog_posts",
    { select: "*", is_active: "eq.true", slug: `eq.${slug}`, limit: 1 },
    { revalidate: 300 }
  );
  if (posts[0]) return normalizeBlogPost(posts[0]);
  return isSupabaseConfigured() ? null : fallbackBlogPosts.find((post) => post.slug === slug) ?? null;
}
