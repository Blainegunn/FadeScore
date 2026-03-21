import { createClient, SupabaseClient } from "@supabase/supabase-js";

let _client: SupabaseClient | null = null;

export function createSupabaseAdmin(): SupabaseClient {
  if (_client) return _client;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    // Return a dummy client that will fail gracefully during build
    // This allows Next.js to compile and generate static pages
    // without Supabase credentials
    return createClient(
      "https://placeholder.supabase.co",
      "placeholder-key"
    );
  }

  _client = createClient(url, key);
  return _client;
}
