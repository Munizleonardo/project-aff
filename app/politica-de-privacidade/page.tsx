import type { Metadata } from "next";
import { Footer } from "@/app/_components/layout/Footer";
import { Header } from "@/app/_components/layout/Header";

export const metadata: Metadata = { title: "Politica de privacidade", description: "Como o TechParks trata dados, cliques e preferencias.", alternates: { canonical: "/politica-de-privacidade" } };

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="mx-auto flex max-w-4xl flex-1 flex-col gap-6 px-4 py-10 text-slate-300">
        <h1 className="text-3xl font-black text-white md:text-4xl">Politica de privacidade</h1>
        <p>Esta politica explica como o TechParks coleta, usa e protege informacoes fornecidas pelos usuarios durante o uso do site.</p>
        <section className="grid gap-3">
          <h2 className="text-xl font-black text-white">Dados coletados</h2>
          <p>Podemos coletar nome, email, telefone, dados de cadastro, produtos salvos na Minha Caixa, cliques em ofertas e informacoes tecnicas basicas, como navegador, origem do acesso e data do evento.</p>
        </section>
        <section className="grid gap-3">
          <h2 className="text-xl font-black text-white">Uso das informacoes</h2>
          <p>Usamos esses dados para autenticar usuarios, exibir perfil, salvar favoritos, medir desempenho de ofertas, melhorar recomendacoes e manter a seguranca da plataforma.</p>
        </section>
        <section className="grid gap-3">
          <h2 className="text-xl font-black text-white">Links de afiliado</h2>
          <p>Ao clicar em uma oferta, o TechParks pode registrar o clique antes de redirecionar para um marketplace parceiro. A compra e finalizada fora do TechParks, conforme as regras do marketplace.</p>
        </section>
        <section className="grid gap-3">
          <h2 className="text-xl font-black text-white">Compartilhamento e seguranca</h2>
          <p>As informacoes nao sao vendidas. Dados podem ser processados por servicos essenciais ao funcionamento do site, como banco de dados, autenticacao, hospedagem e ferramentas de analise.</p>
        </section>
        <section className="grid gap-3">
          <h2 className="text-xl font-black text-white">Direitos do usuario</h2>
          <p>O usuario pode solicitar atualizacao, correcao ou exclusao dos dados cadastrados, respeitando obrigacoes legais e registros necessarios para seguranca.</p>
        </section>
      </main>
      <Footer />
    </>
  );
}
