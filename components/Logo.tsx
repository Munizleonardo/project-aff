import Link from "next/link";
import { Zap } from "lucide-react";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 text-white">
      <span className="flex size-9 items-center justify-center rounded-full bg-gradient-to-br from-violet-700 via-blue-600 to-cyan-400 text-white shadow-xl shadow-violet-900/40">
        <Zap className="size-5 fill-white" />
      </span>
      <span className="text-xl font-black tracking-tight leading-none">
        Tech<span className="text-cyan-400">Parks</span>
      </span>
    </Link>
  );
}
