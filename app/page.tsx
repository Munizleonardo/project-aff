import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, BadgePercent, BookOpenCheck, Flame, Layers3, LineChart, Sparkles } from "lucide-react";
import { CTASection } from "@/app/_components/marketing/CTASection";
import { Footer } from "@/app/_components/layout/Footer";
import { Header } from "@/app/_components/layout/Header";
import { HeroSection } from "@/app/_components/marketing/HeroSection";
import { DepartmentHighlights } from "@/app/_components/marketing/DepartmentHighlights";
import { ProductGrid } from "@/app/_components/product/ProductGrid";
import { Badge } from "@/app/_components/ui/badge";
import { Button } from "@/app/_components/ui/button";
import { Card } from "@/app/_components/ui/card";
import { formatCurrency } from "@/app/_lib/format";
import { getBestProductOffer, getComparisons, getEstimatedSavings, getFeaturedProducts, getTopProducts } from "@/data/products";

export const metadata: Metadata = {
  title: "Comparador tech para analisar produtos e encontrar a melhor oferta",
  description: "Compare produtos tech, avaliações, preços entre lojas e ofertas de marketplaces antes de decidir onde comprar.",
  alternates: { canonical: "/" },
};

const buyingGuides = [
  "Melhores mouses gamer custo-benefício",
  "Melhores teclados para programadores",
  "Melhores monitores para home office",
  "Gadgets úteis para setup",
];

function SectionHeading({
  icon,
  label,
  title,
  description,
  href,
}: {
  icon: ReactNode;
  label: string;
  title: ReactNode;
  description: string;
  href?: string;
}) {
  return (
    <div className="flex items-start justify-between gap-6 md:items-end">
      <div className="flex flex-col gap-3">
        <Badge className="flex w-fit items-center gap-2 rounded-full border border-slate-700 bg-[#07101f] px-4 py-2 text-sm font-black text-white">{icon} {label}</Badge>
        <h2 className="text-[1.75rem] font-black leading-tight text-white md:text-4xl">{title}</h2>
        <p className="max-w-2xl text-sky-100/75">{description}</p>
      </div>
      {href ? (
        <Link href={href} className="hidden items-center gap-2 text-sm font-black text-[#38aefb] hover:text-cyan-300 md:flex">Ver todos <ArrowRight className="size-4" /></Link>
      ) : null}
    </div>
  );
}

