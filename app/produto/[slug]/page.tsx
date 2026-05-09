import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/app/_components/layout/Footer";
import { Header } from "@/app/_components/layout/Header";
import { ProductDetailPageView } from "@/app/_components/product/views/product-detail-page-view";
import { getProductBySlug, getRelatedProductsForDetailPage, products } from "@/data/products";
import { buildGoogleProductStructuredData } from "@/app/_lib/seo/build-product-json-ld";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Produto nao encontrado" };
  return {
    title: `${product.name} vale a pena? Review, preco e onde comprar`,
    description: `${product.name} com desconto: veja preco, avaliacao, pontos positivos, pontos de atencao e link seguro para marketplace parceiro.`,
    keywords: [product.name, `${product.name} vale a pena`, `review ${product.name}`, `${product.name} com desconto`, `onde comprar ${product.name}`],
    alternates: { canonical: `/produto/${product.slug}` },
    openGraph: { title: product.name, description: product.shortDescription, type: "website", images: [{ url: product.image }] },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const structuredDataPayload = buildGoogleProductStructuredData(product);
  const relatedProductsForPdpRail = getRelatedProductsForDetailPage(product);

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
