"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/app/_components/ui/button";
import { ProductGrid } from "@/app/_components/product/ProductGrid";
import { useAuth } from "@/app/_components/auth/AuthProvider";
import type { Product } from "@/data/products";

export function MyBoxView() {
  const { session, savedProductIds, isLoading } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("/api/products")
      .then((response) => response.ok ? response.json() as Promise<Product[]> : [])
      .then(setProducts)
      .catch(() => setProducts([]));
  }, []);

  const savedProducts = useMemo(() => {
    const savedSet = new Set(savedProductIds);
    return products.filter((product) => savedSet.has(product.id));
  }, [products, savedProductIds]);

  if (isLoading) {
    return <p className="text-slate-300">Carregando Minha Caixa...</p>;
  }

  if (!session) {
    return (
      <div className="rounded-xl border border-white/10 bg-white/[0.04] p-5">
        <p className="text-slate-300">Entre na sua conta para ver os produtos salvos.</p>
        <Button asChild className="mt-4 h-11 bg-cyan-400 font-black text-slate-950 hover:bg-cyan-300">
          <Link href="/login">Entrar</Link>
        </Button>
      </div>
    );
  }

  if (savedProducts.length === 0) {
    return (
      <div className="rounded-xl border border-white/10 bg-white/[0.04] p-5">
        <p className="text-slate-300">Sua Caixa ainda esta vazia. Salve produtos para comparar e acessar depois.</p>
        <Button asChild className="mt-4 h-11 bg-cyan-400 font-black text-slate-950 hover:bg-cyan-300">
          <Link href="/ofertas">Ver ofertas</Link>
        </Button>
      </div>
    );
  }

  return <ProductGrid products={savedProducts} />;
}
