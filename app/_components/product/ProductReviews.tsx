import { Product } from "@/data/products";
import { Card } from "@/app/_components/ui/card";
import { RatingStars } from "./RatingStars";

export function ProductReviews({ product }: { product: Product }) {
  const comments = [
    ["Marina C.", "Entrega muito boa pelo preço. Ajudou bastante no meu setup de trabalho."],
    ["Rafael M.", "Gostei da construção e da experiência geral. Ficaria de olho nas variações de preço."],
    ["Bianca T.", "Comprei depois de comparar com modelos parecidos e fez sentido para minha rotina."],
  ];
  return (
    <section className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-black text-white">Avaliações</h2>
        <RatingStars rating={product.rating} reviewsCount={product.reviewsCount} />
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {comments.map(([name, text]) => (
          <Card key={name} className="rounded-xl border-white/10 bg-white/[0.04] p-4">
            <RatingStars rating={5} />
            <strong className="mt-3 block text-white">{name}</strong>
            <p className="mt-2 text-sm leading-6 text-slate-300">{text}</p>
          </Card>
        ))}
      </div>
      <Card className="rounded-xl border-emerald-300/20 bg-emerald-300/10 p-4">
        <strong className="text-emerald-200">Pontos mais elogiados</strong>
        <p className="mt-2 text-sm leading-6 text-slate-200">{product.pros.slice(0, 3).join(", ")}.</p>
      </Card>
    </section>
  );
}
