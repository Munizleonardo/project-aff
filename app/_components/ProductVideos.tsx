import { Play } from "lucide-react";
import { Card } from "@/app/_components/ui/card";
import { Product } from "@/app/_data/products";

export function ProductVideos({ product }: { product: Product }) {
  return (
    <section className="flex flex-col gap-5">
      <h2 className="text-2xl font-black text-white">Vídeos demonstrativos</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {product.videos.map((video) => (
          <Card key={video.title} className="group overflow-hidden rounded-xl border-white/10 bg-white/[0.04]">
            <div className="relative aspect-video">
              <img src={video.thumbnail} alt={video.title} className="size-full object-cover opacity-80 transition group-hover:scale-105" />
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="flex size-16 items-center justify-center rounded-full bg-cyan-400 text-slate-950 shadow-xl">
                  <Play className="size-7 fill-slate-950" />
                </span>
              </span>
              <span className="absolute bottom-3 right-3 rounded-md bg-slate-950/80 px-2 py-1 text-xs font-bold text-white">{video.duration}</span>
            </div>
            <h3 className="p-4 font-black text-white">{video.title}</h3>
          </Card>
        ))}
      </div>
    </section>
  );
}
