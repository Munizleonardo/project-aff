import Link from "next/link";
import { Menu, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { departments } from "@/data/departments";
import { CartButton } from "./CartButton";
import { ThemeToggle } from "./ThemeToggle";

export function MobileMenu() {
  return (
    <details className="group md:hidden">
      <summary className="flex size-10 cursor-pointer list-none items-center justify-center rounded-lg border border-white/10 bg-white/10 text-white">
        <Menu className="size-5" />
      </summary>
      <div className="fixed inset-x-4 top-20 z-50 flex max-h-[calc(100dvh-6rem)] flex-col gap-3 overflow-y-auto rounded-xl border border-white/10 bg-slate-950 p-4 shadow-2xl">
        <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-3">
          <ThemeToggle />
          <Button asChild variant="ghost" className="h-10 px-3 text-sm font-black text-white hover:bg-white hover:text-slate-950">
            <Link href="/login"><UserRound className="size-4" />Entrar</Link>
          </Button>
          <CartButton />
        </div>
        <Link href="/departamentos" className="font-bold text-white">Departamentos</Link>
        <Link href="/ofertas" className="font-bold text-white">Ofertas</Link>
        <Link href="/mais-acessados" className="font-bold text-white">Mais acessados</Link>
        <div className="grid grid-cols-2 gap-2 pt-2">
          {departments.slice(0, 8).map((department) => (
            <Link key={department.slug} href={`/categoria/${department.slug}`} className="rounded-lg bg-white/5 p-3 text-xs font-semibold text-slate-200">
              {department.name}
            </Link>
          ))}
        </div>
      </div>
    </details>
  );
}
