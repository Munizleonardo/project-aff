import { isSupabaseConfigured, supabaseSelect } from "@/app/_lib/supabase-rest";

export type ProductVideo = {
  title: string;
  thumbnail: string;
  duration: string;
  url?: string | null;
};

export type ProductReview = {
  authorName: string;
  rating: number;
  body: string;
  publishedAt: string;
  isVerifiedPurchase: boolean;
};

export type ProductRecommendationBadge = "Melhor custo-benefício" | "Menor preço" | "Mais acessado";

export type ProductOffer = {
  id: string;
  productId: string;
  storeName: string;
  storeLogo: string;
  price: number;
  oldPrice: number;
  installment: string;
  shipping: string;
  availability: string;
  affiliateUrl: string;
  lastUpdated: string;
  isBestPrice: boolean;
};

export type ProductComparison = {
  id: string;
  slug: string;
  title: string;
  description: string;
  productIds: string[];
  recommendationSummary: string;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  category: string;
  department: string;
  image: string;
  gallery: string[];
  oldPrice: number;
  price: number;
  installment: string;
  discountPercentage: number;
  rating: number;
  reviewsCount: number;
  clicks: number;
  affiliateOfferId?: string | null;
  affiliateUrl: string;
  recommendationBadge?: ProductRecommendationBadge;
  tags: string[];
  specs: Record<string, string>;
  pros: string[];
  cons: string[];
  videos: ProductVideo[];
  reviews: ProductReview[];
  featured?: boolean;
};

const fallbackProducts: Product[] = [
  {
    id: "00000000-0000-4000-8000-00000000g203",
    name: "Logitech G203 Lightsync RGB",
    slug: "logitech-g203-lightsync-rgb",
    shortDescription: "Mouse gamer com sensor preciso, iluminação RGB e ótimo custo-benefício para setup competitivo.",
    fullDescription:
      "O Logitech G203 Lightsync RGB é indicado para quem procura um mouse gamer acessível, leve e confiável para jogos competitivos e uso diário. Ele combina boa precisão, design simples, iluminação personalizável e preço competitivo. As limitações ficam por conta do formato mais básico e da ausência de recursos avançados encontrados em modelos premium.",
    category: "Periféricos",
    department: "perifericos",
    image: "https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=900&q=80",
    ],
    oldPrice: 179.9,
    price: 129.9,
    installment: "10x de R$ 12,99",
    discountPercentage: 28,
    rating: 4.7,
    reviewsCount: 2841,
    clicks: 1320,
    affiliateOfferId: "00000000-0000-4000-8000-00000000g203",
    affiliateUrl: "https://www.amazon.com.br/",
    recommendationBadge: "Melhor custo-benefício",
    tags: ["mouse gamer", "rgb", "custo-benefício"],
    specs: {
      Sensor: "Óptico",
      DPI: "Até 8.000",
      Conexão: "USB",
      Iluminação: "RGB Lightsync",
      Peso: "85 g",
    },
    pros: ["bom custo-benefício", "boa avaliação", "sensor preciso para jogos"],
    cons: ["formato simples", "pode variar conforme a loja", "estoque sujeito a alteração"],
    videos: [],
    reviews: [
      {
        authorName: "Resumo editorial",
        rating: 4.7,
        body: "Boa opção de entrada para quem quer desempenho consistente sem pagar por recursos premium.",
        publishedAt: new Date().toISOString(),
        isVerifiedPurchase: false,
      },
    ],
    featured: true,
  },
];

function normalizeProduct(product: Product): Product {
  return {
    ...product,
    gallery: product.gallery?.length ? product.gallery : [product.image].filter(Boolean),
    tags: product.tags ?? [],
    specs: product.specs ?? {},
    pros: product.pros ?? [],
    cons: product.cons ?? [],
    videos: product.videos ?? [],
    reviews: product.reviews ?? [],
    oldPrice: Number(product.oldPrice ?? 0),
    price: Number(product.price ?? 0),
    discountPercentage: Number(product.discountPercentage ?? 0),
    rating: Number(product.rating ?? 0),
    reviewsCount: Number(product.reviewsCount ?? 0),
    clicks: Number(product.clicks ?? 0),
    recommendationBadge:
      product.recommendationBadge ??
      (Number(product.discountPercentage ?? 0) >= 20
        ? "Menor preço"
        : Number(product.clicks ?? 0) >= 1000
          ? "Mais acessado"
          : "Melhor custo-benefício"),
  };
}

