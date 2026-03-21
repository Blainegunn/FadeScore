import { createClient, SupabaseClient } from "@supabase/supabase-js";

let _client: SupabaseClient | null = null;

export function createSupabaseAdmin(): SupabaseClient {
  // NEXT_PUBLIC_ vars are inlined at build time. Use SUPABASE_URL as runtime fallback.
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    // Return a dummy client that will fail gracefully during build.
    // Do NOT cache this — at runtime the real env vars will be available.
    return createClient(
      "https://placeholder.supabase.co",
      "placeholder-key"
    );
  }

  if (!_client) {
    _client = createClient(url, key);
  }
  return _client;
}
