import { NextResponse } from 'next/server';
import { getServiceSupabase, authorizeAdminOrSales } from '@/lib/supabase/server';

export const runtime = 'nodejs';

// 列出所有成员（仅 admin）
export async function GET(req: Request) {
  const auth = await authorizeAdminOrSales(req);
  if (!auth || auth.profile.role !== 'admin') {
    return NextResponse.json({ error: '无权限' }, { status: 403 });
  }
  const supabase = getServiceSupabase();
  const { data, error } = await supabase
    .from('profiles')
    .select('id, full_name, role, phone, created_at')
    .order('created_at');
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ users: data });
}

// 创建销售账号（仅 admin）
export async function POST(req: Request) {
  const auth = await authorizeAdminOrSales(req);
  if (!auth || auth.profile.role !== 'admin') {
    return NextResponse.json({ error: '无权限' }, { status: 403 });
  }

  const body = await req.json();
  const email = String(body.email ?? '').trim();
  const password = String(body.password ?? '');
  const fullName = String(body.full_name ?? '').trim();
  const role = body.role === 'admin' ? 'admin' : 'sales';

  if (!email || password.length < 6) {
    return NextResponse.json({ error: '需填写邮箱且密码至少6位' }, { status: 400 });
  }

  const supabase = getServiceSupabase();
  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { full_name: fullName, phone: body.phone ?? '' },
  });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // 设置角色
  await supabase.from('profiles').update({ role, full_name: fullName, phone: body.phone ?? '' })
    .eq('id', data.user!.id);

  return NextResponse.json({ user: { id: data.user!.id, email, role } });
}
