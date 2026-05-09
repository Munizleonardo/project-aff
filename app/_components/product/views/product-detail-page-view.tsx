import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { Check, ExternalLink, Eye, Info, Sparkles, Star, TrendingUp, Trophy } from "lucide-react";
import { AddToCartButton } from "@/app/_components/cart/AddToCartButton";
import { Button } from "@/app/_components/ui/button";
import { Card } from "@/app/_components/ui/card";
import { ProductCard } from "@/app/_components/product/ProductCard";
import { SaveToBoxButton } from "@/app/_components/product/SaveToBoxButton";
import type { Product } from "@/data/products";
import { formatCurrency } from "@/app/_lib/format";

const PDP_CHOICE_REASON_HIGHLIGHTS: Array<{ label: string; Icon: LucideIcon; iconColorClassName: string }> = [
  { label: "Melhor preco", Icon: Trophy, iconColorClassName: "text-emerald-400" },
  { label: "Custo-beneficio", Icon: TrendingUp, iconColorClassName: "text-cyan-400" },
  { label: "Mais acessado", Icon: Eye, iconColorClassName: "text-amber-400" },
  { label: "Melhor avaliado", Icon: Sparkles, iconColorClassName: "text-violet-400" },
];

type ProductDetailPageViewProps = {
  product: Product;
  relatedProducts: Product[];
  productStructuredDataJson: string;
};

