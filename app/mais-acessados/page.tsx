import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ProductGrid } from "@/components/ProductGrid";
import { topProducts } from "@/data/products";

export const metadata: Metadata = {
  title: "Produtos mais acessados",
  description: "Ranking dos produtos tech mais acessados nos últimos dias com avaliações, preços e ofertas.",
  alternates: { canonical: "/mais-acessados" },
};

export default function MostAccessedPage() {
  return (
    <>
      <Header />
      <main className="mx-auto flex max-w-7xl flex-1 flex-col gap-6 px-4 py-10">
        <div>
          <h1 className="text-3xl font-black text-white md:text-4xl">Produtos mais acessados</h1>
          <p className="mt-2 text-slate-300">Ranking preparado para evoluir com analytics, CTR e conversões estimadas.</p>
        </div>
        <ProductGrid products={topProducts} />
      </main>
      <Footer />
    </>
  );
}
