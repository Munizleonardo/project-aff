import Link from "next/link";
import { Eye, MoveRight } from "lucide-react";
import { Product } from "@/data/products";
import { Badge } from "@/app/_components/ui/badge";
import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@/app/_components/ui/card";
import { ProductPrice } from "./ProductPrice";
import { RatingStars } from "./RatingStars";
import { AddToCartButton } from "@/app/_components/cart/AddToCartButton";
import { SaveToBoxButton } from "@/app/_components/product/SaveToBoxButton";

export function ProductCard({ product }: { product: Product }) {
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
        <div className="mt-auto">
          <ProductPrice oldPrice={product.oldPrice} price={product.price} installment={product.installment} discountPercentage={product.discountPercentage} />
        </div>
        <div className="flex flex-col gap-2 pt-1">
          <AddToCartButton
            productId={product.id}
            label="Adicionar"
            className="h-9 w-full rounded-full border-slate-700 bg-transparent px-2 text-xs font-black text-white hover:border-cyan-400 hover:bg-white/5 hover:text-cyan-300 sm:h-10 sm:text-sm"
          />
          <SaveToBoxButton
            productId={product.id}
            compact
            className="h-9 w-full rounded-full border-slate-700 bg-transparent px-2 text-xs font-black text-white hover:border-cyan-400 hover:bg-white/5 hover:text-cyan-300 sm:h-10 sm:text-sm"
          />
          <Button asChild className="h-9 w-full rounded-full bg-[#38aefb] px-2 text-xs font-black text-slate-950 hover:bg-cyan-300 sm:h-11 sm:text-sm">
            <Link href={`/oferta/${product.id}`}>Ver oferta <MoveRight className="size-4" /></Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
