import type { MetadataRoute } from "next";
import { blogPosts } from "@/data/blog-posts";
import { categories } from "@/data/categories";
import { products } from "@/data/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://techparks.example";
  const staticRoutes = ["", "/departamentos", "/ofertas", "/mais-acessados", "/blog", "/comparativos", "/login", "/cadastro", "/politica-de-privacidade", "/termos-de-uso"];
  const now = new Date();
  return [
    ...staticRoutes.map((route) => ({ url: `${baseUrl}${route}`, lastModified: now, changeFrequency: "weekly" as const, priority: route === "" ? 1 : 0.7 })),
    ...products.map((product) => ({ url: `${baseUrl}/produto/${product.slug}`, lastModified: now, changeFrequency: "daily" as const, priority: 0.9 })),
    ...categories.map((category) => ({ url: `${baseUrl}/categoria/${category.slug}`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.8 })),
    ...blogPosts.map((post) => ({ url: `${baseUrl}/blog/${post.slug}`, lastModified: new Date(post.date), changeFrequency: "monthly" as const, priority: 0.6 })),
  ];
}
