import Link from "next/link";
import { ArrowRight, BadgeCheck, BarChart3, ShieldCheck, Sparkles, Star, Store, Zap } from "lucide-react";
import { Button } from "@/app/_components/ui/button";
import { getBestProductOffer, getProductOffers, getTopProducts, type Product } from "@/data/products";
import { formatCurrency } from "@/app/_lib/format";

function HeroComparisonMarquee({ products }: { products: Product[] }) {
  const leftProducts = products.slice(0, 8);
  const rightProducts = [...products.slice(4, 8), ...products.slice(0, 4)];
  const columns: Array<{ direction: "down" | "up"; products: Product[] }> = [
    { direction: "down", products: leftProducts },
    { direction: "up", products: rightProducts },
  ];

  return (
    <div className="hero-offers-panel relative mx-auto h-[330px] w-full max-w-[620px] overflow-hidden rounded-2xl border border-slate-700/70 bg-[#07101f]/90 p-2 shadow-2xl shadow-blue-950/40 sm:h-[460px] sm:rounded-[24px] sm:p-3">
      <div className="grid h-full grid-cols-2 gap-2 overflow-hidden sm:gap-3">
        {columns.map((column) => (
          <div key={column.direction} className={`flex flex-col will-change-transform ${column.direction === "down" ? "hero-offers-track-down" : "hero-offers-track-up"}`}>
            {[0, 1].map((group) => (
              <div key={group} className="flex flex-col gap-3 pb-3">
                {column.products.map((product) => {
                  const bestOffer = getBestProductOffer(product);
                  const offerCount = getProductOffers(product).length;
                  return (
                    <Link
                      href={`/produto/${product.slug}`}
                      key={`${column.direction}-${group}-${product.id}`}
                      className="hero-offer-card flex min-h-[116px] shrink-0 flex-col gap-2 rounded-2xl border border-slate-700/70 bg-[#081223] p-3 shadow-lg shadow-black/20 transition hover:border-cyan-400/60"
                    >
                      <span className="flex items-center gap-3">
                        <img src={product.image} alt={product.name} className="size-12 rounded-xl object-cover sm:size-14" />
                        <span className="flex min-w-0 flex-col gap-1">
                          <strong className="hero-offer-title line-clamp-2 text-xs leading-4 text-white sm:text-sm">{product.name}</strong>
                          <span className="flex items-center gap-1 text-xs font-black text-amber-300"><Star className="size-3 fill-amber-300" /> {product.rating.toFixed(1)}</span>
                        </span>
                      </span>
                      <span className="grid grid-cols-2 gap-2 text-xs">
                        <span className="rounded-lg bg-cyan-400/10 p-2 text-cyan-100">
                          <span className="block text-[10px] text-sky-100/55">Menor preço</span>
                          <strong>{formatCurrency(bestOffer.price).replace(",00", "")}</strong>
                        </span>
                        <span className="rounded-lg bg-emerald-400/10 p-2 text-emerald-100">
                          <span className="block text-[10px] text-sky-100/55">Lojas</span>
                          <strong>{offerCount} ofertas</strong>
                        </span>
                      </span>
                      <span className="w-fit rounded-full bg-white/10 px-2 py-1 text-[10px] font-black text-white">{product.recommendationBadge}</span>
                    </Link>
                  );
                })}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="hero-offers-fade-top pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#07101f] via-[#07101f]/80 to-transparent" />
      <div className="hero-offers-fade-bottom pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#07101f] via-[#07101f]/80 to-transparent" />
    </div>
  );
}

export async function HeroSection() {
  const topProducts = await getTopProducts(8);

  return (
    <section className="hero-section relative overflow-hidden bg-[#030711]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_90%,rgba(34,211,238,0.22),transparent_34%),radial-gradient(circle_at_92%_18%,rgba(16,185,129,0.18),transparent_28%),linear-gradient(120deg,#030711_0%,#07111f_50%,#06283a_100%)]" />
      <div className="relative mx-auto flex max-w-7xl flex-col gap-8 px-4 pb-10 pt-10 sm:px-6 md:gap-12 md:px-4 md:pb-20 md:pt-24">
        <div className="grid items-center gap-8 lg:grid-cols-[1fr_0.96fr] lg:gap-10">
          <div className="hero-copy flex flex-col gap-5 sm:gap-6">
            <span className="hero-kicker flex w-fit max-w-full items-center gap-2 rounded-full border border-slate-700 bg-[#060d1b]/80 px-3 py-2 text-xs font-black text-white sm:px-4 sm:text-sm">
              <Sparkles className="size-4 text-[#38aefb]" /> Comparação inteligente · curadoria tech · ofertas afiliadas
            </span>
            <h1 className="hero-title max-w-3xl text-[2.35rem] font-black leading-[1.08] tracking-tight text-white min-[380px]:text-4xl sm:text-5xl md:text-6xl">
              Compare produtos tech e encontre a melhor oferta
            </h1>
            <p className="hero-subtitle max-w-2xl text-base leading-7 text-sky-100/75 sm:text-lg md:text-xl md:leading-8">
              Veja avaliações, preços, vantagens, desvantagens e ofertas de diferentes marketplaces antes de decidir onde comprar.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild className="h-12 w-full rounded-2xl bg-[#38aefb] px-6 text-base font-black text-slate-950 hover:bg-cyan-300 sm:w-auto">
                <Link href="/comparativos">Comparar produtos <BarChart3 className="size-5" /></Link>
              </Button>
              <Button asChild variant="outline" className="hero-secondary-button h-12 w-full rounded-2xl border-slate-700 bg-transparent px-6 text-base font-black text-white hover:bg-white/5 sm:w-auto">
                <Link href="/ofertas">Ver melhores ofertas <ArrowRight className="size-5" /></Link>
              </Button>
            </div>
            <div className="hero-trust flex flex-wrap gap-3 pt-2 text-xs font-medium text-sky-100/70 sm:gap-6 sm:text-sm">
              <span className="flex items-center gap-2"><ShieldCheck className="size-4 text-emerald-400" /> Sem venda direta</span>
              <span className="flex items-center gap-2"><Store className="size-4 text-cyan-400" /> Marketplaces parceiros</span>
              <span className="flex items-center gap-2"><Zap className="size-4 text-amber-400" /> Preços organizados para decisão</span>
              <span className="flex items-center gap-2"><BadgeCheck className="size-4 text-cyan-400" /> Análise + curadoria</span>
            </div>
          </div>
          <HeroComparisonMarquee products={topProducts} />
        </div>
      </div>
    </section>
  );
}
