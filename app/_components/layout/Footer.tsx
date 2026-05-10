import Link from "next/link";
import { Logo } from "./Logo";

function SocialIcon({ type }: { type: "instagram" }) {
  const paths = {
    instagram: (
      <>
        <rect x="4" y="4" width="16" height="16" rx="5" />
        <circle cx="12" cy="12" r="3.2" />
        <path d="M16.8 7.2h.01" />
      </>
    )};

  return (
    <span className="flex size-10 items-center justify-center rounded-full border border-[#263449] text-[#91a8c7] transition hover:border-cyan-400/50 hover:text-cyan-200">
      <svg viewBox="0 0 24 24" className="size-[1.125rem]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {paths[type]}
      </svg>
    </span>
  );
}

const departmentLinks = [
  ["Setup Gamer", "/categoria/setup-gamer"],
  ["Home Office", "/categoria/home-office"],
  ["Periféricos", "/categoria/perifericos"],
  ["Monitores", "/categoria/monitores"],
  ["Notebooks", "/categoria/notebooks"],
  ["Smartphones", "/categoria/smartphones"],
];

const institutionalLinks = [
  ["Departamentos", "/departamentos"],
  ["Ofertas", "/ofertas"],
  ["Comparativos", "/comparativos"],
  ["Blog", "/blog"],
  ["Termos e condições", "/termos-e-condicoes"],
  ["Termos de uso", "/termos-de-uso"],
  ["Política de privacidade", "/politica-de-privacidade"],
];

export function Footer() {
  return (
    <footer className="site-footer border-t border-[#1b2638] bg-[#080f1d] text-[#9db7d5]">
      <div className="mx-auto grid max-w-[1232px] gap-10 px-4 py-10 sm:grid-cols-2 sm:gap-x-10 md:grid-cols-4 md:gap-x-8 md:gap-y-10 md:py-12 lg:gap-x-12">
        <div className="flex flex-col items-start gap-5">
          <Logo />
          <p className="footer-lead max-w-[280px] text-sm leading-7 text-[#b1c6dd]">
            Plataforma de comparação e curadoria para analisar produtos tech antes de escolher o marketplace.
          </p>
          <div className=" cursor-pointer flex gap-2">
            <SocialIcon type="instagram" />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-xs font-normal uppercase tracking-wide text-white" style={{ fontFamily: '"Roboto Mono", "SFMono-Regular", Consolas, monospace' }}>Departamentos</h2>
          <nav className="flex flex-col gap-3">
            {departmentLinks.map(([label, href]) => (
              <Link key={href} href={href} className="text-sm leading-5 text-[#9db7d5] hover:text-cyan-300">
                {label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-xs font-normal uppercase tracking-wide text-white" style={{ fontFamily: '"Roboto Mono", "SFMono-Regular", Consolas, monospace' }}>Institucional</h2>
          <nav className="flex flex-col gap-3">
            {institutionalLinks.map(([label, href]) => (
              <Link key={href} href={href} className="text-sm leading-5 text-[#9db7d5] hover:text-cyan-300">
                {label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-col gap-4 sm:col-span-2 md:col-span-1">
          <h2 className="text-xs font-normal uppercase tracking-wide text-white" style={{ fontFamily: '"Roboto Mono", "SFMono-Regular", Consolas, monospace' }}>Aviso de comissão</h2>
          <p className="max-w-[310px] text-xs leading-6 text-[#9db7d5]">
            Podemos receber comissão quando você acessa uma oferta através dos nossos links. Isso não altera o preço final para você.
          </p>
        </div>
      </div>

      <div className="border-t border-[#1b2638]/80">
        <div className="mx-auto flex max-w-[1232px] flex-col gap-3 px-4 py-5 text-center text-xs text-[#8fb0d2] md:flex-row md:items-center md:justify-between md:text-left">
          <span>© 2026 TechParks. Todos os direitos reservados.</span>
          <span>Feito com carinho para apaixonados por tech.</span>
        </div>
      </div>
    </footer>
  );
}
