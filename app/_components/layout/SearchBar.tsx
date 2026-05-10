import { Search } from "lucide-react";
import { Input } from "@/app/_components/ui/input";

export function SearchBar({ compact = false }: { compact?: boolean }) {
  return (
    <form className={`site-search flex items-center gap-3 rounded-full border border-slate-700/80 bg-slate-950/80 px-4 text-white shadow-inner shadow-black/20 backdrop-blur ${compact ? "h-11 w-full" : "h-11 w-full max-w-[580px]"}`}>
      <Search className="size-4 text-slate-400" />
      <Input
        className="h-full min-w-0 flex-1 border-0 bg-transparent px-0 text-sm font-medium text-white shadow-none outline-none placeholder:text-slate-400 focus-visible:ring-0"
        placeholder={compact ? "Busque produtos ou ofertas" : "Busque produtos, comparativos ou ofertas"}
        aria-label="Busque produtos, comparativos ou ofertas"
      />
    </form>
  );
}
