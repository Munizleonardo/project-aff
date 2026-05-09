import type { Metadata } from "next";
import { ProfileView } from "@/app/_components/auth/ProfileView";
import { Footer } from "@/app/_components/layout/Footer";
import { Header } from "@/app/_components/layout/Header";

export const metadata: Metadata = {
  title: "Perfil",
  description: "Dados basicos da sua conta TechParks.",
  alternates: { canonical: "/perfil" },
};

export default function ProfilePage() {
  return (
    <>
      <Header />
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-5 px-4 py-10 md:py-12">
        <h1 className="text-3xl font-black text-white md:text-4xl">Perfil</h1>
        <ProfileView />
      </main>
      <Footer />
    </>
  );
}
