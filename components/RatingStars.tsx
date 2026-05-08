import { Star } from "lucide-react";

export function RatingStars({ rating, reviewsCount }: { rating: number; reviewsCount?: number }) {
  return (
    <div className="flex items-center gap-1 text-amber-300">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star key={index} className={`size-4 ${index < Math.round(rating) ? "fill-amber-300" : "fill-transparent text-slate-400"}`} />
      ))}
      <span className="ml-1 text-sm font-semibold text-sky-100">{rating.toFixed(1)}{reviewsCount ? ` (${reviewsCount})` : ""}</span>
    </div>
  );
}
