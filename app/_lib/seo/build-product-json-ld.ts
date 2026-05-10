import { getProductOfferPath, getProductOffers, type Product } from "@/data/products";

/** Payload JSON-LD usado pela pagina de detalhe para rich results. */
export function buildGoogleProductStructuredData(product: Product) {
  const offers = getProductOffers(product);

  return [
    {
      "@context": "https://schema.org",
      "@type": "Product",
      name: product.name,
      image: product.gallery,
      description: product.shortDescription,
      sku: product.id,
      category: product.category,
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: product.rating,
        reviewCount: product.reviewsCount,
      },
      offers: offers.map((offer) => ({
        "@type": "Offer",
        priceCurrency: "BRL",
        price: offer.price,
        availability: "https://schema.org/InStock",
        seller: {
          "@type": "Organization",
          name: offer.storeName,
        },
        url: `/oferta/${offer.id}`,
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Início", item: "/" },
        { "@type": "ListItem", position: 2, name: product.category, item: `/categoria/${product.department}` },
        { "@type": "ListItem", position: 3, name: product.name, item: `/produto/${product.slug}` },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: `${product.name} vale a pena?`,
      description: `Comparação de preços, avaliações e ofertas para ${product.name}.`,
      url: getProductOfferPath(product),
    },
  ];
}
