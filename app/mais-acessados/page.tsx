import type { Metadata } from "next";
import { Footer } from "@/app/_components/layout/Footer";
import { Header } from "@/app/_components/layout/Header";
import { ProductGrid } from "@/app/_components/product/ProductGrid";
import { getTopProducts } from "@/data/products";

export const metadata: Metadata = {
  title: "Produtos mais acessados",
  description: "Ranking dos produtos tech mais acessados nos últimos dias com avaliações, preços e ofertas.",
  alternates: { canonical: "/mais-acessados" },
};

export default async function MostAccessedPage() {
  const topProducts = await getTopProducts();

  return (
    <>
      <Header />
      <main className="mx-auto flex max-w-7xl flex-1 flex-col gap-6 px-4 py-8 md:py-10">
        <div>
          <h1 className="text-[1.9rem] font-black leading-tight text-white md:text-4xl">Produtos mais acessados</h1>
          <p className="mt-2 text-slate-300">Ranking preparado para evoluir com analytics, CTR e conversões estimadas.</p>
        </div>
        <ProductGrid products={topProducts} />
      </main>
      <Footer />
    </>
  );
}
