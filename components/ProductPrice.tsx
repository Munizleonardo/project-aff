import { formatCurrency } from "@/lib/format";

export function ProductPrice({
  oldPrice,
  price,
  installment,
  discountPercentage,
  large = false,
}: {
  oldPrice: number;
  price: number;
  installment: string;
  discountPercentage: number;
  large?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-sm text-slate-400 line-through">{formatCurrency(oldPrice)}</span>
      <div className="flex items-center gap-2">
        <strong className={`${large ? "text-4xl" : "text-2xl"} font-black tracking-tight text-white`}>{formatCurrency(price)}</strong>
        {large ? <span className="rounded-full bg-red-500 px-3 py-1 text-xs font-black text-white">-{discountPercentage}%</span> : null}
      </div>
      <span className="text-sm font-medium text-sky-200">{installment.replace("10x de", "ou 10x de").replace("8x de", "ou 8x de").replace("6x de", "ou 6x de")}</span>
    </div>
  );
}
