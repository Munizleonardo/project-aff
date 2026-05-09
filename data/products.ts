import { supabaseSelect } from "@/app/_lib/supabase-rest";

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
  affiliateUrl: string;
  tags: string[];
  specs: Record<string, string>;
  pros: string[];
  cons: string[];
  videos: ProductVideo[];
  reviews: ProductReview[];
  featured?: boolean;
};

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
  };
}

export async function getProducts(): Promise<Product[]> {
  const products = await supabaseSelect<Product>(
    "product_catalog",
    { select: "*", order: "featured.desc,clicks.desc,name.asc" },
    { revalidate: 60 }
  );
  return products.map(normalizeProduct);
}

export async function getFeaturedProducts(limit = 8): Promise<Product[]> {
  const products = await supabaseSelect<Product>(
    "product_catalog",
    { select: "*", featured: "eq.true", order: "clicks.desc", limit },
    { revalidate: 60 }
  );
  return products.map(normalizeProduct).slice(0, limit);
}

export async function getTopProducts(limit?: number): Promise<Product[]> {
  const query: Record<string, string | number> = { select: "*", order: "clicks.desc" };
  if (limit) query.limit = limit;
  const products = await supabaseSelect<Product>("product_catalog", query, { revalidate: 60 });
  return products.map(normalizeProduct);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const products = await supabaseSelect<Product>(
    "product_catalog",
    { select: "*", slug: `eq.${slug}`, limit: 1 },
    { revalidate: 60 }
  );
  return products[0] ? normalizeProduct(products[0]) : null;
}

export async function getProductById(id: string): Promise<Product | null> {
  const products = await supabaseSelect<Product>(
    "product_catalog",
    { select: "*", id: `eq.${id}`, limit: 1 },
    { revalidate: 60 }
  );
  return products[0] ? normalizeProduct(products[0]) : null;
}

export async function getProductsByDepartment(department: string): Promise<Product[]> {
  const products = await supabaseSelect<Product>(
    "product_catalog",
    { select: "*", department: `eq.${department}`, order: "clicks.desc,name.asc" },
    { revalidate: 60 }
  );
  return products.map(normalizeProduct);
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

  return [];
}
