import type { Metadata } from "next";
import { LoginForm } from "@/app/_components/auth/LoginForm";
import { Footer } from "@/app/_components/layout/Footer";
import { Header } from "@/app/_components/layout/Header";
import { Card } from "@/app/_components/ui/card";

export const metadata: Metadata = { title: "Entrar", description: "Acesse sua conta TechParks.", alternates: { canonical: "/login" } };

export default function LoginPage() {
  return (
    <>
      <Header />
      <main className="mx-auto flex w-full max-w-md flex-1 flex-col gap-5 px-4 py-10 md:py-12">
        <h1 className="text-3xl font-black text-white md:text-4xl">Entrar</h1>
        <Card className="rounded-xl border-white/10 bg-white/[0.04] p-5">
          <LoginForm />
        </Card>
      </main>
      <Footer />
    </>
  );
}
