import { redirect } from "next/navigation";
import { getProductById } from "@/data/products";

type Props = { params: Promise<{ productId: string }> };

/** Rota técnica: envia ao link de afiliado do marketplace (ou volta para `/ofertas`). */
export default async function MarketplaceAffiliateOfferRedirect({ params }: Props) {
  const { productId } = await params;
  const product = await getProductById(productId);
  redirect(product?.affiliateUrl ?? "/ofertas");
}
