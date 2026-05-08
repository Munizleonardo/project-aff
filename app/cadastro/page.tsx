import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export const metadata: Metadata = { title: "Cadastro", description: "Crie sua conta para favoritos e alertas de preço futuros.", alternates: { canonical: "/cadastro" } };

export default function RegisterPage() {
  return (
    <>
      <Header />
      <main className="mx-auto flex w-full max-w-md flex-1 flex-col gap-5 px-4 py-12">
        <h1 className="text-4xl font-black text-white">Cadastro</h1>
        <Card className="rounded-xl border-white/10 bg-white/[0.04] p-5">
          <form className="flex flex-col gap-4">
          <Input className="h-12 rounded-lg border-white/10 bg-white/10 px-3 text-white placeholder:text-slate-400" placeholder="Nome" name="name" autoComplete="name" />
          <Input className="h-12 rounded-lg border-white/10 bg-white/10 px-3 text-white placeholder:text-slate-400" placeholder="Email" type="email" name="email" autoComplete="email" />
          <Input
            className="h-12 rounded-lg border-white/10 bg-white/10 px-3 text-white placeholder:text-slate-400"
            placeholder="Senha"
            type="password"
            name="password"
            autoComplete="new-password"
            minLength={8}
            pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}"
            title="A senha deve ter pelo menos 8 caracteres, uma letra maiúscula, uma minúscula, um número e um caractere especial."
            required
          />
          <Input
            className="h-12 rounded-lg border-white/10 bg-white/10 px-3 text-white placeholder:text-slate-400"
            placeholder="Confirmar senha"
            type="password"
            name="confirmPassword"
            autoComplete="new-password"
            minLength={8}
            required
          />
          <div className="rounded-lg border border-cyan-300/20 bg-cyan-300/10 p-4">
            <strong className="text-sm font-black text-cyan-100">Regras para criar a senha</strong>
            <ul className="mt-3 flex flex-col gap-2 text-xs leading-5 text-sky-100/80">
              {[
                "Mínimo de 8 caracteres",
                "Pelo menos uma letra maiúscula",
                "Pelo menos uma letra minúscula",
                "Pelo menos um número",
                "Pelo menos um caractere especial",
                "A confirmação deve ser igual à senha criada",
              ].map((rule) => (
                <li key={rule} className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-cyan-300" />
                  {rule}
                </li>
              ))}
            </ul>
          </div>
          <Button className="h-12 bg-cyan-400 font-black text-slate-950 hover:bg-cyan-300">Cadastrar</Button>
          </form>
        </Card>
      </main>
      <Footer />
    </>
  );
}
