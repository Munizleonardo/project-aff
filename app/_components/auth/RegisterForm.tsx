"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { useAuth } from "./AuthProvider";

export function RegisterForm() {
  const router = useRouter();
  const { signUp } = useAuth();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const formData = new FormData(event.currentTarget);
    const fullName = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const phone = String(formData.get("phone") ?? "").trim();
    const password = String(formData.get("password") ?? "");
    const confirmPassword = String(formData.get("confirmPassword") ?? "");
    const acceptedTerms = formData.get("acceptedTerms") === "on";

    if (password !== confirmPassword) {
      setError("A confirmação precisa ser igual à senha criada.");
      return;
    }

    if (!acceptedTerms) {
      setError("Para criar o cadastro, aceite os termos e condições.");
      return;
    }

    setIsSubmitting(true);
    try {
      await signUp({ fullName, email, phone, password, acceptedTerms });
      router.push("/");
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "Não foi possível criar o cadastro.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <Input className="h-12 rounded-lg border-white/10 bg-white/10 px-3 text-white placeholder:text-slate-400" placeholder="Nome" name="name" autoComplete="name" required />
      <Input className="h-12 rounded-lg border-white/10 bg-white/10 px-3 text-white placeholder:text-slate-400" placeholder="Email" type="email" name="email" autoComplete="email" required />
      <Input className="h-12 rounded-lg border-white/10 bg-white/10 px-3 text-white placeholder:text-slate-400" placeholder="Telefone (opcional)" name="phone" autoComplete="tel" />
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
      <label className="flex items-start gap-3 rounded-lg border border-white/10 bg-white/[0.06] p-3 text-sm leading-6 text-slate-200">
        <input
          type="checkbox"
          name="acceptedTerms"
          required
          className="mt-1 size-4 shrink-0 accent-cyan-400"
        />
        <span>
          Li e aceito os{" "}
          <Link href="/termos-e-condicoes" className="font-black text-cyan-300 hover:text-cyan-200">
            termos e condições
          </Link>
           de cadastro.
        </span>
      </label>
      <div className="rounded-lg border border-cyan-300/20 bg-cyan-300/10 p-4">
        <strong className="text-sm font-black text-cyan-100">Regras para criar a senha</strong>
        <ul className="mt-3 flex flex-col gap-2 text-xs leading-5 text-sky-100/80">
          {[
            "Mínimo de 8 caracteres",
            "Pelo menos uma letra maiúscula",
            "Pelo menos uma letra minúscula",
            "Pelo menos um número",
            "Pelo menos um caractere especial",
          ].map((rule) => (
            <li key={rule} className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-cyan-300" />
              {rule}
            </li>
          ))}
        </ul>
      </div>
      {error ? <p className="rounded-lg border border-red-400/20 bg-red-500/10 p-3 text-sm text-red-100">{error}</p> : null}
      <Button className="h-12 bg-cyan-400 font-black text-slate-950 hover:bg-cyan-300" disabled={isSubmitting}>
        {isSubmitting ? "Cadastrando..." : "Cadastrar"}
      </Button>
    </form>
  );
}
