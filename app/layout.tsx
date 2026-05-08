import type { Metadata } from "next";
import { CartProvider } from "@/app/_components/CartProvider";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://techparks.example"),
  icons: {
    icon: "/parkslogo.webp",
    shortcut: "/parkslogo.webp",
    apple: "/parkslogo.webp",
  },
  title: {
    default: "TechParks | Ofertas tech, gadgets e setup",
    template: "%s | TechParks",
  },
  description:
    "Curadoria de produtos tech, gadgets, setup gamer, home office e casa inteligente com reviews, rankings e links seguros para marketplaces parceiros.",
  keywords: ["ofertas tecnologia", "gadgets", "setup gamer", "home office", "produtos inteligentes", "ofertas tech"],
  openGraph: {
    title: "TechParks",
    description: "Produtos tech selecionados para comparar, avaliar e comprar melhor.",
    url: "https://techparks.example",
    siteName: "TechParks",
    locale: "pt_BR",
    type: "website",
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col bg-slate-950 text-slate-50">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
