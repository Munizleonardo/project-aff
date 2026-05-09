"use client";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const SESSION_STORAGE_KEY = "techparks-supabase-session";

export type SupabaseAuthUser = {
  id: string;
  email?: string;
  user_metadata?: {
    full_name?: string;
    phone?: string;
  };
};

export type SupabaseSession = {
  access_token: string;
  refresh_token: string;
  expires_at?: number;
  user: SupabaseAuthUser;
};

export type UserProfile = {
  id: string;
  user_id: string;
  full_name: string;
  email: string;
  phone: string | null;
  accepted_terms: boolean;
  accepted_terms_at: string | null;
  accepted_terms_version: string | null;
  created_at: string;
  updated_at: string;
};

function getAuthUrl(path: string) {
  if (!SUPABASE_URL) throw new Error("Supabase URL nao configurada.");
  return new URL(`/auth/v1/${path}`, SUPABASE_URL);
}

function getRestUrl(resource: string) {
  if (!SUPABASE_URL) throw new Error("Supabase URL nao configurada.");
  return new URL(`/rest/v1/${resource}`, SUPABASE_URL);
}

function getHeaders(accessToken?: string) {
  if (!SUPABASE_ANON_KEY) throw new Error("Supabase anon key nao configurada.");
  return {
    apikey: SUPABASE_ANON_KEY,
    Authorization: `Bearer ${accessToken ?? SUPABASE_ANON_KEY}`,
    "Content-Type": "application/json",
    Accept: "application/json",
  };
}

async function readJsonResponse<T>(response: Response): Promise<T> {
  const text = await response.text();
  const payload = text ? JSON.parse(text) : null;
  if (!response.ok) {
    const message = payload?.msg ?? payload?.message ?? payload?.error_description ?? "Nao foi possivel concluir a operacao.";
    throw new Error(message);
  }
  return payload as T;
}

export function isSupabaseBrowserAuthConfigured() {
  return Boolean(SUPABASE_URL && SUPABASE_ANON_KEY && !SUPABASE_URL.toLowerCase().includes("seu-projeto"));
}

export function getStoredSession(): SupabaseSession | null {
  if (typeof window === "undefined") return null;
  const stored = window.localStorage.getItem(SESSION_STORAGE_KEY);
  if (!stored) return null;
  try {
    return JSON.parse(stored) as SupabaseSession;
  } catch {
    window.localStorage.removeItem(SESSION_STORAGE_KEY);
    return null;
  }
}

export function storeSession(session: SupabaseSession | null) {
  if (typeof window === "undefined") return;
  if (!session) {
    window.localStorage.removeItem(SESSION_STORAGE_KEY);
    return;
  }
  window.localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
}

export async function signUpWithEmailPassword(input: {
  fullName: string;
  email: string;
  phone?: string;
  password: string;
  acceptedTerms: boolean;
}) {
  const response = await fetch(getAuthUrl("signup"), {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({
      email: input.email,
      password: input.password,
      data: {
        full_name: input.fullName,
        phone: input.phone ?? "",
        accepted_terms: input.acceptedTerms,
        accepted_terms_version: "2026-05-09",
      },
    }),
  });
  return readJsonResponse<SupabaseSession>(response);
}

export async function signInWithEmailPassword(email: string, password: string) {
  const url = getAuthUrl("token");
  url.searchParams.set("grant_type", "password");
  const response = await fetch(url, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ email, password }),
  });
  return readJsonResponse<SupabaseSession>(response);
}

export async function signOut(accessToken: string) {
  const response = await fetch(getAuthUrl("logout"), {
    method: "POST",
    headers: getHeaders(accessToken),
  });
  if (!response.ok) throw new Error("Nao foi possivel sair da conta.");
}

export async function getCurrentUser(accessToken: string) {
  const response = await fetch(getAuthUrl("user"), {
    headers: getHeaders(accessToken),
  });
  return readJsonResponse<SupabaseAuthUser>(response);
}

export async function getMyProfile(accessToken: string) {
  const url = getRestUrl("profiles");
  url.searchParams.set("select", "*");
  url.searchParams.set("limit", "1");
  const response = await fetch(url, {
    headers: getHeaders(accessToken),
  });
  const profiles = await readJsonResponse<UserProfile[]>(response);
  return profiles[0] ?? null;
}

export async function upsertMyProfile(accessToken: string, profile: {
  userId: string;
  fullName: string;
  email: string;
  phone?: string;
  acceptedTerms?: boolean;
}) {
  const url = getRestUrl("profiles");
  url.searchParams.set("on_conflict", "user_id");
  const response = await fetch(url, {
    method: "POST",
    headers: {
      ...getHeaders(accessToken),
      Prefer: "resolution=merge-duplicates,return=representation",
    },
    body: JSON.stringify({
      user_id: profile.userId,
      full_name: profile.fullName,
      email: profile.email,
      phone: profile.phone ?? null,
      accepted_terms: profile.acceptedTerms ?? true,
      accepted_terms_at: profile.acceptedTerms ? new Date().toISOString() : null,
      accepted_terms_version: "2026-05-09",
    }),
  });
  const profiles = await readJsonResponse<UserProfile[]>(response);
  return profiles[0] ?? null;
}

export async function getSavedProductIds(accessToken: string) {
  const url = getRestUrl("user_saved_products");
  url.searchParams.set("select", "product_id");
  const response = await fetch(url, {
    headers: getHeaders(accessToken),
  });
  const rows = await readJsonResponse<Array<{ product_id: string }>>(response);
  return rows.map((row) => row.product_id);
}

export async function saveProductToBox(accessToken: string, userId: string, productId: string) {
  const response = await fetch(getRestUrl("user_saved_products"), {
    method: "POST",
    headers: {
      ...getHeaders(accessToken),
      Prefer: "resolution=ignore-duplicates",
    },
    body: JSON.stringify({ user_id: userId, product_id: productId }),
  });
  if (!response.ok && response.status !== 409) await readJsonResponse(response);
}

export async function removeProductFromBox(accessToken: string, productId: string) {
  const url = getRestUrl("user_saved_products");
  url.searchParams.set("product_id", `eq.${productId}`);
  const response = await fetch(url, {
    method: "DELETE",
    headers: getHeaders(accessToken),
  });
  if (!response.ok) await readJsonResponse(response);
}
