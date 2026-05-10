import Link from "next/link";
import { Card } from "@/app/_components/ui/card";
import { getDepartments } from "@/data/departments";

export async function DepartmentHighlights() {
  const departments = await getDepartments();

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
      {departments.slice(0, 10).map((department) => {
        const Icon = department.icon;
        return (
          <Card
            key={department.slug}
            className="group overflow-hidden rounded-2xl border-slate-800 bg-[#07101f] p-0 text-left shadow-xl shadow-black/20 transition hover:-translate-y-1 hover:border-cyan-400/50"
          >
            <Link
              href={`/categoria/${department.slug}`}
              className="flex min-h-28 items-center gap-4 p-4 text-left"
            >
              <span
                className={`flex size-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${department.accent}`}
              >
                <Icon className="size-6 text-white" />
              </span>
              <span className="flex min-w-0 flex-col gap-1">
                <strong className="text-white">{department.name}</strong>
                <span className="text-sm leading-5 text-sky-100/70">
                  {department.description.split(".")[0]}
                </span>
              </span>
            </Link>
          </Card>
        );
      })}
    </div>
  );
}
