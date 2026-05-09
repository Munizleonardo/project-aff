import type { Metadata } from "next";
import { AuthProvider } from "@/app/_components/auth/AuthProvider";
import { CartProvider } from "@/app/_components/cart/CartProvider";
import "./globals.css";

const themeInitScript = `
  try {
    var savedTheme = window.localStorage.getItem("techparks-theme");
    document.documentElement.classList.toggle("light-mode", savedTheme === "light");
  } catch (_) {}
`;

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
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-slate-950 text-slate-50">
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <AuthProvider>
          <CartProvider>{children}</CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
