"use client";

import Link from "next/link";
import { Box, Check } from "lucide-react";
import { Button } from "@/app/_components/ui/button";
import { useAuth } from "@/app/_components/auth/AuthProvider";

export function SaveToBoxButton({
  productId,
  className,
  compact = false,
}: {
  productId: string;
  className?: string;
  compact?: boolean;
}) {
  const { session, isProductSaved, toggleSavedProduct } = useAuth();
  const saved = isProductSaved(productId);

  if (!session) {
    return (
      <Button asChild variant="outline" className={className}>
        <Link href="/login">
          <Box className="size-4" />
          {compact ? "Salvar" : "Salvar na Minha Caixa"}
        </Link>
      </Button>
    );
  }

  return (
    <Button type="button" variant="outline" className={className} onClick={() => toggleSavedProduct(productId)}>
      {saved ? <Check className="size-4" /> : <Box className="size-4" />}
      {saved ? (compact ? "Salvo" : "Salvo na Minha Caixa") : compact ? "Salvar" : "Salvar na Minha Caixa"}
    </Button>
  );
}
