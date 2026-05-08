import Link from "next/link";
import { Card } from "@/app/_components/ui/card";
import { departments } from "@/app/_data/departments";

export function DepartmentHighlights() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
      {departments.slice(0, 6).map((department) => {
        const Icon = department.icon;
        return (
          <Card asChild key={department.slug} className="group flex min-h-36 flex-col items-center justify-center gap-3 rounded-[20px] border-slate-800 bg-[#07101f] p-5 text-center shadow-xl shadow-black/20 transition hover:-translate-y-1 hover:border-cyan-400/50">
          <Link href={`/categoria/${department.slug}`}>
            <span className={`flex size-14 items-center justify-center rounded-full bg-gradient-to-br ${department.accent}`}>
              <Icon className="size-6 text-white" />
            </span>
            <span className="flex flex-col gap-1 text-center">
              <strong className="text-white">{department.name}</strong>
              <span className="text-sm leading-5 text-sky-100/70">{department.description.split(".")[0]}</span>
            </span>
          </Link>
          </Card>
        );
      })}
    </div>
  );
}
