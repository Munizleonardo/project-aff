import type { Metadata } from "next";
import { Tag } from "lucide-react";
import { Footer } from "@/app/_components/layout/Footer";
import { Header } from "@/app/_components/layout/Header";
import { ProductGrid } from "@/app/_components/product/ProductGrid";
import { getProducts } from "@/data/products";

export const metadata: Metadata = {
  title: "Melhores ofertas tech comparadas",
  description: "Compare ofertas tech com menor preço encontrado, avaliações e links seguros para marketplaces parceiros.",
  alternates: { canonical: "/ofertas" },
};

export default async function OffersPage() {
  const products = await getProducts();

  return (
    <>
      <Header />
      <main className="mx-auto flex max-w-[1120px] flex-1 flex-col gap-6 px-4 py-8 md:gap-8 md:py-14">
        <div className="flex items-start gap-3 sm:items-center sm:gap-4">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-[16px] bg-red-500 text-white shadow-xl shadow-red-950/30 sm:size-14 sm:rounded-[18px]">
            <Tag className="size-6 sm:size-7" />
          </span>
          <div>
            <h1 className="text-[1.9rem] font-black leading-tight text-white sm:text-4xl">Ofertas <span className="text-cyan-400">comparadas</span></h1>
            <p className="mt-1 text-base text-sky-100/70">Produtos com menor preço encontrado e análise rápida</p>
          </div>
        </div>
        <ProductGrid products={[...products].sort((a, b) => b.discountPercentage - a.discountPercentage)} />
      </main>
      <Footer />
    </>
  );
}
