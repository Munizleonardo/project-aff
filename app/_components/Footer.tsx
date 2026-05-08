import Link from "next/link";
import { Logo } from "./Logo";

function SocialIcon({ type }: { type: "instagram" | "twitter" | "youtube" | "facebook" }) {
  const paths = {
    instagram: (
      <>
        <rect x="4" y="4" width="16" height="16" rx="5" />
        <circle cx="12" cy="12" r="3.2" />
        <path d="M16.8 7.2h.01" />
      </>
    ),
    twitter: <path d="M20 6.2c-.6.3-1.2.4-1.9.5.7-.4 1.2-1 1.4-1.8-.6.4-1.3.6-2.1.8A3.2 3.2 0 0 0 12 8.6c0 .3 0 .5.1.7A9.1 9.1 0 0 1 5.4 5.9a3.2 3.2 0 0 0 1 4.3c-.5 0-1-.2-1.5-.4 0 1.6 1.1 2.9 2.6 3.2-.3.1-.6.1-.9.1-.2 0-.4 0-.6-.1.4 1.4 1.7 2.4 3.2 2.4A6.5 6.5 0 0 1 4 16.9 9.1 9.1 0 0 0 9 18.4c6 0 9.3-5 9.3-9.3v-.4c.7-.5 1.2-1.1 1.7-1.8Z" />,
    youtube: (
      <>
        <rect x="3.8" y="6.8" width="16.4" height="10.4" rx="3" />
        <path d="m10.5 9.7 4.2 2.3-4.2 2.3V9.7Z" />
      </>
    ),
    facebook: <path d="M14 8.2h2V5h-2.4c-2.9 0-4.3 1.7-4.3 4.1v2H7v3.3h2.3V21h3.4v-6.6h2.6l.5-3.3h-3.1V9.5c0-.8.4-1.3 1.3-1.3Z" />,
  };

  return (
    <span className="flex size-9 items-center justify-center rounded-full border border-[#263449] text-[#91a8c7]">
      <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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
  ["Termos de uso", "/termos-de-uso"],
  ["Política de privacidade", "/politica-de-privacidade"],
];

export function Footer() {
  return (
    <footer className="border-t border-[#1b2638] bg-[#080f1d] text-[#9db7d5]">
      <div className="mx-auto grid max-w-[1232px] gap-10 px-4 py-12 md:grid-cols-[1.25fr_1fr_1.25fr_1.35fr] md:gap-20">
        <div className="flex flex-col items-start gap-5">
          <Logo />
          <p className="max-w-[265px] text-sm leading-6">
            Curadoria inteligente dos melhores produtos de tecnologia, com comparativos, reviews e ofertas reais.
          </p>
          <div className="flex gap-2">
            <SocialIcon type="instagram" />
            <SocialIcon type="twitter" />
            <SocialIcon type="youtube" />
            <SocialIcon type="facebook" />
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

        <div className="flex flex-col gap-4">
          <h2 className="text-xs font-normal uppercase tracking-wide text-white" style={{ fontFamily: '"Roboto Mono", "SFMono-Regular", Consolas, monospace' }}>Aviso de comissão</h2>
          <p className="max-w-[310px] text-xs leading-6 text-[#9db7d5]">
            Este site pode receber comissão por compras realizadas através dos links divulgados. A compra é finalizada diretamente no marketplace parceiro de forma segura, sem custo adicional para você.
          </p>
        </div>
      </div>

      <div className="border-t border-[#1b2638]">
        <div className="mx-auto flex max-w-[1232px] flex-col gap-3 px-4 py-5 text-xs text-[#8fb0d2] md:flex-row md:items-center md:justify-between">
          <span>© 2026 TechParks. Todos os direitos reservados.</span>
          <span>Feito com 💙 para apaixonados por tech.</span>
        </div>
      </div>
    </footer>
  );
}
