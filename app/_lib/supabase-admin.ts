type AdminQueryValue = string | number | boolean;

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "Parks@2026";

function getSupabaseKey() {
  return SUPABASE_SERVICE_ROLE_KEY || SUPABASE_ANON_KEY;
}

export function isAdminPasswordValid(password: string | null) {
  return Boolean(password && password === ADMIN_PASSWORD);
}

export function isSupabaseAdminConfigured() {
  return Boolean(SUPABASE_URL && getSupabaseKey() && !SUPABASE_URL.toLowerCase().includes("seu-projeto"));
}

function getHeaders(extra?: HeadersInit) {
  const key = getSupabaseKey();
  if (!key) throw new Error("Chave do Supabase nao configurada.");
  return {
    apikey: key,
    Authorization: `Bearer ${key}`,
    "Content-Type": "application/json",
    Accept: "application/json",
    ...extra,
  };
}

function getRestUrl(resource: string, query: Record<string, AdminQueryValue> = {}) {
  if (!SUPABASE_URL) throw new Error("URL do Supabase nao configurada.");
  const url = new URL(`/rest/v1/${resource}`, SUPABASE_URL);
  Object.entries(query).forEach(([key, value]) => url.searchParams.set(key, String(value)));
  return url;
}

async function readJsonResponse<T>(response: Response): Promise<T> {
  const text = await response.text();
  const payload = text ? JSON.parse(text) : null;
  if (!response.ok) {
    const message = payload?.message ?? payload?.msg ?? payload?.hint ?? "Operacao administrativa falhou.";
    throw new Error(message);
  }
  return payload as T;
}

export async function adminSelect<T>(resource: string, query: Record<string, AdminQueryValue> = {}) {
  if (!isSupabaseAdminConfigured()) return [] as T[];
  const response = await fetch(getRestUrl(resource, query), {
    headers: getHeaders(),
    cache: "no-store",
  });
  return readJsonResponse<T[]>(response);
}

export async function adminInsert<T>(resource: string, payload: unknown, prefer = "return=representation") {
  if (!isSupabaseAdminConfigured()) throw new Error("Supabase admin nao configurado.");
  const response = await fetch(getRestUrl(resource), {
    method: "POST",
    headers: getHeaders({ Prefer: prefer }),
    body: JSON.stringify(payload),
    cache: "no-store",
  });
  return readJsonResponse<T[]>(response);
}

export async function adminCount(resource: string, query: Record<string, AdminQueryValue> = {}) {
  if (!isSupabaseAdminConfigured()) return 0;
  const response = await fetch(getRestUrl(resource, { select: "id", ...query }), {
    method: "HEAD",
    headers: getHeaders({ Prefer: "count=exact" }),
    cache: "no-store",
  });
  if (!response.ok) return 0;
  const contentRange = response.headers.get("content-range");
  return Number(contentRange?.split("/")?.[1] ?? 0);
}
