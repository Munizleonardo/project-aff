import type { Metadata } from "next";
import { Footer } from "@/app/_components/layout/Footer";
import { Header } from "@/app/_components/layout/Header";

export const metadata: Metadata = { title: "Política de privacidade", description: "Como o TechParks trata dados, cliques e preferências.", alternates: { canonical: "/politica-de-privacidade" } };

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="mx-auto flex max-w-4xl flex-1 flex-col gap-4 px-4 py-10 text-slate-300">
        <h1 className="text-3xl font-black text-white md:text-4xl">Política de privacidade</h1>
        <p>Este MVP utiliza dados simulados. Em versões futuras, cliques, favoritos e preferências poderão ser usados para melhorar recomendações, analytics e alertas de preço.</p>
        <p>Links de oferta podem registrar eventos internos antes do redirecionamento para marketplaces parceiros.</p>
      </main>
      <Footer />
    </>
  );
}
