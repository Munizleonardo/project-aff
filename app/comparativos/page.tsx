import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/app/_components/Footer";
import { Header } from "@/app/_components/Header";
import { products } from "@/app/_data/products";
import { formatCurrency } from "@/app/_lib/format";

export const metadata: Metadata = {
  title: "Comparativos de produtos tech",
  description: "Compare preço, avaliação, acessos e custo-benefício de produtos tech selecionados.",
  alternates: { canonical: "/comparativos" },
};

export default function ComparisonsPage() {
  return (
    <>
      <Header />
      <main className="mx-auto flex max-w-7xl flex-1 flex-col gap-6 px-4 py-10">
        <h1 className="text-3xl font-black text-white md:text-4xl">Comparativos</h1>
        <div className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.04]">
          {products.slice(0, 8).map((product) => (
            <Link key={product.id} href={`/produto/${product.slug}`} className="grid gap-3 border-b border-white/10 p-4 text-sm transition hover:bg-white/[0.06] md:grid-cols-[1.4fr_1fr_1fr_1fr]">
              <strong className="text-white">{product.name}</strong>
              <span className="text-slate-300">{formatCurrency(product.price)}</span>
              <span className="text-slate-300">{product.rating.toFixed(1)} / 5</span>
              <span className="text-cyan-200">{product.clicks.toLocaleString("pt-BR")} acessos</span>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
