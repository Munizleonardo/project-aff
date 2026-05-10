import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Layers3 } from "lucide-react";
import { Footer } from "@/app/_components/layout/Footer";
import { Header } from "@/app/_components/layout/Header";
import { Button } from "@/app/_components/ui/button";
import { Card } from "@/app/_components/ui/card";
import { getComparisons } from "@/data/products";

export const metadata: Metadata = {
  title: "Comparativos de produtos tech",
  description: "Compare preço, avaliação, pontos fortes e melhor uso de produtos tech antes de escolher uma oferta.",
  alternates: { canonical: "/comparativos" },
};

export default async function ComparisonsPage() {
  const comparisons = await getComparisons();

  return (
    <>
      <Header />
      <main className="mx-auto flex max-w-7xl flex-1 flex-col gap-8 px-4 py-8 md:py-12">
        <div className="flex flex-col gap-3">
          <span className="w-fit rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm font-black text-cyan-100">Comparativos tech</span>
          <h1 className="text-[2rem] font-black leading-tight text-white md:text-5xl">Compare opções antes de decidir</h1>
          <p className="max-w-2xl text-sky-100/75">Guias lado a lado para entender preço médio, nota, melhor uso, pontos fortes e pontos fracos.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {comparisons.map((comparison) => (
            <Card key={comparison.id} className="flex flex-col gap-5 rounded-2xl border-slate-800 bg-[#07101f] p-5 shadow-xl shadow-black/20">
              <span className="flex size-12 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300"><Layers3 className="size-6" /></span>
              <div className="flex flex-col gap-2">
                <h2 className="text-2xl font-black text-white">{comparison.title}</h2>
                <p className="leading-7 text-sky-100/70">{comparison.description}</p>
              </div>
              <p className="rounded-xl border border-emerald-300/15 bg-emerald-300/10 p-3 text-sm font-semibold leading-6 text-emerald-100">{comparison.recommendationSummary}</p>
              <Button asChild className="mt-auto h-11 w-fit rounded-xl bg-[#38aefb] px-5 font-black text-slate-950">
                <Link href={`/comparativo/${comparison.slug}`}>Ver comparativo <ArrowRight className="size-4" /></Link>
              </Button>
            </Card>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
