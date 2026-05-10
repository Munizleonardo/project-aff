import Link from "next/link";
import { BarChart3, Check, ExternalLink, Info, Star, X } from "lucide-react";
import { AffiliateDisclosure } from "@/app/_components/marketing/AffiliateDisclosure";
import { Button } from "@/app/_components/ui/button";
import { Card } from "@/app/_components/ui/card";
import { ProductCard } from "@/app/_components/product/ProductCard";
import { SaveToBoxButton } from "@/app/_components/product/SaveToBoxButton";
import type { Product } from "@/data/products";
import { getBestProductOffer, getEstimatedSavings, getProductOffers } from "@/data/products";
import { formatCurrency } from "@/app/_lib/format";

type ProductDetailPageViewProps = {
  product: Product;
  relatedProducts: Product[];
  productStructuredDataJson: string;
};

const scoreCards = [
  ["Custo-benefício", "92/100", "text-emerald-300"],
  ["Qualidade", "88/100", "text-cyan-300"],
  ["Popularidade", "Alta", "text-amber-300"],
  ["Preço", "Competitivo", "text-violet-300"],
];

export function ProductDetailPageView({
  product,
  relatedProducts,
  productStructuredDataJson,
}: ProductDetailPageViewProps) {
  const offers = getProductOffers(product);
  const bestOffer = getBestProductOffer(product);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: productStructuredDataJson }} />
      <section className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-6 md:gap-10 md:py-12">
        <nav className="flex flex-wrap gap-2 text-xs font-semibold leading-5 text-sky-100/60">
          <Link href="/">Início</Link>
          <span>&gt;</span>
          <Link href={`/categoria/${product.department}`}>{product.category}</Link>
          <span>&gt;</span>
          <span className="text-white">{product.name}</span>
        </nav>

        <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:gap-9">
          <div className="flex flex-col gap-3">
            <Card className="aspect-[1.08/1] overflow-hidden rounded-2xl border-slate-800 bg-[#07101f] shadow-xl shadow-black/25">
              <img src={product.image} alt={product.name} className="size-full object-cover" />
            </Card>
            <div className="grid grid-cols-4 gap-2">
              {(product.gallery.length ? product.gallery : [product.image]).slice(0, 4).map((image) => (
                <span key={image} className="aspect-square overflow-hidden rounded-xl border border-slate-800 bg-[#07101f]">
                  <img src={image} alt="" className="size-full object-cover" />
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <div className="flex flex-wrap gap-2">
              <span className="w-fit rounded-full bg-[#10233d] px-3 py-1 text-xs font-black text-sky-100">{product.category}</span>
              <span className="w-fit rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-black text-emerald-300">{product.recommendationBadge}</span>
            </div>
            <div className="flex flex-col gap-3">
              <h1 className="text-[2rem] font-black leading-tight text-white md:text-5xl">{product.name}</h1>
              <p className="max-w-2xl text-base leading-7 text-sky-100/75">{product.shortDescription}</p>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-sm text-sky-100/70">
              <span className="flex items-center gap-1 text-amber-300"><Star className="size-4 fill-amber-300" /> <strong>{product.rating.toFixed(1)}</strong></span>
              <span>{product.reviewsCount.toLocaleString("pt-BR")} avaliações analisadas</span>
              <span>{product.clicks.toLocaleString("pt-BR")} acessos recentes</span>
            </div>
            <Card className="rounded-2xl border-slate-800 bg-[#07101f] p-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <span className="text-sm font-semibold text-sky-100/55">Menor preço encontrado</span>
                  <strong className="mt-1 block text-4xl font-black text-white">{formatCurrency(bestOffer.price)}</strong>
                  <span className="text-sm text-sky-100/70">{bestOffer.storeName} · {bestOffer.installment}</span>
                </div>
                <div className="flex flex-col gap-1 text-sm text-sky-100/70 sm:text-right">
                  <span>{offers.length} ofertas disponíveis</span>
                  <span>Economia estimada: <strong className="text-emerald-300">{formatCurrency(getEstimatedSavings(product))}</strong></span>
                </div>
              </div>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <Button asChild className="h-12 rounded-xl bg-[#38aefb] px-5 text-base font-black text-slate-950">
                  <a href="#ofertas">Comparar preços <BarChart3 className="size-5" /></a>
                </Button>
                <SaveToBoxButton
                  productId={product.id}
                  className="h-12 rounded-xl border-slate-800 bg-transparent px-5 text-base font-black text-white hover:border-white hover:bg-white hover:text-slate-950"
                />
              </div>
            </Card>
          </div>
        </section>

        <section id="ofertas" className="flex flex-col gap-4 scroll-mt-28">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-black text-white md:text-3xl">Melhor oferta e comparação de preços</h2>
            <p className="text-sky-100/70">Confira loja, preço, parcelamento, frete, disponibilidade e atualização antes de seguir para o marketplace.</p>
          </div>
          <div className="overflow-hidden rounded-2xl border border-slate-800 bg-[#07101f]">
            <div className="hidden grid-cols-[1.1fr_0.75fr_1fr_0.8fr_0.8fr_0.9fr_0.8fr] gap-3 border-b border-slate-800 px-4 py-3 text-xs font-black uppercase text-sky-100/45 md:grid">
              <span>Loja</span>
              <span>Preço</span>
              <span>Parcelamento</span>
              <span>Frete</span>
              <span>Status</span>
              <span>Atualização</span>
              <span>Ação</span>
            </div>
            {offers.map((offer) => (
              <div key={offer.id} className="grid gap-3 border-b border-slate-800 p-4 text-sm last:border-b-0 md:grid-cols-[1.1fr_0.75fr_1fr_0.8fr_0.8fr_0.9fr_0.8fr] md:items-center">
                <span className="flex items-center gap-3">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-cyan-400/10 text-xs font-black text-cyan-200">{offer.storeLogo}</span>
                  <span className="flex flex-col gap-1">
                    <strong className="text-white">{offer.storeName}</strong>
                    {offer.isBestPrice ? <span className="text-xs font-black text-emerald-300">Menor preço</span> : null}
                  </span>
                </span>
                <strong className="text-lg text-white">{formatCurrency(offer.price)}</strong>
                <span className="text-sky-100/70">{offer.installment}</span>
                <span className="text-sky-100/70">{offer.shipping}</span>
                <span className="text-emerald-300">{offer.availability}</span>
                <span className="text-sky-100/55">{new Date(offer.lastUpdated).toLocaleDateString("pt-BR")}</span>
                <Button asChild className="h-10 rounded-xl bg-[#38aefb] font-black text-slate-950">
                  <Link href={`/oferta/${offer.id}`}>Ver oferta <ExternalLink className="size-4" /></Link>
                </Button>
              </div>
            ))}
          </div>
          <AffiliateDisclosure />
        </section>

        <section className="grid gap-4 md:grid-cols-5">
          {scoreCards.map(([label, value, color]) => (
            <Card key={label} className="rounded-2xl border-slate-800 bg-[#07101f] p-4">
              <span className="text-sm text-sky-100/55">{label}</span>
              <strong className={`mt-2 block text-xl font-black ${color}`}>{value}</strong>
            </Card>
          ))}
          <Card className="rounded-2xl border-slate-800 bg-[#07101f] p-4">
            <span className="text-sm text-sky-100/55">Indicação de uso</span>
            <strong className="mt-2 block text-xl font-black text-white">Uso diário tech</strong>
          </Card>
        </section>

        <section className="grid gap-5 lg:grid-cols-2">
          <Card className="rounded-2xl border-slate-800 bg-[#07101f] p-5">
            <h2 className="text-xl font-black text-white">Prós</h2>
            <div className="mt-4 flex flex-col gap-3">
              {[...product.pros.slice(0, 3), "preço competitivo"].slice(0, 4).map((item) => (
                <span key={item} className="flex items-start gap-2 text-sm leading-6 text-sky-100/75"><Check className="mt-1 size-4 shrink-0 text-emerald-300" /> {item}</span>
              ))}
            </div>
          </Card>
          <Card className="rounded-2xl border-slate-800 bg-[#07101f] p-5">
            <h2 className="text-xl font-black text-white">Contras</h2>
            <div className="mt-4 flex flex-col gap-3">
              {[...product.cons.slice(0, 3), "frete pode impactar preço final"].slice(0, 4).map((item) => (
                <span key={item} className="flex items-start gap-2 text-sm leading-6 text-sky-100/75"><X className="mt-1 size-4 shrink-0 text-amber-300" /> {item}</span>
              ))}
            </div>
          </Card>
        </section>

        <section className="grid gap-5 lg:grid-cols-[1.25fr_0.75fr]">
          <Card className="rounded-2xl border-slate-800 bg-[#07101f] p-5 md:p-6">
            <h2 className="text-2xl font-black text-white">Análise completa</h2>
            <p className="mt-4 leading-7 text-sky-100/72">{product.fullDescription}</p>
            <p className="mt-4 leading-7 text-sky-100/72">
              Este produto é indicado para quem busca uma opção equilibrada dentro da categoria {product.category.toLowerCase()}, com atenção ao preço final, avaliações e disponibilidade entre marketplaces. Vale a pena quando a melhor oferta mantém boa diferença em relação ao preço antigo e o frete não anula a economia.
            </p>
          </Card>
          <Card className="rounded-2xl border-slate-800 bg-[#07101f] p-5 md:p-6">
            <h2 className="text-2xl font-black text-white">Especificações técnicas</h2>
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

        <Card className="rounded-2xl border-slate-800 bg-[#07101f] p-5 md:p-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <h2 className="text-2xl font-black text-white">Avaliações e opinião geral</h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-sky-100/70">Resumo editorial com base em nota média, recorrência de elogios e pontos de atenção comuns em produtos da categoria.</p>
            </div>
            <div className="rounded-2xl bg-slate-950/45 p-4">
              <strong className="text-5xl font-black text-cyan-300">{product.rating.toFixed(1)}</strong>
              <span className="ml-2 text-sm text-sky-100/60">/ 5</span>
            </div>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {["boa relação entre preço e recursos", "facilidade de uso no dia a dia", "atenção a estoque, frete e vendedor"].map((comment, index) => (
              <Card key={comment} className="rounded-xl border-slate-800 bg-slate-950/35 p-4">
                <span className="flex items-center gap-1 text-amber-300">{Array.from({ length: 5 }).map((_, star) => <Star key={star} className="size-3.5 fill-amber-300" />)}</span>
                <p className="mt-3 text-sm leading-6 text-sky-100/75">{index === 2 ? "Ponto de atenção: " : "Comentário frequente: "}{comment}.</p>
              </Card>
            ))}
          </div>
        </Card>

        <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm text-sky-100/70">
          <Info className="mt-0.5 size-5 shrink-0 text-cyan-300" />
          <p>O TechParks não vende diretamente. Organizamos análise, comparação e ofertas; a decisão e a finalização acontecem no marketplace parceiro.</p>
        </div>

        <section className="flex flex-col gap-5 pb-16 md:pb-24">
          <h2 className="text-2xl font-black text-white">Produtos similares</h2>
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
