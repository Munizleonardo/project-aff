import type { Metadata } from "next";
import { Tag } from "lucide-react";
import { Footer } from "@/app/_components/Footer";
import { Header } from "@/app/_components/Header";
import { ProductGrid } from "@/app/_components/ProductGrid";
import { products } from "@/app/_data/products";

export const metadata: Metadata = {
  title: "Ofertas tech com desconto",
  description: "Produtos tech com descontos, precos destacados e links internos para ofertas em marketplaces parceiros.",
  alternates: { canonical: "/ofertas" },
};

export default function OffersPage() {
  return (
    <>
      <Header />
      <main className="mx-auto flex max-w-[1120px] flex-1 flex-col gap-8 px-4 py-10 md:py-14">
        <div className="flex items-start gap-3 sm:items-center sm:gap-4">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-[16px] bg-red-500 text-white shadow-xl shadow-red-950/30 sm:size-14 sm:rounded-[18px]">
            <Tag className="size-6 sm:size-7" />
          </span>
          <div>
            <h1 className="text-3xl font-black text-white sm:text-4xl">Ofertas <span className="text-cyan-400">imperdiveis</span></h1>
            <p className="mt-1 text-base text-sky-100/70">Os maiores descontos do momento</p>
          </div>
        </div>
        <ProductGrid products={[...products].sort((a, b) => b.discountPercentage - a.discountPercentage)} />
      </main>
      <Footer />
    </>
  );
}
