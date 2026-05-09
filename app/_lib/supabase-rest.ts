type SupabaseQueryValue = string | number | boolean;

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export function isSupabaseConfigured() {
  return Boolean(SUPABASE_URL && SUPABASE_ANON_KEY && !SUPABASE_URL.toLowerCase().includes("seu-projeto"));
}

export async function supabaseSelect<T>(
  resource: string,
  query: Record<string, SupabaseQueryValue> = {},
  options: { revalidate?: number } = {}
): Promise<T[]> {
  if (!isSupabaseConfigured()) return [];
  const supabaseUrl = SUPABASE_URL as string;
  const supabaseAnonKey = SUPABASE_ANON_KEY as string;

  const url = new URL(`/rest/v1/${resource}`, supabaseUrl);
  Object.entries(query).forEach(([key, value]) => {
    url.searchParams.set(key, String(value));
  });

  let response: Response;
  try {
    response = await fetch(url, {
      headers: {
        apikey: supabaseAnonKey,
        Authorization: `Bearer ${supabaseAnonKey}`,
        Accept: "application/json",
      },
      next: { revalidate: options.revalidate ?? 60 },
    });
  } catch {
    return [];
  }

  if (!response.ok) {
    return [];
  }

  return response.json() as Promise<T[]>;
}
