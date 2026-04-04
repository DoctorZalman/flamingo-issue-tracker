import { createClient } from "@supabase/supabase-js";

// Supabase client used exclusively for Realtime subscriptions
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
