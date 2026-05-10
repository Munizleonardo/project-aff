import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { adminInsert, adminSelect, adminUpdate } from "@/app/_lib/supabase-admin";
import { getProductById } from "@/data/products";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ offerId: string }> };

type AffiliateOffer = {
  id: string;
  product_id: string;
  affiliate_url: string;
  is_active: boolean;
  starts_at: string | null;
  ends_at: string | null;
};

type ProductClickCountRow = {
  clicks_count: number;
};

function isOfferAvailable(offer: AffiliateOffer) {
  const now = Date.now();
  const startsAt = offer.starts_at ? new Date(offer.starts_at).getTime() : null;
  const endsAt = offer.ends_at ? new Date(offer.ends_at).getTime() : null;
  return offer.is_active && (!startsAt || startsAt <= now) && (!endsAt || endsAt >= now);
}

function redirectTo(request: NextRequest, destination: string) {
  const url = destination.startsWith("/") ? new URL(destination, request.url) : destination;
  return NextResponse.redirect(url);
}

async function getAffiliateOfferById(offerId: string) {
  try {
    const offers = await adminSelect<AffiliateOffer>("affiliate_offers", {
      select: "id,product_id,affiliate_url,is_active,starts_at,ends_at",
      id: `eq.${offerId}`,
      limit: 1,
    });
    const offer = offers[0];
    return offer && isOfferAvailable(offer) ? offer : null;
  } catch {
    return null;
  }
}

async function incrementProductClicks(productId: string) {
  const products = await adminSelect<ProductClickCountRow>("products", {
    select: "clicks_count",
    id: `eq.${productId}`,
    limit: 1,
  });
  const currentClicks = Number(products[0]?.clicks_count ?? 0);
  await adminUpdate("products", { id: `eq.${productId}` }, { clicks_count: currentClicks + 1 }, "return=minimal");
}

async function registerClick(request: NextRequest, productId: string, affiliateOfferId: string | null) {
  try {
    await adminInsert(
      "click_events",
      {
        product_id: productId,
        affiliate_offer_id: affiliateOfferId,
        source: request.headers.get("referer") ?? "site",
        user_agent: request.headers.get("user-agent"),
      },
      "return=minimal"
    );
    await incrementProductClicks(productId);
  } catch {
    // O redirect para o marketplace nao deve falhar por causa do tracking.
  }
}

export async function GET(request: NextRequest, { params }: Props) {
  const { offerId } = await params;
  const offer = await getAffiliateOfferById(offerId);
  if (offer) {
    await registerClick(request, offer.product_id, offer.id);
    return redirectTo(request, offer.affiliate_url);
  }

  const syntheticProductId = offerId.includes("__") ? offerId.split("__")[0] : offerId;
  const product = await getProductById(syntheticProductId);
  if (product?.affiliateUrl) {
    await registerClick(request, product.id, product.affiliateOfferId ?? null);
    return redirectTo(request, product.affiliateUrl);
  }

  return redirectTo(request, "/ofertas");
}
