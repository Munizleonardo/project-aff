import { redirect } from "next/navigation";
import { getProductById } from "@/app/_data/products";

type Props = { params: Promise<{ productId: string }> };

export default async function OfferRedirectPage({ params }: Props) {
  const { productId } = await params;
  const product = getProductById(productId);
  redirect(product?.affiliateUrl ?? "/ofertas");
}
