import { NextResponse } from 'next/server';
import { getServiceSupabase } from '@/lib/supabase/server';

export const runtime = 'nodejs';

// 公开埋点：记录一次页面访问
export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'bad request' }, { status: 400 });
  }

  const headers = req.headers;
  const country =
    headers.get('x-country-code') ||
    headers.get('cf-ipcountry') ||
    '';

  const row = {
    path: String(body.path ?? '/').slice(0, 200),
    locale: String(body.locale ?? '').slice(0, 10),
    country: String(country).slice(0, 10),
    referrer: String(body.referrer ?? headers.get('referer') ?? '').slice(0, 300),
    utm_source: String(body.utm_source ?? '').slice(0, 80),
    device: String(body.device ?? '').slice(0, 20),
    visitor_id: String(body.visitor_id ?? '').slice(0, 80),
  };

  try {
    const supabase = getServiceSupabase();
    const { error } = await supabase.from('page_views').insert(row);
    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch (e) {
    // 埋点失败不打扰访客
    console.error('track failed', e);
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}
