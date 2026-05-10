import type { Metadata } from "next";
import { AuthProvider } from "@/app/_components/auth/AuthProvider";
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
    default: "TechParks | Comparador tech, análises e ofertas",
    template: "%s | TechParks",
  },
  description:
    "Compare produtos tech, avaliações, preços e ofertas de marketplaces parceiros antes de decidir onde comprar.",
  keywords: ["comparar preço tecnologia", "melhor preço tech", "comparativos tech", "produtos custo-benefício", "ofertas marketplace"],
  openGraph: {
    title: "TechParks",
    description: "Plataforma de comparação, curadoria e análise de produtos tech afiliados.",
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
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
