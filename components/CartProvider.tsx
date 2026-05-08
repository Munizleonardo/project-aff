"use client";

import { createContext, useContext, useMemo, useState } from "react";
import Link from "next/link";
import { Minus, Plus, ShoppingCart, Trash2, X } from "lucide-react";
import { products } from "@/data/products";
import { formatCurrency } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sheet, SheetContent, SheetDescription, SheetTitle } from "@/components/ui/sheet";

type CartItem = {
  productId: string;
  quantity: number;
};

type CartContextValue = {
  addItem: (productId: string) => void;
  decrementItem: (productId: string) => void;
  removeItem: (productId: string) => void;
  openCart: () => void;
  closeCart: () => void;
  totalItems: number;
};

const CartContext = createContext<CartContextValue | null>(null);
const storageKey = "techparks-cart";

function readInitialCart() {
  if (typeof window === "undefined") return [];
  try {
    const stored = window.localStorage.getItem(storageKey);
    return stored ? (JSON.parse(stored) as CartItem[]) : [];
  } catch {
    return [];
  }
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(readInitialCart);
  const [isOpen, setIsOpen] = useState(false);

  function persist(nextItems: CartItem[]) {
    setItems(nextItems);
    window.localStorage.setItem(storageKey, JSON.stringify(nextItems));
  }

  function addItem(productId: string) {
    const existing = items.find((item) => item.productId === productId);
    const nextItems = existing
      ? items.map((item) => item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item)
      : [...items, { productId, quantity: 1 }];
    persist(nextItems);
  }

  function decrementItem(productId: string) {
    const nextItems = items
      .map((item) => item.productId === productId ? { ...item, quantity: item.quantity - 1 } : item)
      .filter((item) => item.quantity > 0);
    persist(nextItems);
  }

  function removeItem(productId: string) {
    persist(items.filter((item) => item.productId !== productId));
  }

  const cartProducts = useMemo(() => {
    return items
      .map((item) => {
        const product = products.find((candidate) => candidate.id === item.productId);
        return product ? { ...item, product } : null;
      })
      .filter(Boolean) as Array<CartItem & { product: (typeof products)[number] }>;
  }, [items]);

  const totalItems = cartProducts.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartProducts.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const savings = cartProducts.reduce((sum, item) => sum + (item.product.oldPrice - item.product.price) * item.quantity, 0);

  return (
    <CartContext.Provider value={{ addItem, decrementItem, removeItem, openCart: () => setIsOpen(true), closeCart: () => setIsOpen(false), totalItems }}>
      {children}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent>
        <div className="flex items-center justify-between border-b border-slate-800 p-5">
          <div className="flex items-center gap-3">
            <span className="flex size-11 items-center justify-center rounded-xl bg-[#38aefb] text-slate-950">
              <ShoppingCart className="size-5" />
            </span>
            <div>
              <SheetTitle className="text-xl font-black text-white">Carrinho</SheetTitle>
              <SheetDescription className="text-sm text-sky-100/60">{totalItems} produto{totalItems === 1 ? "" : "s"} selecionado{totalItems === 1 ? "" : "s"}</SheetDescription>
            </div>
          </div>
          <Button variant="ghost" size="icon-lg" className="text-white hover:bg-white/5" onClick={() => setIsOpen(false)}>
            <X className="size-5" />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          {cartProducts.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
              <span className="flex size-16 items-center justify-center rounded-2xl border border-slate-800 text-sky-100/70">
                <ShoppingCart className="size-8" />
              </span>
              <div>
                <h3 className="text-lg font-black text-white">Seu carrinho está vazio</h3>
                <p className="mt-2 text-sm leading-6 text-sky-100/60">Adicione produtos para comparar valores e acessar as ofertas depois.</p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {cartProducts.map(({ product, quantity }) => (
                <Card key={product.id} className="rounded-2xl border-slate-800 bg-[#081223] p-3">
                  <div className="flex gap-3">
                    <img src={product.image} alt={product.name} className="size-20 rounded-xl object-cover" />
                    <div className="min-w-0 flex-1">
                      <Link href={`/produto/${product.slug}`} className="line-clamp-2 text-sm font-black text-white hover:text-cyan-300" onClick={() => setIsOpen(false)}>
                        {product.name}
                      </Link>
                      <p className="mt-1 text-xs text-sky-100/60">{product.category}</p>
                      <div className="mt-2">
                        <span className="text-xs text-slate-500 line-through">{formatCurrency(product.oldPrice)}</span>
                        <strong className="ml-2 text-base text-white">{formatCurrency(product.price)}</strong>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon-sm" className="button-clear-hover self-start rounded-lg p-2 text-sky-100/50 hover:bg-white hover:text-red-500" onClick={() => removeItem(product.id)} aria-label={`Remover ${product.name}`}>
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                  <div className="mt-3 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 rounded-full border border-slate-700 p-1">
                      <Button variant="ghost" size="icon-sm" className="button-clear-hover size-7 rounded-full text-white hover:bg-white hover:text-slate-950" onClick={() => decrementItem(product.id)} aria-label="Diminuir quantidade">
                        <Minus className="size-3.5" />
                      </Button>
                      <span className="w-6 text-center text-sm font-black text-white">{quantity}</span>
                      <Button variant="ghost" size="icon-sm" className="button-clear-hover size-7 rounded-full text-white hover:bg-white hover:text-slate-950" onClick={() => addItem(product.id)} aria-label="Aumentar quantidade">
                        <Plus className="size-3.5" />
                      </Button>
                    </div>
                    <strong className="text-sm text-cyan-300">{formatCurrency(product.price * quantity)}</strong>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        <div className="border-t border-slate-800 p-5">
          <div className="flex flex-col gap-2 text-sm">
            <div className="flex justify-between text-sky-100/65"><span>Subtotal</span><strong>{formatCurrency(subtotal)}</strong></div>
            <div className="flex justify-between text-emerald-400"><span>Economia estimada</span><strong>{formatCurrency(savings)}</strong></div>
            <div className="mt-2 flex justify-between text-lg font-black text-white"><span>Total</span><strong>{formatCurrency(subtotal)}</strong></div>
          </div>
          <Button asChild className="mt-5 h-12 w-full rounded-full bg-[#38aefb] font-black text-slate-950 hover:bg-cyan-300" disabled={cartProducts.length === 0}>
            <Link href="/ofertas" onClick={() => setIsOpen(false)}>Continuar vendo ofertas</Link>
          </Button>
          <p className="mt-3 text-center text-xs leading-5 text-sky-100/50">A compra é finalizada no marketplace parceiro. O carrinho ajuda a organizar sua seleção.</p>
        </div>
      </SheetContent>
      </Sheet>
    </CartContext.Provider>
  );
}
