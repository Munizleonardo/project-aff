import { ArrowRight, Bell } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function CTASection() {
  return (
    <section className="mx-auto w-full max-w-[1120px] rounded-[18px] bg-[linear-gradient(105deg,#3846c8_0%,#5b00a8_42%,#047db5_100%)] px-5 py-7 shadow-2xl shadow-black/30 md:rounded-[22px] md:px-11 md:py-11">
      <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex max-w-[520px] flex-col items-start gap-4">
          <Badge className="flex items-center gap-2 rounded-full border border-white/20 bg-white/15 px-3 py-1.5 text-xs font-bold text-white shadow-sm">
            <Bell className="size-3.5" />
            Newsletter semanal
          </Badge>
          <div className="flex flex-col gap-3">
            <h2 className="text-2xl font-black leading-tight tracking-tight text-white sm:text-3xl md:text-4xl">
              Receba as melhores ofertas tech direto no seu e-mail
            </h2>
            <p className="text-base font-medium text-white/90">
              Curadoria semanal com produtos selecionados e descontos imperdíveis.
            </p>
          </div>
        </div>

        <form className="flex w-full flex-col gap-3 sm:flex-row lg:max-w-[510px]">
          <Input
            type="email"
            placeholder="seu@email.com"
            aria-label="Seu e-mail"
            className="h-12 min-w-0 flex-1 rounded-2xl border border-white/20 bg-white/15 px-4 text-sm font-semibold text-white outline-none placeholder:text-white/55 focus:border-white/50"
          />
          <Button className="h-12 rounded-2xl bg-white px-6 text-sm font-bold text-[#178cff] hover:bg-slate-100">
            Inscrever <ArrowRight className="size-4" />
          </Button>
        </form>
      </div>
    </section>
  );
}
