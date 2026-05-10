import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/app/_components/layout/Footer";
import { Header } from "@/app/_components/layout/Header";
import { ProductDetailPageView } from "@/app/_components/product/views/product-detail-page-view";
import { getProductBySlug, getProducts, getRelatedProductsForDetailPage } from "@/data/products";
import { buildGoogleProductStructuredData } from "@/app/_lib/seo/build-product-json-ld";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Produto não encontrado" };
  return {
    title: `${product.name} vale a pena? Compare preço, avaliação e ofertas`,
    description: `Compare preço de ${product.name}, veja se vale a pena, avaliações, vantagens, desvantagens e ofertas em marketplaces parceiros.`,
    keywords: [
      product.name,
      `comparar preço de ${product.name}`,
      `${product.name} vale a pena`,
      `melhor preço ${product.name}`,
      `${product.name} Amazon ou Mercado Livre`,
      `melhor ${product.category} custo-benefício`,
    ],
    alternates: { canonical: `/produto/${product.slug}` },
    openGraph: {
      title: `${product.name} vale a pena?`,
      description: product.shortDescription,
      type: "website",
      images: [{ url: product.image }],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const structuredDataPayload = buildGoogleProductStructuredData(product);
  const relatedProductsForPdpRail = await getRelatedProductsForDetailPage(product);

  return (
    <>
      <Header />
      <main className="bg-slate-950">
        <ProductDetailPageView
          product={product}
          relatedProducts={relatedProductsForPdpRail}
          productStructuredDataJson={JSON.stringify(structuredDataPayload)}
        />
      </main>
      <Footer />
    </>
  );
}
