import type { Product } from "@/data/products";
import { Card } from "@/app/_components/ui/card";
import { RatingStars } from "./RatingStars";

export function ProductReviews({ product }: { product: Product }) {
  return (
    <section className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-black text-white">Avaliacoes</h2>
        <RatingStars rating={product.rating} reviewsCount={product.reviewsCount} />
      </div>
      {product.reviews.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-3">
          {product.reviews.map((review) => (
            <Card key={`${review.authorName}-${review.publishedAt}`} className="rounded-xl border-white/10 bg-white/[0.04] p-4">
              <RatingStars rating={review.rating} />
              <strong className="mt-3 block text-white">{review.authorName}</strong>
              <p className="mt-2 text-sm leading-6 text-slate-300">{review.body}</p>
            </Card>
          ))}
        </div>
      ) : null}
      <Card className="rounded-xl border-emerald-300/20 bg-emerald-300/10 p-4">
        <strong className="text-emerald-200">Pontos mais elogiados</strong>
        <p className="mt-2 text-sm leading-6 text-slate-200">{product.pros.slice(0, 3).join(", ")}.</p>
      </Card>
    </section>
  );
}
