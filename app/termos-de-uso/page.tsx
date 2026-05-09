import type { Metadata } from "next";
import { Footer } from "@/app/_components/layout/Footer";
import { Header } from "@/app/_components/layout/Header";

export const metadata: Metadata = { title: "Termos de uso", description: "Termos de uso do portal TechParks.", alternates: { canonical: "/termos-de-uso" } };

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="mx-auto flex max-w-4xl flex-1 flex-col gap-6 px-4 py-10 text-slate-300">
        <h1 className="text-3xl font-black text-white md:text-4xl">Termos de uso</h1>
        <p>Ao acessar ou utilizar o TechParks, o usuario concorda com estes termos e com as regras aplicaveis ao uso da plataforma.</p>
        <section className="grid gap-3">
          <h2 className="text-xl font-black text-white">Finalidade do site</h2>
          <p>O TechParks apresenta curadoria de produtos, ofertas, comparativos, rankings e conteudos relacionados a tecnologia, gadgets e setup.</p>
        </section>
        <section className="grid gap-3">
          <h2 className="text-xl font-black text-white">Informacoes de produtos</h2>
          <p>Precos, disponibilidade, imagens, descricoes e condicoes comerciais podem mudar sem aviso previo. A informacao final deve ser confirmada no marketplace parceiro antes da compra.</p>
        </section>
        <section className="grid gap-3">
          <h2 className="text-xl font-black text-white">Conta do usuario</h2>
          <p>O usuario e responsavel por manter seus dados corretos e proteger sua senha. O uso indevido da conta deve ser comunicado assim que identificado.</p>
        </section>
        <section className="grid gap-3">
          <h2 className="text-xl font-black text-white">Afiliados</h2>
          <p>O TechParks pode receber comissao por compras realizadas por meio dos links divulgados, sem custo adicional para o usuario.</p>
        </section>
        <section className="grid gap-3">
          <h2 className="text-xl font-black text-white">Limitacao de responsabilidade</h2>
          <p>A compra, pagamento, entrega, garantia, troca e suporte comercial sao de responsabilidade do marketplace ou vendedor parceiro.</p>
        </section>
      </main>
      <Footer />
    </>
  );
}
