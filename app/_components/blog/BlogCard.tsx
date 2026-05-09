import Link from "next/link";
import { Clock } from "lucide-react";
import { Card, CardContent } from "@/app/_components/ui/card";
import { BlogPost } from "@/data/blog-posts";

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Card className="overflow-hidden rounded-xl border-white/10 bg-white/[0.04] transition hover:-translate-y-1 hover:border-cyan-300/40">
      <Link href={`/blog/${post.slug}`} className="block aspect-[16/10] overflow-hidden">
        <img src={post.image} alt={post.title} className="size-full object-cover transition duration-500 hover:scale-105" />
      </Link>
      <CardContent className="flex flex-col gap-3 p-5">
        <span className="text-xs font-black uppercase tracking-[0.18em] text-cyan-200">{post.category}</span>
        <Link href={`/blog/${post.slug}`} className="text-xl font-black leading-tight text-white hover:text-cyan-200">{post.title}</Link>
        <p className="text-sm leading-6 text-slate-300">{post.excerpt}</p>
        <span className="flex items-center gap-2 text-xs font-semibold text-slate-400"><Clock className="size-4" />{post.readingTime}</span>
      </CardContent>
    </Card>
  );
}
