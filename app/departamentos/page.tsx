import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Card } from "@/components/ui/card";
import { departments } from "@/data/departments";

export const metadata: Metadata = {
  title: "Departamentos tech",
  description: "Explore departamentos de tecnologia, setup gamer, home office, perifericos, gadgets e casa inteligente.",
  alternates: { canonical: "/departamentos" },
};

export default function DepartmentsPage() {
  return (
    <>
      <Header />
      <main className="mx-auto flex min-h-[720px] max-w-[1120px] flex-1 flex-col gap-8 px-4 py-10 md:gap-10 md:py-16">
        <div className="flex flex-col gap-3">
          <h1 className="text-4xl font-black tracking-tight text-white md:text-5xl">Todos os <span className="text-cyan-400">departamentos</span></h1>
          <p className="text-base text-sky-100/75 md:text-lg">Navegue por todas as categorias de produtos tech com curadoria.</p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {departments.map((department) => {
            const Icon = department.icon;
            return (
              <Card
                asChild
                key={department.slug}
                className="product-card-interactive group flex min-h-36 flex-col items-start justify-center gap-4 rounded-[20px] border border-slate-800 bg-[#07101f] p-5 shadow-xl shadow-black/20 transition duration-300 hover:-translate-y-2 hover:border-cyan-400/50 md:min-h-40 md:gap-5 md:p-7"
              >
              <Link href={`/categoria/${department.slug}`}>
                <span className={`flex size-14 items-center justify-center rounded-[18px] bg-gradient-to-br ${department.accent}`}>
                  <Icon className="size-7 text-white" />
                </span>
                <span className="flex flex-col gap-3">
                  <strong className="text-lg font-black text-white">{department.name}</strong>
                  <span className="text-base text-sky-100/70">{department.description.replace(".", "")}</span>
                </span>
              </Link>
              </Card>
            );
          })}
        </div>
      </main>
      <Footer />
    </>
  );
}
