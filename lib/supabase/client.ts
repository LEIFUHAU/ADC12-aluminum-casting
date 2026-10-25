import { createClient } from '@supabase/supabase-js';

// 浏览器端：使用 anon key，仅用于登录/注册和受 RLS 保护的读取
const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

let browserClient: ReturnType<typeof createClient> | undefined;

export function getBrowserSupabase() {
  if (!browserClient) {
    browserClient = createClient(url, anonKey, {
      auth: { persistSession: true, autoRefreshToken: true },
    });
  }
  return browserClient;
}
