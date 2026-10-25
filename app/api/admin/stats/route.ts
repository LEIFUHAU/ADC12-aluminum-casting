import { NextResponse } from 'next/server';
import { getServiceSupabase, authorizeAdminOrSales } from '@/lib/supabase/server';

export const runtime = 'nodejs';

function daysAgo(n: number) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString();
}

export async function GET(req: Request) {
  const auth = await authorizeAdminOrSales(req);
  if (!auth) return NextResponse.json({ error: '未登录' }, { status: 401 });

  const supabase = getServiceSupabase();
  const { data, error } = await supabase
    .from('page_views')
    .select('created_at, path, country, referrer, utm_source, visitor_id')
    .gte('created_at', daysAgo(90))
    .order('created_at', { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const rows = data ?? [];
  const today = new Date().toISOString().slice(0, 10);

  // 趋势：近14天每日 PV
  const trend: Record<string, number> = {};
  for (let i = 13; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    trend[d.toISOString().slice(0, 10)] = 0;
  }
  const byPage: Record<string, number> = {};
  const byCountry: Record<string, number> = {};
  const bySource: Record<string, number> = {};
  const visitors = new Set<string>();
  let todayPv = 0;

  for (const r of rows) {
    const day = String(r.created_at).slice(0, 10);
    if (day in trend) trend[day] += 1;
    if (day === today) todayPv += 1;
    if (r.visitor_id) visitors.add(r.visitor_id);
    byPage[r.path || '/'] = (byPage[r.path || '/'] || 0) + 1;
    byCountry[r.country || '未知'] = (byCountry[r.country || '未知'] || 0) + 1;
    const src = r.utm_source || classifyReferrer(r.referrer);
    bySource[src] = (bySource[src] || 0) + 1;
  }

  return NextResponse.json({
    totalPv: rows.length,
    todayPv,
    uniqueVisitors: visitors.size,
    trend: Object.entries(trend).map(([date, pv]) => ({ date, pv })),
    byPage: sortObj(byPage),
    byCountry: sortObj(byCountry),
    bySource: sortObj(bySource),
  });
}

function classifyReferrer(ref: string | null) {
  if (!ref) return '直接访问';
  if (ref.includes('google.')) return 'Google';
  if (ref.includes('facebook.') || ref.includes('fb.')) return 'Facebook';
  if (ref.includes('instagram.')) return 'Instagram';
  if (ref.includes('tiktok.')) return 'TikTok';
  if (ref.includes('linkedin.')) return 'LinkedIn';
  if (ref.includes('youtube.')) return 'YouTube';
  return '其他';
}

function sortObj(o: Record<string, number>) {
  return Object.entries(o)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);
}
