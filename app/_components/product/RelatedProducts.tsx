import { getRelatedProductsForDetailPage, type Product } from "@/data/products";
import { ProductGrid } from "./ProductGrid";

export async function RelatedProducts({ product }: { product: Product }) {
  const related = await getRelatedProductsForDetailPage(product);
  return (
    <section className="flex flex-col gap-5">
      <div>
        <h2 className="text-2xl font-black text-white">Produtos relacionados</h2>
        <p className="mt-2 text-slate-300">Alternativas similares da mesma categoria.</p>
      </div>
      <ProductGrid products={related} />
    </section>
  );
}
