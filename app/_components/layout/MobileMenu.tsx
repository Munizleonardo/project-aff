import Link from "next/link";
import { Menu, UserRound } from "lucide-react";
import { Button } from "@/app/_components/ui/button";
import { departments } from "@/data/departments";
import { CartButton } from "@/app/_components/cart/CartButton";
import { ThemeToggle } from "./ThemeToggle";

export function MobileMenu() {
  return (
    <details className="group md:hidden">
      <summary className="flex size-11 cursor-pointer list-none items-center justify-center rounded-xl border border-white/10 bg-white/10 text-white transition active:scale-95">
        <Menu className="size-5" />
      </summary>
      <div className="fixed inset-x-3 top-28 z-50 flex max-h-[calc(100dvh-8rem)] flex-col gap-4 overflow-y-auto rounded-2xl border border-white/10 bg-slate-950 p-4 shadow-2xl shadow-black/50">
        <div className="grid grid-cols-[auto_1fr_auto] items-center gap-2 border-b border-white/10 pb-4">
          <ThemeToggle />
          <Button asChild variant="ghost" className="h-11 min-w-0 px-3 text-sm font-black text-white hover:bg-white hover:text-slate-950">
            <Link href="/login"><UserRound className="size-4" />Entrar</Link>
          </Button>
          <CartButton />
        </div>
        <nav className="grid gap-2">
          <Link href="/departamentos" className="rounded-xl bg-white/[0.06] px-4 py-3 font-bold text-white">Departamentos</Link>
          <Link href="/ofertas" className="rounded-xl bg-white/[0.06] px-4 py-3 font-bold text-white">Ofertas</Link>
          <Link href="/mais-acessados" className="rounded-xl bg-white/[0.06] px-4 py-3 font-bold text-white">Mais acessados</Link>
        </nav>
        <div className="grid grid-cols-1 gap-2 pt-1 min-[420px]:grid-cols-2">
          {departments.slice(0, 8).map((department) => (
            <Link key={department.slug} href={`/categoria/${department.slug}`} className="rounded-xl bg-white/5 p-3 text-sm font-semibold leading-tight text-slate-200">
              {department.name}
            </Link>
          ))}
        </div>
      </div>
    </details>
  );
}
