import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export const metadata: Metadata = { title: "Entrar", description: "Acesse sua conta TechParks.", alternates: { canonical: "/login" } };

export default function LoginPage() {
  return (
    <>
      <Header />
      <main className="mx-auto flex w-full max-w-md flex-1 flex-col gap-5 px-4 py-12">
        <h1 className="text-4xl font-black text-white">Entrar</h1>
        <Card className="rounded-xl border-white/10 bg-white/[0.04] p-5">
          <form className="flex flex-col gap-4">
            <Input className="h-12 rounded-lg border-white/10 bg-white/10 px-3 text-white placeholder:text-slate-400" placeholder="Email" type="email" />
            <Input className="h-12 rounded-lg border-white/10 bg-white/10 px-3 text-white placeholder:text-slate-400" placeholder="Senha" type="password" />
            <Button className="h-12 bg-cyan-400 font-black text-slate-950 hover:bg-cyan-300">Entrar</Button>
            <Link href="/cadastro" className="text-center text-sm font-semibold text-cyan-200">Criar cadastro</Link>
          </form>
        </Card>
      </main>
      <Footer />
    </>
  );
}
