"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Button } from "@/app/_components/ui/button";
import { departments } from "@/data/departments";

/** Botão lateral + lista de departamentos quando a navegação flutuante está ativa (desktop). */
export function FloatingDepartmentsPanel({ open, onToggle }: { open: boolean; onToggle: () => void }) {
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