function normalizeProducts(products: Product[]) {
  return products.map(normalizeProduct);
}

function getFallbackProducts(limit?: number) {
  return fallbackProducts.map(normalizeProduct).slice(0, limit ?? undefined);
}

export function getProductOfferPath(product: Product) {
  return `/oferta/${product.affiliateOfferId || product.id}`;
}

const storeTemplates = [
  { storeName: "Amazon", storeLogo: "AMZ", priceMultiplier: 1, oldPriceMultiplier: 1, shipping: "Frete grátis", installment: "10x de {installment}", offsetDays: 0 },
  { storeName: "Mercado Livre", storeLogo: "ML", priceMultiplier: 0.97, oldPriceMultiplier: 1.02, shipping: "Frete R$ 14,90", installment: "12x de {installment}", offsetDays: 1 },
  { storeName: "Shopee", storeLogo: "SHP", priceMultiplier: 0.94, oldPriceMultiplier: 1, shipping: "Frete grátis", installment: "6x de {installment}", offsetDays: 2 },
];

function formatInstallmentValue(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export function getProductOffers(product: Product): ProductOffer[] {
  const offers = storeTemplates.map((template, index) => {
    const price = Number((product.price * template.priceMultiplier).toFixed(2));
    const oldPrice = Number(((product.oldPrice || product.price * 1.18) * template.oldPriceMultiplier).toFixed(2));
    const portions = template.storeName === "Mercado Livre" ? 12 : template.storeName === "Shopee" ? 6 : 10;
    const storeSlug = template.storeName.toLowerCase().replace(/\s+/g, "-");
    const baseOfferId = index === 0 ? product.affiliateOfferId || product.id : `${product.id}__${storeSlug}`;
    return {
      id: baseOfferId,
      productId: product.id,
      storeName: template.storeName,
      storeLogo: template.storeLogo,
      price,
      oldPrice,
      installment: template.installment.replace("{installment}", formatInstallmentValue(price / portions)),
      shipping: template.shipping,
      availability: "Disponível",
      affiliateUrl: product.affiliateUrl,
      lastUpdated: new Date(Date.now() - template.offsetDays * 24 * 60 * 60 * 1000).toISOString(),
      isBestPrice: false,
    };
  });
  const bestPrice = Math.min(...offers.map((offer) => offer.price));
  return offers.map((offer) => ({ ...offer, isBestPrice: offer.price === bestPrice })).sort((a, b) => a.price - b.price);
}

export function getBestProductOffer(product: Product) {
  return getProductOffers(product)[0];
}

export function getEstimatedSavings(product: Product) {
  const bestOffer = getBestProductOffer(product);
  return Math.max(0, bestOffer.oldPrice - bestOffer.price);
}

export const comparisonTemplates: ProductComparison[] = [
  {
    id: "mouse-gamer-custo-beneficio",
    slug: "logitech-g203-vs-razer-deathadder",
    title: "Logitech G203 vs Razer DeathAdder",
    description: "Dois mouses gamer populares comparados por preço, pegada, sensor e custo-benefício.",
    productIds: [],
    recommendationSummary: "Logitech G203 tende a vencer em preço; DeathAdder faz mais sentido para quem prioriza ergonomia.",
  },
  {
    id: "teclado-mecanico-vs-membrana",
    slug: "teclado-mecanico-vs-teclado-membrana",
    title: "Teclado Mecânico vs Teclado Membrana",
    description: "Entenda qual tipo de teclado combina melhor com jogos, programação e uso diário.",
    productIds: [],
    recommendationSummary: "Mecânico é melhor para resposta e durabilidade; membrana costuma ganhar no silêncio e preço.",
  },
  {
    id: "monitor-144hz-vs-165hz",
    slug: "monitor-144hz-vs-165hz",
    title: "Monitor 144Hz vs 165Hz",
    description: "Compare fluidez, preço médio e vantagem real entre monitores de alta taxa de atualização.",
    productIds: [],
    recommendationSummary: "144Hz costuma ser o melhor custo-benefício; 165Hz vale quando a diferença de preço é pequena.",
  },
  {
    id: "notebook-i5-vs-ryzen-5",
    slug: "notebook-i5-vs-ryzen-5",
    title: "Notebook i5 vs Ryzen 5",
    description: "Comparação prática para estudo, trabalho, bateria e performance em notebooks intermediários.",
    productIds: [],
    recommendationSummary: "Ryzen 5 frequentemente entrega bom gráfico integrado; i5 pode ser melhor em modelos com boa refrigeração.",
  },
];

export async function getComparisons(): Promise<ProductComparison[]> {
  const products = await getTopProducts(6);
  return comparisonTemplates.map((comparison, index) => ({
    ...comparison,
    productIds: products.slice(index, index + 3).map((product) => product.id),
  }));
}

export async function getComparisonBySlug(slug: string): Promise<ProductComparison | null> {
  const comparisons = await getComparisons();
  return comparisons.find((comparison) => comparison.slug === slug) ?? null;
}

export async function getProducts(): Promise<Product[]> {
  const products = await supabaseSelect<Product>(
    "product_catalog",
    { select: "*", order: "featured.desc,clicks.desc,name.asc" },
    { revalidate: 60 }
  );
  return isSupabaseConfigured() ? normalizeProducts(products) : getFallbackProducts();
}

export async function getFeaturedProducts(limit = 8): Promise<Product[]> {
  const products = await supabaseSelect<Product>(
    "product_catalog",
    { select: "*", featured: "eq.true", order: "clicks.desc", limit },
    { revalidate: 60 }
  );
  if (products.length > 0) return normalizeProducts(products).slice(0, limit);
  if (isSupabaseConfigured()) return getTopProducts(limit);
  return getFallbackProducts(limit);
}

export async function getTopProducts(limit?: number): Promise<Product[]> {
  const query: Record<string, string | number> = { select: "*", order: "clicks.desc" };
  if (limit) query.limit = limit;
  const products = await supabaseSelect<Product>("product_catalog", query, { revalidate: 60 });
  return isSupabaseConfigured() ? normalizeProducts(products).slice(0, limit ?? undefined) : getFallbackProducts(limit);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const products = await supabaseSelect<Product>(
    "product_catalog",
    { select: "*", slug: `eq.${slug}`, limit: 1 },
    { revalidate: 60 }
  );
  const product = products[0] ?? (!isSupabaseConfigured() ? fallbackProducts.find((item) => item.slug === slug) : null);
  return product ? normalizeProduct(product) : null;
}

export async function getProductById(id: string): Promise<Product | null> {
  const products = await supabaseSelect<Product>(
    "product_catalog",
    { select: "*", id: `eq.${id}`, limit: 1 },
    { revalidate: 60 }
  );
  const product = products[0] ?? (!isSupabaseConfigured() ? fallbackProducts.find((item) => item.id === id) : null);
  return product ? normalizeProduct(product) : null;
}

export async function getProductsByDepartment(department: string): Promise<Product[]> {
  const products = await supabaseSelect<Product>(
    "product_catalog",
    { select: "*", department: `eq.${department}`, order: "clicks.desc,name.asc" },
    { revalidate: 60 }
  );
  const departmentFallback = fallbackProducts.filter((product) => product.department === department);
  return (products.length ? products : !isSupabaseConfigured() ? departmentFallback : []).map(normalizeProduct);
}

export async function getRelatedProductsForDetailPage(product: Product, limit = 4): Promise<Product[]> {
  const sameDepartment = await supabaseSelect<Product>(
    "product_catalog",
    { select: "*", department: `eq.${product.department}`, id: `neq.${product.id}`, order: "clicks.desc", limit },
    { revalidate: 60 }
  );
  if (sameDepartment.length > 0) return sameDepartment.map(normalizeProduct);

  const otherProducts = await supabaseSelect<Product>(
    "product_catalog",
    { select: "*", id: `neq.${product.id}`, order: "clicks.desc", limit },
    { revalidate: 60 }
  );
  if (otherProducts.length > 0) return otherProducts.map(normalizeProduct);

  return !isSupabaseConfigured()
    ? fallbackProducts.filter((item) => item.id !== product.id).slice(0, limit).map(normalizeProduct)
    : [];
}
