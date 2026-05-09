import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/app/_components/layout/Footer";
import { Header } from "@/app/_components/layout/Header";
import { ProductGrid } from "@/app/_components/product/ProductGrid";
import { getCategories, getCategoryBySlug } from "@/data/categories";
import { getProductsByDepartment } from "@/data/products";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) return { title: "Categoria não encontrada" };
  return {
    title: `${category.name}: melhores produtos, reviews e ofertas`,
    description: `Veja curadoria de ${category.name}, rankings, produtos custo-benefício e ofertas em marketplaces parceiros.`,
    alternates: { canonical: `/categoria/${slug}` },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) notFound();
  const categoryProducts = await getProductsByDepartment(slug);
  const Icon = category.icon;

  return (
    <>
      <Header />
      <main className="mx-auto flex max-w-[1120px] flex-1 flex-col gap-6 px-4 py-8 md:gap-10 md:py-14">
        <div className={`flex flex-col items-start gap-4 rounded-2xl bg-gradient-to-r ${category.accent} p-4 text-white shadow-2xl shadow-black/30 sm:flex-row sm:items-center sm:gap-5 md:p-8`}>
          <span className="flex size-14 shrink-0 items-center justify-center rounded-[18px] bg-white/20 md:size-16">
            <Icon className="size-7 md:size-8" />
          </span>
          <div className="flex flex-col gap-2">
            <h1 className="text-[1.9rem] font-black leading-tight text-white md:text-4xl">{category.name}</h1>
            <p className="text-base font-medium text-white/90 md:text-lg">{category.description.replace(".", "")}</p>
            <span className="text-sm text-white/85 md:text-base">{categoryProducts.length} produto{categoryProducts.length === 1 ? "" : "s"} encontrado{categoryProducts.length === 1 ? "" : "s"}</span>
          </div>
        </div>
        <ProductGrid products={categoryProducts} />
      </main>
      <Footer />
    </>
  );
}
