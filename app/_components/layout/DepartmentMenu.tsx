import Link from "next/link";
import { Card } from "@/app/_components/ui/card";
import { departments } from "@/data/departments";

export function DepartmentMenu() {
  return (
    <div className="absolute left-0 top-full z-40 hidden w-[760px] max-w-[calc(100vw-2rem)] pt-3 group-hover:block">
      <Card className="grid grid-cols-2 gap-3 rounded-xl border-white/10 bg-slate-950/95 p-4 shadow-2xl shadow-cyan-950/40 backdrop-blur md:grid-cols-3">
        {departments.map((department) => {
          const Icon = department.icon;
          return (
            <Link
              key={department.slug}
              href={`/categoria/${department.slug}`}
              className="flex gap-3 rounded-lg border border-white/5 bg-white/[0.03] p-3 transition hover:border-cyan-300/40 hover:bg-cyan-300/10"
            >
              <span className={`flex size-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${department.accent}`}>
                <Icon className="size-5 text-white" />
              </span>
              <span className="flex flex-col gap-1">
                <strong className="text-sm text-white">{department.name}</strong>
                <span className="text-xs leading-5 text-slate-300">{department.description}</span>
              </span>
            </Link>
          );
        })}
      </Card>
    </div>
  );
}
