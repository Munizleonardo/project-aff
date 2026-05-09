import type { Metadata } from "next";
import { AdminPanel } from "@/app/_components/admin/AdminPanel";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return (
    <main className="min-h-dvh bg-slate-950 py-8 text-white">
      <AdminPanel />
    </main>
  );
}
