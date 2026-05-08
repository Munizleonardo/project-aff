import { Product } from "@/app/_data/products";

export function ProductGallery({ product }: { product: Product }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="aspect-square overflow-hidden rounded-xl border border-white/10 bg-white/[0.04]">
        <img src={product.image} alt={product.name} className="size-full object-cover" />
      </div>
      <div className="grid grid-cols-3 gap-3">
        {product.gallery.map((image, index) => (
          <div key={`${image}-${index}`} className="aspect-square overflow-hidden rounded-lg border border-white/10 bg-white/[0.04]">
            <img src={image} alt={`${product.name} imagem ${index + 1}`} className="size-full object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
}