export default async function Home() {
  const [featuredProducts, topProducts, comparisons] = await Promise.all([
    getFeaturedProducts(8),
    getTopProducts(16),
    getComparisons(),
  ]);

  const selectedOfferProducts =
    topProducts.length > 8 ? topProducts.slice(8, 16) : topProducts.slice(0, Math.min(8, topProducts.length));

  return (
    <>
      <Header />
      <main className="flex-1 bg-slate-950">
        <HeroSection />

        <section className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 md:gap-8 md:py-14">
          <SectionHeading
            icon={<Flame className="size-4 text-red-500" />}
            label="Em alta agora"
            title={<>Produtos mais <span className="text-cyan-400">acessados</span></>}
            description="Produtos que mais receberam interesse dos usuários nos últimos dias."
            href="/mais-acessados"
          />
          <ProductGrid products={featuredProducts} />
        </section>

        <section className="mx-auto flex max-w-7xl flex-col gap-6 px-4 pb-10 md:gap-8 md:pb-16">
          <SectionHeading
            icon={<BadgePercent className="size-4 text-emerald-400" />}
            label="Monitoramento de preço"
            title={<>Melhores ofertas <span className="text-cyan-400">de hoje</span></>}
            description="Produtos com queda relevante, melhor preço atual e marketplace com a melhor oferta encontrada."
            href="/ofertas"
          />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {selectedOfferProducts.slice(0, 4).map((product) => {
              const bestOffer = getBestProductOffer(product);
              return (
                <Card key={product.id} className="flex flex-col gap-4 rounded-2xl border-slate-800 bg-[#07101f] p-4 shadow-xl shadow-black/20">
                  <div className="flex gap-3">
                    <img src={product.image} alt={product.name} className="size-20 rounded-xl object-cover" />
                    <div className="flex min-w-0 flex-col gap-1">
                      <strong className="line-clamp-2 text-sm text-white">{product.name}</strong>
                      <span className="text-xs font-bold text-sky-100/55">{product.category}</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <span className="rounded-xl bg-white/[0.04] p-3 text-sky-100/60">
                      Preço antigo
                      <strong className="mt-1 block text-white line-through">{formatCurrency(bestOffer.oldPrice)}</strong>
                    </span>
                    <span className="rounded-xl bg-cyan-400/10 p-3 text-cyan-100">
                      Menor preço
                      <strong className="mt-1 block text-lg">{formatCurrency(bestOffer.price)}</strong>
                    </span>
                  </div>
                  <div className="flex flex-col gap-1 text-sm text-sky-100/70">
                    <span>Economia estimada: <strong className="text-emerald-300">{formatCurrency(getEstimatedSavings(product))}</strong></span>
                    <span>Melhor preço em: <strong className="text-white">{bestOffer.storeName}</strong></span>
                  </div>
                  <Button asChild className="mt-auto h-11 rounded-xl bg-[#38aefb] font-black text-slate-950">
                    <Link href={`/produto/${product.slug}`}>Ver ofertas <ArrowRight className="size-4" /></Link>
                  </Button>
                </Card>
              );
            })}
          </div>
        </section>

        <section className="mx-auto flex max-w-7xl flex-col gap-6 px-4 pb-10 md:gap-8 md:pb-16">
          <SectionHeading
            icon={<LineChart className="size-4 text-cyan-400" />}
            label="Decisão lado a lado"
            title={<>Comparativos <span className="text-cyan-400">populares</span></>}
            description="Guias rápidos para entender diferenças práticas entre produtos, categorias e tecnologias."
            href="/comparativos"
          />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {comparisons.map((comparison) => (
              <Card key={comparison.id} className="flex flex-col gap-4 rounded-2xl border-slate-800 bg-[#07101f] p-5 shadow-xl shadow-black/20">
                <span className="flex size-11 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300"><Layers3 className="size-5" /></span>
                <div className="flex flex-col gap-2">
                  <h3 className="text-lg font-black leading-tight text-white">{comparison.title}</h3>
                  <p className="line-clamp-2 text-sm leading-6 text-sky-100/70">{comparison.description}</p>
                </div>
                <span className="text-xs font-semibold text-emerald-300">{comparison.productIds.length || 3} produtos comparados</span>
                <Button asChild variant="outline" className="mt-auto h-11 rounded-xl border-slate-700 bg-transparent font-black text-white">
                  <Link href={`/comparativo/${comparison.slug}`}>Ver comparativo</Link>
                </Button>
              </Card>
            ))}
          </div>
        </section>

        <section className="mx-auto flex max-w-7xl flex-col gap-6 px-4 pb-10 md:gap-8 md:pb-14">
          <SectionHeading
            icon={<BookOpenCheck className="size-4 text-amber-300" />}
            label="Guias de compra"
            title={<>Escolha com <span className="text-cyan-400">mais contexto</span></>}
            description="Conteúdos para entender quando uma oferta realmente vale a pena."
          />
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {buyingGuides.map((guide) => (
              <Link key={guide} href="/blog" className="flex min-h-24 items-center justify-between gap-4 rounded-2xl border border-slate-800 bg-[#07101f] p-4 text-white transition hover:border-cyan-400/50 hover:bg-white/[0.04]">
                <span className="font-black leading-6">{guide}</span>
                <ArrowRight className="size-4 shrink-0 text-cyan-300" />
              </Link>
            ))}
          </div>
        </section>

        <section className="mx-auto flex max-w-7xl flex-col gap-6 px-4 pb-10 md:gap-8 md:pb-16">
          <SectionHeading
            icon={<Sparkles className="size-4 text-violet-300" />}
            label="Exploração"
            title={<>Categorias em <span className="text-cyan-400">destaque</span></>}
            description="Departamentos pensados para comparação e curadoria tech."
            href="/departamentos"
          />
          <DepartmentHighlights />
        </section>

        <section className="px-4 py-10 md:py-20">
          <CTASection />
        </section>
      </main>
      <Footer />
    </>
  );
}
