"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronRight, Search, UserRound, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { departments } from "@/data/departments";
import { CartButton } from "./CartButton";
import { DepartmentMenu } from "./DepartmentMenu";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";
import { SearchBar } from "./SearchBar";
import { ThemeToggle } from "./ThemeToggle";

function FloatingDepartments({ open, onToggle }: { open: boolean; onToggle: () => void }) {
  return (
    <div className="relative">
      <Button
        type="button"
        variant="ghost"
        size="icon-lg"
        className="text-white hover:bg-white hover:text-slate-950"
        aria-label="Abrir departamentos"
        onClick={onToggle}
      >
        <ChevronRight className={`size-5 transition-transform ${open ? "rotate-180" : ""}`} />
      </Button>
      {open ? (
        <div className="absolute right-full top-0 mr-3 w-[340px] rounded-2xl border border-slate-700/70 bg-[#07101f]/95 p-3 shadow-2xl shadow-black/40 backdrop-blur-xl">
          <div className="grid max-h-[430px] gap-2 overflow-y-auto">
            {departments.map((department) => {
              const Icon = department.icon;
              return (
                <Link
                  key={department.slug}
                  href={`/categoria/${department.slug}`}
                  className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.03] p-3 transition hover:border-cyan-300/40 hover:bg-white hover:text-slate-950"
                >
                  <span className={`flex size-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${department.accent}`}>
                    <Icon className="size-5 text-white" />
                  </span>
                  <span className="flex flex-col">
                    <strong className="text-sm">{department.name}</strong>
                    <span className="text-xs opacity-75">{department.description}</span>
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function FloatingSearch({ open, onToggle }: { open: boolean; onToggle: () => void }) {
  return (
    <div className="relative">
      <Button
        type="button"
        variant="ghost"
        size="icon-lg"
        className="text-white hover:bg-white hover:text-slate-950"
        aria-label="Buscar produtos"
        onClick={onToggle}
      >
        <Search className="size-5" />
      </Button>
      {open ? (
        <div className="absolute right-full top-0 mr-3 w-[360px] rounded-2xl border border-slate-700/70 bg-[#07101f]/95 p-3 shadow-2xl shadow-black/40 backdrop-blur-xl">
          <SearchBar compact />
        </div>
      ) : null}
    </div>
  );
}

export function Header() {
  const [isFloating, setIsFloating] = useState(false);
  const [showDepartments, setShowDepartments] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    function handleScroll() {
      const shouldFloat = window.scrollY > 180;
      setIsFloating(shouldFloat);
      if (!shouldFloat) {
        setShowDepartments(false);
        setShowSearch(false);
      }
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`site-header sticky top-0 z-50 w-full border-b border-white/5 bg-[#020612]/88 backdrop-blur-xl transition-all duration-500 ease-out ${
          isFloating ? "pointer-events-none -translate-y-full opacity-0" : "translate-y-0 opacity-100"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center gap-6 px-4 py-4">
          <Logo />
          <div className="relative hidden md:block group">
            <Button variant="ghost" className="h-10 px-2 text-sm font-black text-white hover:bg-white hover:text-slate-950">
              Departamentos <ChevronDown className="size-4" />
            </Button>
            <DepartmentMenu />
          </div>
          <div className="hidden flex-1 justify-center md:flex">
            <SearchBar />
          </div>
          <nav className="ml-auto hidden items-center gap-4 md:flex">
            <ThemeToggle />
            <Button asChild variant="ghost" className="h-10 px-2 text-sm font-black text-white hover:bg-white hover:text-slate-950">
              <Link href="/login"><UserRound className="size-4" />Entrar</Link>
            </Button>
            <CartButton />
          </nav>
          <div className="ml-auto md:hidden">
            <MobileMenu />
          </div>
        </div>
        <div className="border-t border-white/10 px-4 pb-3 md:hidden">
          <SearchBar compact />
        </div>
      </header>

      <nav
        className={`fixed right-5 top-1/2 z-[80] hidden -translate-y-1/2 flex-col items-center gap-2 rounded-full border border-slate-700/70 bg-[#020612]/90 p-2 shadow-2xl shadow-black/40 backdrop-blur-xl transition-all duration-500 ease-out md:flex ${
          isFloating ? "translate-x-0 opacity-100" : "pointer-events-none translate-x-10 opacity-0"
        }`}
        aria-label="Navegação flutuante"
      >
        <Link
          href="/"
          className="flex size-10 items-center justify-center rounded-full bg-gradient-to-br from-violet-700 via-blue-600 to-cyan-400 text-white shadow-lg shadow-violet-900/40 transition hover:scale-105 active:scale-95"
          aria-label="Ir para início"
        >
          <Zap className="size-5 fill-white" />
        </Link>
        <FloatingDepartments
          open={showDepartments}
          onToggle={() => {
            setShowDepartments((value) => !value);
            setShowSearch(false);
          }}
        />
        <FloatingSearch
          open={showSearch}
          onToggle={() => {
            setShowSearch((value) => !value);
            setShowDepartments(false);
          }}
        />
        <ThemeToggle />
        <Button asChild variant="ghost" size="icon-lg" className="text-white hover:bg-white hover:text-slate-950">
          <Link href="/login" aria-label="Entrar">
            <UserRound className="size-5" />
          </Link>
        </Button>
        <CartButton />
      </nav>
    </>
  );
}
