import type { Product } from "@/data/products";

/** Payload JSON-LD `Product` usado pela página de detalhe para rich results. */
export function buildGoogleProductStructuredData(product: Product) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.gallery,
    description: product.shortDescription,
    sku: product.id,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewsCount,
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "BRL",
      price: product.price,
      availability: "https://schema.org/InStock",
      url: `/oferta/${product.id}`,
    },
  };
}
