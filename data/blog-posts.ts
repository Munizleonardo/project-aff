import { supabaseSelect } from "@/app/_lib/supabase-rest";

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
  return posts.map(normalizeBlogPost);
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await supabaseSelect<BlogPostRow>(
    "blog_posts",
    { select: "*", is_active: "eq.true", slug: `eq.${slug}`, limit: 1 },
    { revalidate: 300 }
  );
  return posts[0] ? normalizeBlogPost(posts[0]) : null;
}
