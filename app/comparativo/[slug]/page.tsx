import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, X } from "lucide-react";
import { Footer } from "@/app/_components/layout/Footer";
import { Header } from "@/app/_components/layout/Header";
import { Button } from "@/app/_components/ui/button";
import { Card } from "@/app/_components/ui/card";
import { formatCurrency } from "@/app/_lib/format";
import { getBestProductOffer, getComparisonBySlug, getComparisons, getProducts } from "@/data/products";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const comparisons = await getComparisons();
  return comparisons.map((comparison) => ({ slug: comparison.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const comparison = await getComparisonBySlug(slug);
  if (!comparison) return { title: "Comparativo não encontrado" };
  return {
    title: `${comparison.title}: preço, nota e melhor escolha`,
    description: `${comparison.description} Veja recomendação, pontos fortes, pontos fracos e ofertas disponíveis.`,
    alternates: { canonical: `/comparativo/${comparison.slug}` },
    openGraph: { title: comparison.title, description: comparison.description, type: "article" },
  };
}

export default async function ComparisonDetailPage({ params }: Props) {
  const { slug } = await params;
  const [comparison, products] = await Promise.all([getComparisonBySlug(slug), getProducts()]);
  if (!comparison) notFound();

  const comparedProducts = comparison.productIds.length
    ? comparison.productIds.map((productId) => products.find((product) => product.id === productId)).filter(Boolean)
    : products.slice(0, 3);

  if (comparedProducts.length === 0) notFound();

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: comparison.title,
    description: comparison.description,
    mainEntity: comparedProducts.map((product) => ({ "@type": "Product", name: product?.name })),
  };

  return (
    <>
      <Header />
      <main className="mx-auto flex max-w-7xl flex-1 flex-col gap-8 px-4 py-8 md:py-12">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
        <div className="flex flex-col gap-3">
          <Link href="/comparativos" className="text-sm font-black text-cyan-300">Comparativos</Link>
          <h1 className="text-[2rem] font-black leading-tight text-white md:text-5xl">{comparison.title}</h1>
          <p className="max-w-3xl text-lg leading-8 text-sky-100/75">{comparison.description}</p>
          <p className="max-w-3xl rounded-2xl border border-emerald-300/15 bg-emerald-300/10 p-4 text-sm font-semibold leading-6 text-emerald-100">{comparison.recommendationSummary}</p>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {comparedProducts.map((product, index) => {
            if (!product) return null;
            const bestOffer = getBestProductOffer(product);
            const labels = ["melhor para custo-benefício", "melhor para performance", "melhor para preço baixo"];
            return (
              <Card key={product.id} className="flex flex-col gap-5 rounded-2xl border-slate-800 bg-[#07101f] p-5 shadow-xl shadow-black/20">
                <img src={product.image} alt={product.name} className="aspect-[1.2/1] w-full rounded-xl object-cover" />
                <div className="flex flex-col gap-2">
                  <span className="w-fit rounded-full bg-cyan-300/10 px-3 py-1 text-xs font-black text-cyan-100">Produto {String.fromCharCode(65 + index)} · {labels[index] ?? "boa opção"}</span>
                  <h2 className="text-xl font-black leading-tight text-white">{product.name}</h2>
                  <p className="line-clamp-2 text-sm leading-6 text-sky-100/70">{product.shortDescription}</p>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <span className="rounded-xl bg-white/[0.04] p-3 text-sky-100/60">Preço médio<strong className="mt-1 block text-white">{formatCurrency(bestOffer.price)}</strong></span>
                  <span className="rounded-xl bg-white/[0.04] p-3 text-sky-100/60">Nota<strong className="mt-1 block text-white">{product.rating.toFixed(1)} / 5</strong></span>
                </div>
                <div className="grid gap-2 text-sm leading-6">
                  <span className="flex gap-2 text-emerald-200"><Check className="mt-1 size-4 shrink-0" /> {product.pros[0] ?? "bom custo-benefício"}</span>
                  <span className="flex gap-2 text-amber-200"><X className="mt-1 size-4 shrink-0" /> {product.cons[0] ?? "preço pode variar por loja"}</span>
                </div>
                <Button asChild className="mt-auto h-11 rounded-xl bg-[#38aefb] font-black text-slate-950">
                  <Link href={`/produto/${product.slug}`}>Ver ofertas <ArrowRight className="size-4" /></Link>
                </Button>
              </Card>
            );
          })}
        </div>
      </main>
      <Footer />
    </>
  );
}
