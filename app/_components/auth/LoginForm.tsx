"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { useAuth } from "./AuthProvider";

export function LoginForm() {
  const router = useRouter();
  const { signIn } = useAuth();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");

    try {
      await signIn(email, password);
      router.push("/");
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "Não foi possível entrar.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <Input className="h-12 rounded-lg border-white/10 bg-white/10 px-3 text-white placeholder:text-slate-400" placeholder="Email" type="email" name="email" autoComplete="email" required />
      <Input className="h-12 rounded-lg border-white/10 bg-white/10 px-3 text-white placeholder:text-slate-400" placeholder="Senha" type="password" name="password" autoComplete="current-password" required />
      {error ? <p className="rounded-lg border border-red-400/20 bg-red-500/10 p-3 text-sm text-red-100">{error}</p> : null}
      <Button className="h-12 bg-cyan-400 font-black text-slate-950 hover:bg-cyan-300" disabled={isSubmitting}>
        {isSubmitting ? "Entrando..." : "Entrar"}
      </Button>
      <Link href="/cadastro" className="text-center text-sm font-semibold text-cyan-200">Criar cadastro</Link>
    </form>
  );
}
