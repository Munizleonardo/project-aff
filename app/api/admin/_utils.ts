import { NextResponse } from "next/server";
import { isAdminPasswordValid } from "@/app/_lib/supabase-admin";

export function requireAdmin(request: Request) {
  const password = request.headers.get("x-admin-password");
  if (!isAdminPasswordValid(password)) {
    return NextResponse.json({ error: "Senha administrativa inválida." }, { status: 401 });
  }
  return null;
}
