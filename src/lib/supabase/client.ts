import { createBrowserClient } from "@supabase/ssr";

// Supabase connection used in the browser (login, dashboard). Uses only the public key;
// what each person may see or change is enforced by row-level security in the database.
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
