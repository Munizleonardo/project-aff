"use client";

import { Search } from "lucide-react";
import { Button } from "@/app/_components/ui/button";
import { SearchBar } from "@/app/_components/layout/SearchBar";

/** Botão lateral + campo de busca compacto quando a navegação flutuante está ativa (desktop). */
export function FloatingSearchPanel({ open, onToggle }: { open: boolean; onToggle: () => void }) {
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
