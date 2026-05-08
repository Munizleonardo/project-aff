import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/app/_components/Footer";
import { Header } from "@/app/_components/Header";
import { Card } from "@/app/_components/ui/card";
import { blogPosts, getBlogPostBySlug } from "@/app/_data/blog-posts";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return { title: "Post não encontrado" };
  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: { title: post.title, description: post.excerpt, type: "article", images: [{ url: post.image }] },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: post.image,
    datePublished: post.date,
    author: { "@type": "Organization", name: post.author },
  };
  return (
    <>
      <Header />
      <main className="mx-auto flex max-w-4xl flex-1 flex-col gap-6 px-4 py-10">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
        <img src={post.image} alt={post.title} className="aspect-[16/11] w-full rounded-xl object-cover sm:aspect-[16/8]" />
        <span className="text-sm font-black uppercase tracking-[0.18em] text-cyan-200">{post.category}</span>
        <h1 className="text-3xl font-black leading-tight text-white md:text-4xl">{post.title}</h1>
        <p className="text-base leading-7 text-slate-300 md:text-lg md:leading-8">{post.excerpt}</p>
        <Card className="prose prose-invert max-w-none rounded-xl border-white/10 bg-white/[0.04] p-4 text-slate-300 md:p-6">
          <p>Este guia mostra critérios práticos para avaliar preço, durabilidade, usabilidade e real ganho de produtividade antes da compra.</p>
          <p>Em um portal maduro, este conteúdo pode receber comparativos automáticos, alertas de preço, FAQs e links internos por intenção de busca.</p>
        </Card>
      </main>
      <Footer />
    </>
  );
}
