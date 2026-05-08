import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, ExternalLink, Heart, Info, Star, Trophy, Eye, Sparkles, TrendingUp } from "lucide-react";
import { Footer } from "@/app/_components/Footer";
import { Header } from "@/app/_components/Header";
import { AddToCartButton } from "@/app/_components/AddToCartButton";
import { Button } from "@/app/_components/ui/button";
import { Card } from "@/app/_components/ui/card";
import { ProductCard } from "@/app/_components/ProductCard";
import { getProductBySlug, products } from "@/app/_data/products";
import { formatCurrency } from "@/app/_lib/format";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Produto nao encontrado" };
  return {
    title: `${product.name} vale a pena? Review, preco e onde comprar`,
    description: `${product.name} com desconto: veja preco, avaliacao, pontos positivos, pontos de atencao e link seguro para marketplace parceiro.`,
    keywords: [product.name, `${product.name} vale a pena`, `review ${product.name}`, `${product.name} com desconto`, `onde comprar ${product.name}`],
    alternates: { canonical: `/produto/${product.slug}` },
    openGraph: { title: product.name, description: product.shortDescription, type: "website", images: [{ url: product.image }] },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = products.filter((item) => item.id !== product.id && item.department === product.department).slice(0, 4);
  const economy = product.oldPrice - product.price;
  const benefits = [
    ["Melhor preço", Trophy, "text-emerald-400"],
    ["Custo-benefício", TrendingUp, "text-cyan-400"],
    ["Mais acessado", Eye, "text-amber-400"],
    ["Melhor avaliado", Sparkles, "text-violet-400"],
  ];
  const reviewRows = [
    ["5", "w-[78%]"],
    ["4", "w-[34%]"],
    ["3", "w-[5%]"],
    ["2", "w-[4%]"],
    ["1", "w-[5%]"],
  ];

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.gallery,
    description: product.shortDescription,
    sku: product.id,
    aggregateRating: { "@type": "AggregateRating", ratingValue: product.rating, reviewCount: product.reviewsCount },
    offers: { "@type": "Offer", priceCurrency: "BRL", price: product.price, availability: "https://schema.org/InStock", url: `/oferta/${product.id}` },
  };

  return (
    <>
      <Header />
      <main className="bg-slate-950">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
        <section className="mx-auto flex max-w-[1120px] flex-col gap-7 px-4 py-8 md:gap-9 md:py-12">
          <nav className="flex flex-wrap gap-2 text-xs font-semibold text-sky-100/60">
            <Link href="/">Inicio</Link>
            <span>&gt;</span>
            <Link href={`/categoria/${product.department}`}>{product.category}</Link>
            <span>&gt;</span>
            <span className="text-white">{product.name}</span>
          </nav>

          <section className="grid gap-6 md:gap-8 lg:grid-cols-[1fr_1fr]">
            <Card className="aspect-square overflow-hidden rounded-[18px] border-slate-800 bg-[#07101f] shadow-2xl shadow-black/25">
              <img src={product.image} alt={product.name} className="size-full object-cover" />
            </Card>

            <div className="flex flex-col gap-5 pt-1">
              <span className="w-fit rounded-full bg-[#10233d] px-3 py-1 text-xs font-black text-sky-100">{product.category}</span>
              <h1 className="text-3xl font-black leading-tight text-white md:text-4xl">{product.name}</h1>
              <div className="flex items-center gap-2 text-sm text-sky-100/70">
                <span className="flex text-amber-400">{Array.from({ length: 5 }).map((_, index) => <Star key={index} className="size-4 fill-amber-400" />)}</span>
                <strong className="text-white">{product.rating.toFixed(1)}</strong>
                <span>({product.reviewsCount.toLocaleString("pt-BR")} avaliações)</span>
              </div>

              <Card className="rounded-[18px] border-slate-800 bg-[#07101f] p-5 shadow-xl shadow-black/20">
                <div className="flex flex-col items-start justify-between gap-4 sm:flex-row">
                  <div>
                    <span className="text-sm text-sky-100/55 line-through">{formatCurrency(product.oldPrice)}</span>
                    <strong className="mt-1 block text-3xl font-black text-white md:text-4xl">{formatCurrency(product.price)}</strong>
                    <span className="text-sm text-sky-100/70">{product.installment}</span>
                    <span className="mt-2 block text-xs font-black text-emerald-400">Você economiza {formatCurrency(economy)}</span>
                  </div>
                  <span className="rounded-full bg-emerald-500 px-4 py-2 text-sm font-black text-white">-{product.discountPercentage}%</span>
                </div>
                <div className="mt-5 flex flex-col gap-3">
                  <Button asChild className="button-clear-hover h-12 rounded-xl bg-[#38aefb] text-sm font-black text-slate-950 hover:scale-[1.02]">
                    <Link href={`/oferta/${product.id}`}>Ver oferta no marketplace <ExternalLink className="size-4" /></Link>
                  </Button>
                  <AddToCartButton
                    productId={product.id}
                    className="h-11 rounded-xl border-slate-800 bg-transparent text-sm font-black text-white hover:border-white hover:bg-white hover:text-slate-950"
                  />
                  <Button variant="outline" className="button-clear-hover h-11 rounded-xl border-slate-800 bg-transparent text-sm font-black text-white hover:border-white hover:bg-white hover:text-slate-950">
                    <Heart className="size-4" /> Adicionar aos favoritos
                  </Button>
                </div>
                <div className="mt-4 rounded-xl bg-emerald-500/10 p-3 text-xs font-semibold text-emerald-300">
                  <Check className="mr-2 inline size-4" /> Compra segura. Você é redirecionado para o marketplace parceiro para finalizar.
                </div>
                <p className="mt-3 text-xs text-sky-100/55"><Info className="mr-1 inline size-3.5" /> Podemos receber comissão por compras realizadas através deste link.</p>
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
            <h2 className="text-2xl font-black text-white">Por que escolher este produto?</h2>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
              {benefits.map(([label, Icon, color]) => (
                <Card key={label as string} className="rounded-[16px] border-slate-800 bg-[#07101f] p-5 text-center shadow-xl shadow-black/20 md:p-6">
                  <Icon className={`mx-auto mb-3 size-6 ${color}`} />
                  <strong className="block text-sm text-white">{label as string}</strong>
                  <span className="mt-2 inline-flex rounded-full bg-emerald-500/15 px-2 py-1 text-[10px] font-black text-emerald-400">Selecionado</span>
                </Card>
              ))}
            </div>
          </section>

          <section className="grid gap-5 lg:grid-cols-[1.35fr_0.65fr]">
            <Card className="rounded-[18px] border-slate-800 bg-[#07101f] p-4 md:p-6">
              <h2 className="text-xl font-black text-white md:text-2xl">Descrição completa</h2>
              <p className="mt-4 leading-7 text-sky-100/70">{product.fullDescription}</p>
              <div className="mt-6 grid gap-5 md:grid-cols-2">
                <div>
                  <h3 className="text-sm font-black uppercase text-emerald-400">Pontos positivos</h3>
                  <ul className="mt-3 flex flex-col gap-2 text-sm text-sky-100/80">{product.pros.slice(0, 3).map((item) => <li key={item}>+ {item}</li>)}</ul>
                </div>
                <div>
                  <h3 className="text-sm font-black uppercase text-amber-400">Pontos de atenção</h3>
                  <ul className="mt-3 flex flex-col gap-2 text-sm text-sky-100/80">{product.cons.slice(0, 3).map((item) => <li key={item}>! {item}</li>)}</ul>
                </div>
              </div>
            </Card>
            <Card className="rounded-[18px] border-slate-800 bg-[#07101f] p-4 md:p-6">
              <h2 className="text-xl font-black text-white">Especificações técnicas</h2>
              <div className="mt-5 flex flex-col gap-3">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div key={key} className="flex justify-between gap-4 border-b border-slate-800 pb-3 text-sm">
                    <span className="text-sky-100/60">{key}</span>
                    <strong className="text-right text-white">{value}</strong>
                  </div>
                ))}
              </div>
            </Card>
          </section>

          <Card asChild className="rounded-[18px] border-slate-800 bg-[#07101f] p-4 md:p-6">
          <section>
            <h2 className="text-xl font-black text-white md:text-2xl">Avaliações de quem comprou</h2>
            <div className="mt-6 grid gap-6 md:grid-cols-[110px_1fr]">
              <div>
                <strong className="text-5xl font-black text-cyan-400">{product.rating.toFixed(1)}</strong>
                <div className="mt-1 flex text-amber-400">{Array.from({ length: 5 }).map((_, index) => <Star key={index} className="size-4 fill-amber-400" />)}</div>
                <span className="text-xs text-sky-100/60">{product.reviewsCount.toLocaleString("pt-BR")} avaliações</span>
              </div>
              <div className="flex flex-col gap-2">
                {reviewRows.map(([stars, width]) => (
                  <div key={stars as string} className="flex items-center gap-3 text-xs text-sky-100/60">
                    <span>{stars as string}★</span>
                    <span className="h-2 flex-1 rounded-full bg-slate-800"><span className={`block h-full rounded-full bg-amber-400 ${width as string}`} /></span>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-6 flex flex-col gap-3">
              {["Lucas M.", "Mariana S.", "Carlos H."].map((name, index) => (
                <Card key={name} className="rounded-xl border-slate-800 p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <strong className="text-white">{name}</strong>
                      <div className="flex text-amber-400">{Array.from({ length: 5 }).map((_, star) => <Star key={star} className="size-3 fill-amber-400" />)}</div>
                    </div>
                    <span className="text-xs text-sky-100/50">{index === 0 ? "há 3 dias" : index === 1 ? "há 1 semana" : "há 2 semanas"}</span>
                  </div>
                  <p className="mt-2 text-sm text-sky-100/70">{index === 0 ? "Produto incrível! Superou todas as minhas expectativas. Entrega rápida e bem embalado." : index === 1 ? "Custo-benefício excelente. Recomendo demais para quem está em dúvida." : "Muito bom, só achei o manual confuso. Mas o produto em si é top."}</p>
                </Card>
              ))}
            </div>
          </section>
          </Card>

          <section className="flex flex-col gap-5 pb-16 md:pb-24">
            <h2 className="text-xl font-black text-white md:text-2xl">Produtos relacionados</h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {(related.length ? related : products.filter((item) => item.id !== product.id).slice(0, 4)).map((item) => <ProductCard key={item.id} product={item} />)}
            </div>
          </section>
        </section>
      </main>
      <Footer />
    </>
  );
}
