"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronDown, UserRound } from "lucide-react";
import { Button } from "@/app/_components/ui/button";
import { CartButton } from "@/app/_components/cart/CartButton";
import { DepartmentMenu } from "@/app/_components/layout/DepartmentMenu";
import { FloatingDepartmentsPanel } from "@/app/_components/layout/header/floating-departments-panel";
import { FloatingSearchPanel } from "@/app/_components/layout/header/floating-search-panel";
import { Logo } from "@/app/_components/layout/Logo";
import { MobileMenu } from "@/app/_components/layout/MobileMenu";
import { SearchBar } from "@/app/_components/layout/SearchBar";
import { ThemeToggle } from "@/app/_components/layout/ThemeToggle";

/** Distância mínima de scroll (px) para trocar o header fixo pela barra flutuante lateral. */
const FLOATING_NAV_SCROLL_THRESHOLD_PX = 180;

export function Header() {
  const [showFloatingAlternateNav, setShowFloatingAlternateNav] = useState(false);
  const [isFloatingDepartmentsOpen, setIsFloatingDepartmentsOpen] = useState(false);
  const [isFloatingSearchOpen, setIsFloatingSearchOpen] = useState(false);

  useEffect(() => {
    function syncFloatingNavigationWithScrollPosition() {
      const shouldPreferFloatingRail = window.scrollY > FLOATING_NAV_SCROLL_THRESHOLD_PX;
      setShowFloatingAlternateNav(shouldPreferFloatingRail);
      if (!shouldPreferFloatingRail) {
        setIsFloatingDepartmentsOpen(false);
        setIsFloatingSearchOpen(false);
      }
    }

    syncFloatingNavigationWithScrollPosition();
    window.addEventListener("scroll", syncFloatingNavigationWithScrollPosition, { passive: true });
    return () => window.removeEventListener("scroll", syncFloatingNavigationWithScrollPosition);
  }, []);

  return (
    <>
      <header
        className={`site-header sticky top-0 z-50 w-full border-b border-white/5 bg-[#020612]/88 backdrop-blur-xl transition-all duration-500 ease-out ${
          showFloatingAlternateNav ? "md:pointer-events-none md:-translate-y-full md:opacity-0" : "translate-y-0 opacity-100"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:gap-4 md:gap-6 md:py-4">
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
        <div className="border-t border-white/10 px-4 pb-3 pt-3 md:hidden">
          <SearchBar compact />
        </div>
      </header>

      <nav
        className={`fixed right-5 top-1/2 z-[80] hidden -translate-y-1/2 flex-col items-center gap-2 rounded-full border border-slate-700/70 bg-[#020612]/90 p-2 shadow-2xl shadow-black/40 backdrop-blur-xl transition-all duration-500 ease-out md:flex ${
          showFloatingAlternateNav ? "translate-x-0 opacity-100" : "pointer-events-none translate-x-10 opacity-0"
        }`}
        aria-label="Navegação flutuante"
      >
        <Link
          href="/"
          className="transition hover:scale-105 active:scale-95"
          aria-label="Ir para início"
        >
          <Logo symbolOnly withLink={false} className="text-white" />
        </Link>
        <FloatingDepartmentsPanel
          open={isFloatingDepartmentsOpen}
          onToggle={() => {
            setIsFloatingDepartmentsOpen((value) => !value);
            setIsFloatingSearchOpen(false);
          }}
        />
        <FloatingSearchPanel
          open={isFloatingSearchOpen}
          onToggle={() => {
            setIsFloatingSearchOpen((value) => !value);
            setIsFloatingDepartmentsOpen(false);
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
