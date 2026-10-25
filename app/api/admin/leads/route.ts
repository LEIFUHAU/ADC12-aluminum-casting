import { NextResponse } from 'next/server';
import { getServiceSupabase, authorizeAdminOrSales } from '@/lib/supabase/server';

export const runtime = 'nodejs';

// 客户/线索列表：admin 看全部，sales 只看自己负责的
export async function GET(req: Request) {
  const auth = await authorizeAdminOrSales(req);
  if (!auth) return NextResponse.json({ error: '未登录' }, { status: 401 });

  const supabase = getServiceSupabase();
  const url = new URL(req.url);
  const status = url.searchParams.get('status');

  let query = supabase
    .from('leads')
    .select('*, owner:profiles(id, full_name, role)')
    .order('created_at', { ascending: false });

  if (auth.profile.role !== 'admin') {
    query = query.eq('owner_id', auth.user.id);
  } else if (status) {
    query = query.eq('status', status);
  }

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ leads: data });
}

// 手动新增客户
export async function POST(req: Request) {
  const auth = await authorizeAdminOrSales(req);
  if (!auth) return NextResponse.json({ error: '未登录' }, { status: 401 });

  const body = await req.json();
  const supabase = getServiceSupabase();

  const isAdmin = auth.profile.role === 'admin';
  const ownerId = isAdmin && body.owner_id ? body.owner_id : auth.user.id;

  const { data, error } = await supabase
    .from('leads')
    .insert({
      name: String(body.name ?? '').slice(0, 120),
      email: String(body.email ?? '').slice(0, 120),
      phone: String(body.phone ?? '').slice(0, 40),
      company: String(body.company ?? '').slice(0, 120),
      country: String(body.country ?? '').slice(0, 80),
      message: String(body.message ?? '').slice(0, 2000),
      source: String(body.source ?? 'manual').slice(0, 60),
      status: String(body.status ?? 'new'),
      owner_id: ownerId,
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ lead: data });
}

// 修改状态 / 分配负责人
export async function PATCH(req: Request) {
  const auth = await authorizeAdminOrSales(req);
  if (!auth) return NextResponse.json({ error: '未登录' }, { status: 401 });

  const body = await req.json();
  const id = body.id;
  if (!id) return NextResponse.json({ error: '缺少 id' }, { status: 400 });

  const supabase = getServiceSupabase();
  const patch: Record<string, unknown> = { updated_at: new Date().toISOString() };
  if (body.status) patch.status = body.status;

  // 只有 admin 能改负责人
  if (auth.profile.role === 'admin' && body.owner_id !== undefined) {
    patch.owner_id = body.owner_id;
  }

  // sales 只能改自己负责的记录
  if (auth.profile.role !== 'admin') {
    const { data: own } = await supabase
      .from('leads')
      .select('id')
      .eq('id', id)
      .eq('owner_id', auth.user.id)
      .single();
    if (!own) return NextResponse.json({ error: '无权操作该客户' }, { status: 403 });
  }

  const { data, error } = await supabase
    .from('leads')
    .update(patch)
    .eq('id', id)
    .select('*, owner:profiles(id, full_name, role)')
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ lead: data });
}
