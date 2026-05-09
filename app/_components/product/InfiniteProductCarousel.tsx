import Link from "next/link";
import { getFeaturedProducts } from "@/data/products";
import { formatCurrency } from "@/app/_lib/format";

export async function InfiniteProductCarousel() {
  const featuredProducts = await getFeaturedProducts();
  const items = [...featuredProducts, ...featuredProducts];
  return (
    <div className="relative overflow-hidden py-4">
      <div className="flex w-max animate-[scroll-x_34s_linear_infinite] gap-4">
        {items.map((product, index) => (
          <Link
            href={`/produto/${product.slug}`}
            key={`${product.id}-${index}`}
            className="flex w-64 shrink-0 gap-3 rounded-xl border border-white/10 bg-white/10 p-3 shadow-xl shadow-slate-950/30 backdrop-blur transition hover:border-cyan-300/40"
          >
            <img src={product.image} alt={product.name} className="size-20 rounded-lg object-cover" />
            <span className="flex min-w-0 flex-col gap-1">
              <span className="truncate text-sm font-bold text-white">{product.name}</span>
              <span className="text-xs text-slate-300 line-through">{formatCurrency(product.oldPrice)}</span>
              <strong className="text-lg text-cyan-200">{formatCurrency(product.price)}</strong>
              <span className="w-fit rounded-md bg-emerald-400/15 px-2 py-0.5 text-xs font-bold text-emerald-300">-{product.discountPercentage}%</span>
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
