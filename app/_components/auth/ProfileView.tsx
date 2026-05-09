"use client";

import Link from "next/link";
import { useAuth } from "@/app/_components/auth/AuthProvider";
import { Button } from "@/app/_components/ui/button";
import { Card } from "@/app/_components/ui/card";

export function ProfileView() {
  const { session, profile, isLoading } = useAuth();

  if (isLoading) {
    return <Card className="rounded-xl border-white/10 bg-white/[0.04] p-5 text-slate-300">Carregando perfil...</Card>;
  }

  if (!session) {
    return (
      <Card className="rounded-xl border-white/10 bg-white/[0.04] p-5">
        <p className="text-slate-300">Entre na sua conta para ver seu perfil.</p>
        <Button asChild className="mt-4 h-11 bg-cyan-400 font-black text-slate-950 hover:bg-cyan-300">
          <Link href="/login">Entrar</Link>
        </Button>
      </Card>
    );
  }

  return (
    <Card className="rounded-xl border-white/10 bg-white/[0.04] p-5">
      <dl className="grid gap-4 text-sm">
        <div>
          <dt className="font-black uppercase tracking-wide text-sky-100/50">Nome</dt>
          <dd className="mt-1 text-lg font-bold text-white">{profile?.full_name || "Nao informado"}</dd>
        </div>
        <div>
          <dt className="font-black uppercase tracking-wide text-sky-100/50">Email</dt>
          <dd className="mt-1 text-lg font-bold text-white">{profile?.email || session.user.email}</dd>
        </div>
        <div>
          <dt className="font-black uppercase tracking-wide text-sky-100/50">Telefone</dt>
          <dd className="mt-1 text-lg font-bold text-white">{profile?.phone || "Nao informado"}</dd>
        </div>
        <div>
          <dt className="font-black uppercase tracking-wide text-sky-100/50">Cadastro</dt>
          <dd className="mt-1 text-lg font-bold text-white">{profile?.created_at ? new Date(profile.created_at).toLocaleDateString("pt-BR") : "Nao informado"}</dd>
        </div>
      </dl>
    </Card>
  );
}
