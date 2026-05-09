"use client";

import { ShoppingCart } from "lucide-react";
import { Button } from "@/app/_components/ui/button";
import { useCart } from "./CartProvider";

export function AddToCartButton({
  productId,
  className,
  label = "Adicionar ao carrinho",
}: {
  productId: string;
  className?: string;
  label?: string;
}) {
  const { addItem } = useCart();

  return (
    <Button type="button" variant="outline" className={className} onClick={() => addItem(productId)}>
      <ShoppingCart className="size-4" />
      {label}
    </Button>
  );
}
