import { createClient, type SupabaseClient } from '@supabase/supabase-js';

// 服务端：使用 service role key，仅用于 Next.js API Route，严禁暴露到浏览器
let serviceClient: SupabaseClient | undefined;

export function getServiceSupabase(): SupabaseClient {
  if (!serviceClient) {
    serviceClient = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { persistSession: false } }
    );
  }
  return serviceClient;
}

// 校验请求头里的 JWT，返回当前登录用户的 profile（含 role），失败返回 null
export async function authorizeAdminOrSales(req: Request) {
  const auth = req.headers.get('authorization')?.replace('Bearer ', '');
  if (!auth) return null;

  const supabase = getServiceSupabase();
  const { data: userData, error } = await supabase.auth.getUser(auth);
  if (error || !userData.user) return null;

  const { data: profile } = await supabase
    .from('profiles')
    .select('id, full_name, role, phone')
    .eq('id', userData.user.id)
    .single();

  if (!profile) return null;
  return { user: userData.user, profile };
}
