import { NextResponse } from 'next/server';
import { getServiceSupabase } from '@/lib/supabase/server';

export const runtime = 'nodejs';

// 公开提交：访客在询盘表单填写，写入 leads 表
export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: '无效的请求' }, { status: 400 });
  }

  const name = String(body.name ?? '').trim();
  const email = String(body.email ?? '').trim();
  const phone = String(body.phone ?? '').trim();
  const company = String(body.company ?? '').trim();
  const country = String(body.country ?? '').trim();
  const message = String(body.message ?? '').trim();
  const source = String(body.source ?? 'website').slice(0, 60);

  if (!name || !email) {
    return NextResponse.json({ error: '请填写姓名和邮箱' }, { status: 400 });
  }

  try {
    const supabase = getServiceSupabase();
    const { error } = await supabase.from('leads').insert({
      name: name.slice(0, 120),
      email: email.slice(0, 120),
      phone: phone.slice(0, 40),
      company: company.slice(0, 120),
      country: country.slice(0, 80),
      message: message.slice(0, 2000),
      source,
      status: 'new',
    });
    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error('lead insert failed', e);
    return NextResponse.json({ error: '提交失败，请稍后重试或直接发邮件' }, { status: 500 });
  }
}
