import type { Metadata } from "next";
import { BlogCard } from "@/app/_components/blog/BlogCard";
import { Footer } from "@/app/_components/layout/Footer";
import { Header } from "@/app/_components/layout/Header";
import { getBlogPosts } from "@/data/blog-posts";

export const metadata: Metadata = {
  title: "Blog tech, reviews e guias de compra",
  description: "Guias sobre setup, gadgets, casa inteligente, home office e comparativos para decidir melhor.",
  alternates: { canonical: "/blog" },
};

export default async function BlogPage() {
  const blogPosts = await getBlogPosts();

  return (
    <>
      <Header />
      <main className="mx-auto flex max-w-7xl flex-1 flex-col gap-6 px-4 py-10">
        <h1 className="text-3xl font-black text-white md:text-4xl">Blog</h1>
        <div className="grid gap-5 md:grid-cols-3">
          {blogPosts.map((post) => <BlogCard key={post.slug} post={post} />)}
        </div>
      </main>
      <Footer />
    </>
  );
}
