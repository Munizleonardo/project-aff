"use client";

import { ShoppingCart } from "lucide-react";
import { Button } from "@/app/_components/ui/button";
import { useCart } from "./CartProvider";

export function CartButton() {
  const { openCart, totalItems } = useCart();

  return (
    <Button type="button" variant="ghost" size="icon-lg" className="relative text-white hover:bg-white hover:text-slate-950" onClick={openCart} aria-label="Abrir carrinho">
      <ShoppingCart className="size-5" />
      <span className="keep-white-in-light absolute right-1 top-1 flex size-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-black text-white">
        {totalItems}
      </span>
    </Button>
  );
}
