import Link from "next/link";
import { CheckCircle2, Heart, ShieldCheck } from "lucide-react";
import { Product } from "@/data/products";
import { Button } from "@/app/_components/ui/button";
import { AffiliateDisclosure } from "@/app/_components/marketing/AffiliateDisclosure";
import { ProductPrice } from "./ProductPrice";
import { RatingStars } from "./RatingStars";

export function ProductDetails({ product }: { product: Product }) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap gap-2">
        <span className="rounded-md bg-cyan-300/15 px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-cyan-200">{product.category}</span>
        <span className="rounded-md bg-emerald-300/15 px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-emerald-200">Economize {product.discountPercentage}%</span>
      </div>
      <h1 className="text-3xl font-black leading-tight text-white md:text-5xl">{product.name}</h1>
      <RatingStars rating={product.rating} reviewsCount={product.reviewsCount} />
      <ProductPrice oldPrice={product.oldPrice} price={product.price} installment={product.installment} discountPercentage={product.discountPercentage} large />
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button asChild className="h-12 bg-cyan-400 px-5 text-base font-black text-slate-950 hover:bg-cyan-300">
          <Link href={`/oferta/${product.id}`}>Ver oferta</Link>
        </Button>
        <Button variant="outline" className="h-12 border-white/15 bg-white/10 px-5 text-base font-bold text-white hover:bg-white/15">
          <Heart className="size-5" /> Adicionar aos favoritos
        </Button>
      </div>
      <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] p-3 text-sm font-semibold text-slate-200">
        <ShieldCheck className="size-5 text-emerald-300" /> Compra finalizada no marketplace parceiro
      </div>
      <AffiliateDisclosure />
      <div className="grid gap-3 sm:grid-cols-2">
        {product.pros.slice(0, 4).map((benefit) => (
          <span key={benefit} className="flex items-start gap-2 text-sm leading-6 text-slate-200">
            <CheckCircle2 className="mt-1 size-4 shrink-0 text-cyan-300" /> {benefit}
          </span>
        ))}
      </div>
    </div>
  );
}
