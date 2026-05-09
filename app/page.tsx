import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Flame } from "lucide-react";
import { CTASection } from "@/app/_components/marketing/CTASection";
import { Footer } from "@/app/_components/layout/Footer";
import { Header } from "@/app/_components/layout/Header";
import { HeroSection } from "@/app/_components/marketing/HeroSection";
import { DepartmentHighlights } from "@/app/_components/marketing/DepartmentHighlights";
import { ProductGrid } from "@/app/_components/product/ProductGrid";
import { Badge } from "@/app/_components/ui/badge";
import { featuredProducts, topProducts } from "@/data/products";

export const metadata: Metadata = {
  title: "Ofertas tech, gadgets e setup com curadoria inteligente",
  description: "Compare produtos tech, veja rankings, avaliações simuladas e acesse ofertas em marketplaces parceiros por rotas internas de oferta.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-slate-950">
        <HeroSection />
        <section className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 md:gap-8 md:py-14">
          <div className="flex items-start justify-between gap-6 md:items-end">
            <div className="flex flex-col gap-3">
              <Badge className="flex w-fit items-center gap-2 rounded-full border border-slate-700 bg-[#07101f] px-4 py-2 text-sm font-black text-white"><Flame className="size-4 text-red-500" /> Em alta agora</Badge>
              <h2 className="text-[1.75rem] font-black leading-tight text-white md:text-4xl">Produtos mais <span className="text-cyan-400">acessados</span></h2>
              <p className="text-sky-100/75">Os produtos que mais chamaram atenção dos usuários nos últimos dias.</p>
            </div>
            <Link href="/mais-acessados" className="hidden items-center gap-2 text-sm font-black text-[#38aefb] hover:text-cyan-300 md:flex">Ver todos <ArrowRight className="size-4" /></Link>
          </div>
          <ProductGrid products={featuredProducts} />
        </section>
        <section className="mx-auto flex max-w-7xl flex-col gap-6 px-4 pb-10 md:gap-8 md:pb-16">
          <div className="flex items-start justify-between gap-6 md:items-end">
            <div className="flex flex-col gap-2">
              <h2 className="text-[1.75rem] font-black leading-tight text-white md:text-4xl">Explore por <span className="text-cyan-400">departamento</span></h2>
              <p className="text-sky-100/75">Encontre exatamente o que procura</p>
            </div>
            <Link href="/departamentos" className="hidden items-center gap-2 text-sm font-black text-[#38aefb] hover:text-cyan-300 md:flex">Ver todos <ArrowRight className="size-4" /></Link>
          </div>
          <DepartmentHighlights />
        </section>
        <section className="mx-auto flex max-w-7xl flex-col gap-6 px-4 pb-10 md:pb-12">
          <div className="flex flex-col gap-2">
            <h2 className="text-[1.75rem] font-black leading-tight text-white md:text-4xl">Ofertas <span className="text-cyan-400">selecionadas</span></h2>
            <p className="text-sky-100/75">Uma vitrine escalável para destacar tendências, CTR e conversões estimadas no futuro.</p>
          </div>
          <ProductGrid products={topProducts.slice(7, 15)} />
        </section>
        <section className="px-4 py-10 md:py-20">
          <CTASection />
        </section>
      </main>
      <Footer />
    </>
  );
}
