import type { Metadata } from "next";
import { Footer } from "@/app/_components/layout/Footer";
import { Header } from "@/app/_components/layout/Header";

export const metadata: Metadata = { title: "Política de privacidade", description: "Como o TechParks trata dados, cliques e preferências.", alternates: { canonical: "/politica-de-privacidade" } };

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="mx-auto flex max-w-4xl flex-1 flex-col gap-6 px-4 py-10 text-slate-300">
        <h1 className="text-3xl font-black text-white md:text-4xl">Política de privacidade</h1>
        <p>Esta política explica como o TechParks coleta, usa e protege informações fornecidas pelos usuários durante o uso do site.</p>
        <section className="grid gap-3">
          <h2 className="text-xl font-black text-white">Dados coletados</h2>
          <p>Podemos coletar nome, email, telefone, dados de cadastro, produtos salvos na Minha Caixa, cliques em ofertas e informações técnicas básicas, como navegador, origem do acesso e data do evento.</p>
        </section>
        <section className="grid gap-3">
          <h2 className="text-xl font-black text-white">Uso das informações</h2>
          <p>Usamos esses dados para autenticar usuários, exibir perfil, salvar favoritos, medir desempenho de ofertas, melhorar recomendações e manter a segurança da plataforma.</p>
        </section>
        <section className="grid gap-3">
          <h2 className="text-xl font-black text-white">Links de afiliado</h2>
          <p>Ao clicar em uma oferta, o TechParks pode registrar o clique antes de redirecionar para um marketplace parceiro. A compra é finalizada fora do TechParks, conforme as regras do marketplace.</p>
        </section>
        <section className="grid gap-3">
          <h2 className="text-xl font-black text-white">Compartilhamento e segurança</h2>
          <p>As informações não são vendidas. Dados podem ser processados por serviços essenciais ao funcionamento do site, como banco de dados, autenticação, hospedagem e ferramentas de análise.</p>
        </section>
        <section className="grid gap-3">
          <h2 className="text-xl font-black text-white">Direitos do usuário</h2>
          <p>O usuário pode solicitar atualização, correção ou exclusão dos dados cadastrados, respeitando obrigações legais e registros necessários para segurança.</p>
        </section>
      </main>
      <Footer />
    </>
  );
}
