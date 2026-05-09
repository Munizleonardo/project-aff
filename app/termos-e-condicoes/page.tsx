import type { Metadata } from "next";
import { Footer } from "@/app/_components/layout/Footer";
import { Header } from "@/app/_components/layout/Header";

export const metadata: Metadata = {
  title: "Termos e condições",
  description: "Condições gerais para cadastro e uso do TechParks.",
  alternates: { canonical: "/termos-e-condicoes" },
};

export default function TermsAndConditionsPage() {
  return (
    <>
      <Header />
      <main className="mx-auto flex max-w-4xl flex-1 flex-col gap-6 px-4 py-10 text-slate-300">
        <h1 className="text-3xl font-black text-white md:text-4xl">Termos e condições</h1>
        <p>Estes termos e condições definem as regras gerais para cadastro, navegação, uso da Minha Caixa e acesso aos links de ofertas divulgados pelo TechParks.</p>

        <section className="grid gap-3">
          <h2 className="text-xl font-black text-white">Aceite no cadastro</h2>
          <p>Para criar uma conta, o usuário deve aceitar estes termos, os termos de uso e a política de privacidade. O aceite pode ser registrado junto ao perfil do usuário.</p>
        </section>

        <section className="grid gap-3">
          <h2 className="text-xl font-black text-white">Minha Caixa</h2>
          <p>A Minha Caixa permite salvar produtos de interesse. Esse recurso não garante reserva, preço, estoque ou disponibilidade futura do produto.</p>
        </section>

        <section className="grid gap-3">
          <h2 className="text-xl font-black text-white">Ofertas e redirecionamento</h2>
          <p>As ofertas podem direcionar o usuário para sites parceiros por meio de links de afiliado. Antes de comprar, confira preço, frete, prazo, vendedor, garantia e políticas do marketplace.</p>
        </section>

        <section className="grid gap-3">
          <h2 className="text-xl font-black text-white">Uso adequado</h2>
          <p>O usuário se compromete a não tentar acessar áreas restritas, interferir no funcionamento do site, usar dados falsos ou praticar ações que prejudiquem a plataforma ou terceiros.</p>
        </section>

        <section className="grid gap-3">
          <h2 className="text-xl font-black text-white">Alterações</h2>
          <p>O TechParks pode atualizar estes termos periodicamente. A continuidade do uso do site após atualizações representa ciência das novas condições.</p>
        </section>
      </main>
      <Footer />
    </>
  );
}
