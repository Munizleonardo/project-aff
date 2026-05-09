import type { Metadata } from "next";
import { MyBoxView } from "@/app/_components/auth/MyBoxView";
import { Footer } from "@/app/_components/layout/Footer";
import { Header } from "@/app/_components/layout/Header";

export const metadata: Metadata = {
  title: "Minha Caixa",
  description: "Produtos e ofertas salvos na sua conta TechParks.",
  alternates: { canonical: "/minha-caixa" },
};

export default function MyBoxPage() {
  return (
    <>
      <Header />
      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-5 px-4 py-10 md:py-12">
        <div>
          <h1 className="text-3xl font-black text-white md:text-4xl">Minha Caixa</h1>
          <p className="mt-2 text-slate-300">Produtos e ofertas que voce salvou para ver depois.</p>
        </div>
        <MyBoxView />
      </main>
      <Footer />
    </>
  );
}
