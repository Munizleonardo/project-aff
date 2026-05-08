import { ShieldCheck } from "lucide-react";

export function AffiliateDisclosure() {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-cyan-300/20 bg-cyan-300/10 p-4 text-sm text-cyan-50">
      <ShieldCheck className="mt-0.5 size-5 shrink-0 text-cyan-300" />
      <p>
        Podemos receber comissão por compras realizadas através deste link. A compra é finalizada diretamente no marketplace parceiro.
      </p>
    </div>
  );
}
