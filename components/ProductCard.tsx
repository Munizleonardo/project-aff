import Link from "next/link";
import { Eye, MoveRight } from "lucide-react";
import { Product } from "@/data/products";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ProductPrice } from "./ProductPrice";
import { RatingStars } from "./RatingStars";
import { AddToCartButton } from "./AddToCartButton";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Card className="product-card-interactive group flex h-full flex-col overflow-hidden rounded-[20px] border-slate-800 bg-[#07101f] shadow-2xl shadow-black/30 transition duration-300 hover:-translate-y-2 hover:border-cyan-400/50 hover:shadow-cyan-950/40">
      <Link href={`/produto/${product.slug}`} className="relative block aspect-[1.16/1] overflow-hidden bg-slate-900">
        <img src={product.image} alt={product.name} className="size-full object-cover transition duration-500 group-hover:scale-105" />
        <Badge className="absolute left-4 top-4 rounded-full border-0 bg-red-500 px-3 py-1 text-xs font-black text-white">-{product.discountPercentage}%</Badge>
        <Badge className="absolute right-4 top-4 rounded-full border-0 bg-slate-950/75 px-3 py-1 text-xs font-black text-white backdrop-blur">{product.category}</Badge>
      </Link>
      <CardContent className="flex flex-1 flex-col gap-4 p-4">
        <div className="flex items-center justify-between gap-3">
          <RatingStars rating={product.rating} />
          <span className="flex items-center gap-1 text-xs font-semibold text-slate-300"><Eye className="size-4 text-slate-400" />{product.clicks.toLocaleString("pt-BR")}</span>
        </div>
        <Link href={`/produto/${product.slug}`} className="text-base font-black leading-tight text-white hover:text-cyan-300">{product.name}</Link>
        <p className="line-clamp-2 min-h-12 text-sm leading-6 text-sky-100/75">{product.shortDescription}</p>
        <div className="mt-auto">
          <ProductPrice oldPrice={product.oldPrice} price={product.price} installment={product.installment} discountPercentage={product.discountPercentage} />
        </div>
        <div className="flex flex-col gap-2 pt-1">
          <AddToCartButton
            productId={product.id}
            label="Adicionar ao carrinho"
            className="h-10 w-full rounded-full border-slate-700 bg-transparent text-sm font-black text-white hover:border-cyan-400 hover:bg-white/5 hover:text-cyan-300"
          />
          <Button asChild className="h-11 w-full rounded-full bg-[#38aefb] text-sm font-black text-slate-950 hover:bg-cyan-300">
            <Link href={`/oferta/${product.id}`}>Ver oferta <MoveRight className="size-4" /></Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
