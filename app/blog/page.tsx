import type { Metadata } from "next";
import { BlogCard } from "@/components/BlogCard";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { blogPosts } from "@/data/blog-posts";

export const metadata: Metadata = {
  title: "Blog tech, reviews e guias de compra",
  description: "Guias sobre setup, gadgets, casa inteligente, home office e comparativos para comprar melhor.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  return (
    <>
      <Header />
      <main className="mx-auto flex max-w-7xl flex-1 flex-col gap-6 px-4 py-10">
        <h1 className="text-4xl font-black text-white">Blog</h1>
        <div className="grid gap-5 md:grid-cols-3">
          {blogPosts.map((post) => <BlogCard key={post.slug} post={post} />)}
        </div>
      </main>
      <Footer />
    </>
  );
}