export function ProductDetailPageView({
  product,
  relatedProducts,
  productStructuredDataJson,
}: ProductDetailPageViewProps) {
  const priceAdvantageVersusSticker = product.oldPrice - product.price;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: productStructuredDataJson }} />
      <section className="mx-auto flex max-w-[1120px] flex-col gap-6 px-4 py-6 md:gap-9 md:py-12">
        <nav className="flex flex-wrap gap-2 text-xs font-semibold leading-5 text-sky-100/60">
          <Link href="/">Inicio</Link>
          <span>&gt;</span>
          <Link href={`/categoria/${product.department}`}>{product.category}</Link>
          <span>&gt;</span>
          <span className="text-white">{product.name}</span>
        </nav>

        <section className="grid gap-6 md:gap-8 lg:grid-cols-[1fr_1fr]">
          <Card className="aspect-[1.08/1] overflow-hidden rounded-2xl border-slate-800 bg-[#07101f] shadow-xl shadow-black/25 sm:aspect-square sm:shadow-2xl">
            <img src={product.image} alt={product.name} className="size-full object-cover" />
          </Card>

          <div className="flex flex-col gap-4 pt-1 sm:gap-5">
            <span className="w-fit rounded-full bg-[#10233d] px-3 py-1 text-xs font-black text-sky-100">{product.category}</span>
            <h1 className="text-[1.85rem] font-black leading-tight text-white md:text-4xl">{product.name}</h1>
            <div className="flex flex-wrap items-center gap-2 text-sm text-sky-100/70">
              <span className="flex text-amber-400">{Array.from({ length: 5 }).map((_, index) => <Star key={index} className="size-4 fill-amber-400" />)}</span>
              <strong className="text-white">{product.rating.toFixed(1)}</strong>
              <span>({product.reviewsCount.toLocaleString("pt-BR")} avaliacoes)</span>
            </div>

            <Card className="rounded-2xl border-slate-800 bg-[#07101f] p-4 shadow-xl shadow-black/20 sm:p-5">
              <div className="flex flex-col items-start justify-between gap-4 sm:flex-row">
                <div>
                  <span className="text-sm text-sky-100/55 line-through">{formatCurrency(product.oldPrice)}</span>
                  <strong className="mt-1 block text-[2rem] font-black leading-tight text-white md:text-4xl">{formatCurrency(product.price)}</strong>
                  <span className="text-sm text-sky-100/70">{product.installment}</span>
                  <span className="mt-2 block text-xs font-black text-emerald-400">
                    Voce economiza {formatCurrency(priceAdvantageVersusSticker)}
                  </span>
                </div>
                <span className="rounded-full bg-emerald-500 px-4 py-2 text-sm font-black text-white">-{product.discountPercentage}%</span>
              </div>
              <div className="mt-5 flex flex-col gap-3">
                <Button asChild className="button-clear-hover h-12 w-full rounded-xl bg-[#38aefb] px-3 text-sm font-black text-slate-950 hover:scale-[1.02]">
                  <Link href={`/oferta/${product.id}`}>Ver oferta no marketplace <ExternalLink className="size-4" /></Link>
                </Button>
                <AddToCartButton
                  productId={product.id}
                  className="h-11 w-full rounded-xl border-slate-800 bg-transparent text-sm font-black text-white hover:border-white hover:bg-white hover:text-slate-950"
                />
                <SaveToBoxButton
                  productId={product.id}
                  className="button-clear-hover h-11 w-full rounded-xl border-slate-800 bg-transparent text-sm font-black text-white hover:border-white hover:bg-white hover:text-slate-950"
                />
              </div>
              <div className="mt-4 rounded-xl bg-emerald-500/10 p-3 text-xs font-semibold text-emerald-300">
                <Check className="mr-2 inline size-4" /> Compra segura. Voce e redirecionado para o marketplace parceiro para finalizar.
              </div>
              <p className="mt-3 text-xs text-sky-100/55"><Info className="mr-1 inline size-3.5" /> Podemos receber comissao por compras realizadas atraves deste link.</p>
            </Card>

            <div className="flex flex-col gap-3">
              <h2 className="text-sm font-black uppercase tracking-wide text-sky-100/55">Destaques</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {Object.entries(product.specs).slice(0, 2).map(([key, value]) => (
                  <Card key={key} className="rounded-xl border-slate-800 bg-[#07101f] p-3 text-sm text-sky-100/70">
                    <Check className="mr-2 inline size-4 text-emerald-400" /> {key}: <strong className="text-white">{value}</strong>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-5">
          <h2 className="text-[1.45rem] font-black leading-tight text-white sm:text-2xl">Por que escolher este produto?</h2>
          <div className="grid gap-3 min-[420px]:grid-cols-2 md:grid-cols-4">
            {PDP_CHOICE_REASON_HIGHLIGHTS.map(({ label, Icon, iconColorClassName }) => (
              <Card key={label} className="rounded-2xl border-slate-800 bg-[#07101f] p-4 text-center shadow-xl shadow-black/20 md:p-6">
                <Icon className={`mx-auto mb-2 size-6 sm:mb-3 ${iconColorClassName}`} />
                <strong className="block text-sm text-white">{label}</strong>
                <span className="mt-2 inline-flex rounded-full bg-emerald-500/15 px-2 py-1 text-[10px] font-black text-emerald-400">Selecionado</span>
              </Card>
            ))}
          </div>
        </section>

        <section className="grid gap-5 lg:grid-cols-[1.35fr_0.65fr]">
          <Card className="rounded-2xl border-slate-800 bg-[#07101f] p-4 md:p-6">
            <h2 className="text-xl font-black text-white md:text-2xl">Descricao completa</h2>
            <p className="mt-4 leading-7 text-sky-100/70">{product.fullDescription}</p>
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <div>
                <h3 className="text-sm font-black uppercase text-emerald-400">Pontos positivos</h3>
                <ul className="mt-3 flex flex-col gap-2 text-sm text-sky-100/80">{product.pros.slice(0, 3).map((item) => <li key={item}>+ {item}</li>)}</ul>
              </div>
              <div>
                <h3 className="text-sm font-black uppercase text-amber-400">Pontos de atencao</h3>
                <ul className="mt-3 flex flex-col gap-2 text-sm text-sky-100/80">{product.cons.slice(0, 3).map((item) => <li key={item}>! {item}</li>)}</ul>
              </div>
            </div>
          </Card>
          <Card className="rounded-2xl border-slate-800 bg-[#07101f] p-4 md:p-6">
            <h2 className="text-xl font-black text-white">Especificacoes tecnicas</h2>
            <div className="mt-5 flex flex-col gap-3">
              {Object.entries(product.specs).map(([key, value]) => (
                <div key={key} className="flex flex-col gap-1 border-b border-slate-800 pb-3 text-sm min-[420px]:flex-row min-[420px]:justify-between min-[420px]:gap-4">
                  <span className="text-sky-100/60">{key}</span>
                  <strong className="text-white min-[420px]:text-right">{value}</strong>
                </div>
              ))}
            </div>
          </Card>
        </section>

        <Card asChild className="rounded-2xl border-slate-800 bg-[#07101f] p-4 md:p-6">
          <section>
            <h2 className="text-xl font-black text-white md:text-2xl">Avaliacoes de quem comprou</h2>
            <div className="mt-6 grid gap-5 md:grid-cols-[110px_1fr] md:gap-6">
              <div>
                <strong className="text-5xl font-black text-cyan-400">{product.rating.toFixed(1)}</strong>
                <div className="mt-1 flex text-amber-400">{Array.from({ length: 5 }).map((_, index) => <Star key={index} className="size-4 fill-amber-400" />)}</div>
                <span className="text-xs text-sky-100/60">{product.reviewsCount.toLocaleString("pt-BR")} avaliacoes</span>
              </div>
              <div className="flex min-h-24 items-center rounded-xl border border-slate-800 bg-slate-950/30 p-4 text-sm leading-6 text-sky-100/65">
                Avaliacoes e depoimentos sao carregados da tabela de reviews do banco.
              </div>
            </div>
            {product.reviews.length > 0 ? (
              <div className="mt-6 flex flex-col gap-3">
                {product.reviews.map(({ authorName, rating, publishedAt, body }) => (
                  <Card key={`${authorName}-${publishedAt}`} className="rounded-xl border-slate-800 p-4">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <strong className="text-white">{authorName}</strong>
                        <div className="flex text-amber-400">
                          {Array.from({ length: 5 }).map((_, star) => (
                            <Star key={star} className={`size-3 ${star < Math.round(rating) ? "fill-amber-400" : "fill-transparent text-slate-500"}`} />
                          ))}
                        </div>
                      </div>
                      <span className="text-xs text-sky-100/50">{new Date(publishedAt).toLocaleDateString("pt-BR")}</span>
                    </div>
                    <p className="mt-2 text-sm text-sky-100/70">{body}</p>
                  </Card>
                ))}
              </div>
            ) : null}
          </section>
        </Card>

        <section className="flex flex-col gap-5 pb-16 md:pb-24">
          <h2 className="text-xl font-black text-white md:text-2xl">Produtos relacionados</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {relatedProducts.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      </section>
    </>
  );
}
