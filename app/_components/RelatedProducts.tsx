import { Product, products } from "@/app/_data/products";
import { ProductGrid } from "./ProductGrid";

export function RelatedProducts({ product }: { product: Product }) {
  const related = products.filter((item) => item.id !== product.id && item.department === product.department).slice(0, 4);
  return (
    <section className="flex flex-col gap-5">
      <div>
        <h2 className="text-2xl font-black text-white">Produtos relacionados</h2>
        <p className="mt-2 text-slate-300">Alternativas similares da mesma categoria.</p>
      </div>
      <ProductGrid products={related.length ? related : products.filter((item) => item.id !== product.id).slice(0, 4)} />
    </section>
  );
}
