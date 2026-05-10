import Link from "next/link";
import { BarChart3, Eye, MoveRight, Store } from "lucide-react";
import { getBestProductOffer, getProductOffers, Product } from "@/data/products";
import { Badge } from "@/app/_components/ui/badge";
import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@/app/_components/ui/card";
import { ProductPrice } from "./ProductPrice";
import { RatingStars } from "./RatingStars";
import { SaveToBoxButton } from "@/app/_components/product/SaveToBoxButton";
import { formatCurrency } from "@/app/_lib/format";

export function ProductCard({ product }: { product: Product }) {
  const offers = getProductOffers(product);
  const bestOffer = getBestProductOffer(product);

  return (
    <Card className="product-card-interactive group flex h-full flex-col overflow-hidden rounded-xl border-slate-800 bg-[#07101f] shadow-lg shadow-black/20 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/50 hover:shadow-cyan-950/40 sm:rounded-[20px] sm:shadow-2xl">
      <Link href={`/produto/${product.slug}`} className="relative block aspect-square overflow-hidden bg-slate-900 sm:aspect-[1.16/1]">
        <img src={product.image} alt={product.name} className="size-full object-cover transition duration-500 group-hover:scale-105" />
        <Badge className="absolute left-2 top-2 rounded-full border-0 bg-red-500 px-2 py-0.5 text-[10px] font-black text-white sm:left-4 sm:top-4 sm:px-3 sm:py-1 sm:text-xs">-{product.discountPercentage}%</Badge>
        <Badge className="absolute right-2 top-2 hidden max-w-[56%] truncate rounded-full border-0 bg-slate-950/75 px-2 py-0.5 text-[10px] font-black text-white backdrop-blur min-[430px]:block sm:right-4 sm:top-4 sm:px-3 sm:py-1 sm:text-xs">{product.category}</Badge>
      </Link>
      <CardContent className="flex flex-1 flex-col gap-2 p-2.5 sm:gap-4 sm:p-4">
        <div className="flex items-center justify-between gap-2">
          <RatingStars rating={product.rating} />
          <span className="hidden items-center gap-1 text-xs font-semibold text-slate-300 min-[430px]:flex"><Eye className="size-4 text-slate-400" />{product.clicks.toLocaleString("pt-BR")}</span>
        </div>
        <Link href={`/produto/${product.slug}`} className="line-clamp-2 text-sm font-black leading-tight text-white hover:text-cyan-300 sm:text-base">{product.name}</Link>
        <p className="line-clamp-2 hidden text-sm leading-6 text-sky-100/75 min-[430px]:block sm:min-h-12">{product.shortDescription}</p>
        <div className="mt-auto flex flex-col gap-2 rounded-xl border border-slate-800 bg-slate-950/35 p-3">
          <span className="flex items-center justify-between gap-2 text-xs text-sky-100/60">
            <span>Menor preço encontrado</span>
            <span className="flex items-center gap-1 text-cyan-200"><Store className="size-3.5" /> {offers.length} lojas</span>
          </span>
          <ProductPrice oldPrice={bestOffer.oldPrice} price={bestOffer.price} installment={bestOffer.installment} discountPercentage={product.discountPercentage} />
          <span className="flex items-center gap-1 text-xs font-bold text-emerald-300">
            <BarChart3 className="size-3.5" /> {product.recommendationBadge ?? "Melhor custo-benefício"}
          </span>
        </div>
        <div className="flex flex-col gap-2 pt-1">
          <SaveToBoxButton
            productId={product.id}
            compact
            className="h-9 w-full rounded-full border-slate-700 bg-transparent px-2 text-xs font-black text-white hover:border-cyan-400 hover:bg-white/5 hover:text-cyan-300 sm:h-10 sm:text-sm"
          />
          <Button asChild className="h-9 w-full rounded-full bg-[#38aefb] px-2 text-xs font-black text-slate-950 hover:bg-cyan-300 sm:h-11 sm:text-sm">
            <Link href={`/produto/${product.slug}`}>Comparar preços <MoveRight className="size-4" /></Link>
          </Button>
          <span className="text-center text-[11px] font-semibold text-sky-100/45">A partir de {formatCurrency(bestOffer.price)}</span>
        </div>
      </CardContent>
    </Card>
  );
}
