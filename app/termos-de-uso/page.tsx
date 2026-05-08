import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export const metadata: Metadata = { title: "Termos de uso", description: "Termos de uso do portal TechParks.", alternates: { canonical: "/termos-de-uso" } };

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="mx-auto flex max-w-4xl flex-1 flex-col gap-4 px-4 py-10 text-slate-300">
        <h1 className="text-4xl font-black text-white">Termos de uso</h1>
        <p>As informações, preços e avaliações deste MVP são simulados para demonstrar a estrutura de um portal de curadoria tech.</p>
        <p>A compra é sempre finalizada no marketplace parceiro. O TechHub pode receber comissão por compras realizadas através dos links divulgados.</p>
      </main>
      <Footer />
    </>
  );
}
