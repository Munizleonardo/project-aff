import type { Metadata } from "next";
import { RegisterForm } from "@/app/_components/auth/RegisterForm";
import { Footer } from "@/app/_components/layout/Footer";
import { Header } from "@/app/_components/layout/Header";
import { Card } from "@/app/_components/ui/card";

export const metadata: Metadata = { title: "Cadastro", description: "Crie sua conta para favoritos e alertas de preco futuros.", alternates: { canonical: "/cadastro" } };

export default function RegisterPage() {
  return (
    <>
      <Header />
      <main className="mx-auto flex w-full max-w-md flex-1 flex-col gap-5 px-4 py-10 md:py-12">
        <h1 className="text-3xl font-black text-white md:text-4xl">Cadastro</h1>
        <Card className="rounded-xl border-white/10 bg-white/[0.04] p-5">
          <RegisterForm />
        </Card>
      </main>
      <Footer />
    </>
  );
}
