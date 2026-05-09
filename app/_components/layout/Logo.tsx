import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  symbolOnly?: boolean;
  className?: string;
  withLink?: boolean;
};

export function Logo({ symbolOnly = false, className = "", withLink = true }: LogoProps) {
  const content = (
    <>
      <span className="logo-symbol relative flex size-9 items-center justify-center overflow-hidden rounded-full bg-[#020612] ring-1 ring-white/20 shadow-xl shadow-violet-900/40">
        <span className="relative block size-7">
          <Image
            src="/parkslogo.webp"
            alt="TechParks"
            fill
            sizes="28px"
            className="object-contain"
            priority
          />
        </span>
      </span>
      {symbolOnly ? null : (
        <span className="text-xl leading-none font-black tracking-tight">
          Tech<span className="text-cyan-400">Parks</span>
        </span>
      )}
    </>
  );

  if (!withLink) {
    return <span className={`flex items-center gap-2 text-white ${className}`}>{content}</span>;
  }

  return (
    <Link href="/" className={`flex items-center gap-2 text-white ${className}`}>
      {content}
    </Link>
  );
}
