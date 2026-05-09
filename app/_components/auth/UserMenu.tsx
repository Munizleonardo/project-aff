"use client";

import Link from "next/link";
import { Box, LogOut, UserRound } from "lucide-react";
import { Button } from "@/app/_components/ui/button";
import { useAuth } from "./AuthProvider";

type UserMenuProps = {
  /** Barra flutuante lateral: só ícone, alinhado aos demais controles. */
  railMode?: boolean;
};

export function UserMenu({ railMode = false }: UserMenuProps) {
  const { profile, session, isLoading, logout } = useAuth();

  if (isLoading) {
    return (
      <span
        className={railMode ? "size-11 shrink-0 rounded-full bg-white/5" : "h-10 w-20 rounded-lg bg-white/5"}
        aria-hidden="true"
      />
    );
  }

  if (!session) {
    if (railMode) {
      return (
        <Button
          asChild
          variant="ghost"
          size="icon-lg"
          className="shrink-0 text-white hover:bg-white hover:text-slate-950"
        >
          <Link href="/login" aria-label="Entrar na sua conta" title="Entrar">
            <UserRound className="size-5 stroke-[2.25px]" />
          </Link>
        </Button>
      );
    }
    return (
      <Button asChild variant="ghost" className="h-10 px-2 text-sm font-semibold text-white hover:bg-white hover:text-slate-950">
        <Link href="/login" className="inline-flex items-center gap-2">
          <UserRound className="size-4 shrink-0 stroke-[2px]" />
          <span>Entrar</span>
        </Link>
      </Button>
    );
  }

  const displayName = profile?.full_name || session.user.email || "Minha conta";

  if (railMode) {
    return (
      <details className="group relative">
        <summary className="flex size-11 shrink-0 cursor-pointer list-none items-center justify-center rounded-full text-white hover:bg-white hover:text-slate-950">
          <UserRound className="size-5 stroke-[2.25px]" aria-hidden="true" />
          <span className="sr-only">Menu da conta: {displayName}</span>
        </summary>
        <div className="absolute right-full top-1/2 z-[90] mr-3 min-w-48 -translate-y-1/2 rounded-xl border border-white/10 bg-slate-950 p-2 shadow-2xl shadow-black/40">
          <div className="border-b border-white/10 px-2 py-2 text-xs font-semibold text-sky-100/80">{displayName}</div>
          <Link href="/perfil" className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-bold text-white hover:bg-white hover:text-slate-950">
            <UserRound className="size-4" /> Perfil
          </Link>
          <Link href="/minha-caixa" className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-bold text-white hover:bg-white hover:text-slate-950">
            <Box className="size-4" /> Minha Caixa
          </Link>
          <button type="button" onClick={() => logout()} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-bold text-white hover:bg-white hover:text-slate-950">
            <LogOut className="size-4" /> Sair
          </button>
        </div>
      </details>
    );
  }

  return (
    <details className="group relative">
      <summary className="flex h-10 cursor-pointer list-none items-center gap-2 rounded-lg px-2 text-sm font-semibold text-white hover:bg-white hover:text-slate-950">
        <UserRound className="size-4 shrink-0 stroke-[2px]" />
        <span className="max-w-32 truncate">{displayName}</span>
      </summary>
      <div className="absolute right-0 top-full z-[90] mt-3 grid min-w-48 gap-1 rounded-xl border border-white/10 bg-slate-950 p-2 shadow-2xl shadow-black/40">
        <Link href="/perfil" className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-bold text-white hover:bg-white hover:text-slate-950">
          <UserRound className="size-4" /> Perfil
        </Link>
        <Link href="/minha-caixa" className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-bold text-white hover:bg-white hover:text-slate-950">
          <Box className="size-4" /> Minha Caixa
        </Link>
        <button type="button" onClick={() => logout()} className="flex items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-bold text-white hover:bg-white hover:text-slate-950">
          <LogOut className="size-4" /> Sair
        </button>
      </div>
    </details>
  );
}

export function UserMenuLinks({ onNavigate }: { onNavigate?: () => void }) {
  const { profile, session, isLoading, logout } = useAuth();

  if (isLoading) return null;

  if (!session) {
    return (
      <Link href="/login" onClick={onNavigate} className="rounded-xl bg-white/[0.06] px-4 py-3 font-bold text-white">
        Entrar
      </Link>
    );
  }

  const displayName = profile?.full_name || session.user.email || "Minha conta";

  return (
    <>
      <span className="rounded-xl bg-cyan-400/10 px-4 py-3 text-sm font-black text-cyan-100">{displayName}</span>
      <Link href="/perfil" onClick={onNavigate} className="rounded-xl bg-white/[0.06] px-4 py-3 font-bold text-white">
        Perfil
      </Link>
      <Link href="/minha-caixa" onClick={onNavigate} className="rounded-xl bg-white/[0.06] px-4 py-3 font-bold text-white">
        Minha Caixa
      </Link>
      <button type="button" onClick={() => logout()} className="rounded-xl bg-white/[0.06] px-4 py-3 text-left font-bold text-white">
        Sair
      </button>
    </>
  );
}
