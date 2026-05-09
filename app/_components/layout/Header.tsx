"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { UserMenu } from "@/app/_components/auth/UserMenu";
import { Button } from "@/app/_components/ui/button";
import { CartButton } from "@/app/_components/cart/CartButton";
import { DepartmentMenu } from "@/app/_components/layout/DepartmentMenu";
import { FloatingDepartmentsPanel } from "@/app/_components/layout/header/floating-departments-panel";
import { FloatingSearchPanel } from "@/app/_components/layout/header/floating-search-panel";
import { Logo } from "@/app/_components/layout/Logo";
import { MobileMenu } from "@/app/_components/layout/MobileMenu";
import { SearchBar } from "@/app/_components/layout/SearchBar";
import { ThemeToggle } from "@/app/_components/layout/ThemeToggle";
import { withCategoryIcon } from "@/data/category-icons";
import type { Category, CategoryRecord } from "@/data/categories";

/** Distância mínima de scroll (px) para trocar o header fixo pela barra flutuante lateral. */
const FLOATING_NAV_SCROLL_THRESHOLD_PX = 180;

export function Header() {
  const [departments, setDepartments] = useState<Category[]>([]);
  const [showFloatingAlternateNav, setShowFloatingAlternateNav] = useState(false);
  const [isFloatingDepartmentsOpen, setIsFloatingDepartmentsOpen] = useState(false);
  const [isFloatingSearchOpen, setIsFloatingSearchOpen] = useState(false);

  useEffect(() => {
    let shouldIgnoreResult = false;

    fetch("/api/categories")
      .then((response) => response.ok ? response.json() as Promise<CategoryRecord[]> : [])
      .then((items) => {
        if (!shouldIgnoreResult) setDepartments(items.map(withCategoryIcon));
      })
      .catch(() => {
        if (!shouldIgnoreResult) setDepartments([]);
      });

    return () => {
      shouldIgnoreResult = true;
    };
  }, []);

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
            <DepartmentMenu departments={departments} />
          </div>
          <div className="hidden flex-1 justify-center md:flex">
            <SearchBar />
          </div>
          <nav className="ml-auto hidden items-center gap-4 md:flex">
            <ThemeToggle />
            <UserMenu />
            <CartButton />
          </nav>
          <div className="ml-auto md:hidden">
            <MobileMenu departments={departments} />
          </div>
        </div>
        <div className="border-t border-white/10 px-4 pb-3 pt-3 md:hidden">
          <SearchBar compact />
        </div>
      </header>

      <nav
        className={`floating-nav-rail fixed right-[max(0.75rem,env(safe-area-inset-right))] top-1/2 z-[80] hidden min-w-[3.25rem] -translate-y-1/2 flex-col items-center gap-3.5 rounded-full border border-slate-700/70 bg-[#020612]/95 py-3.5 pl-2.5 pr-3 shadow-2xl shadow-black/40 backdrop-blur-xl transition-all duration-500 ease-out md:flex ${
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
          departments={departments}
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
        <UserMenu railMode />
        <CartButton />
      </nav>
    </>
  );
}
