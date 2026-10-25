import { NextResponse } from 'next/server';
import { authorizeAdminOrSales } from '@/lib/supabase/server';

export const runtime = 'nodejs';

export async function GET(req: Request) {
  const auth = await authorizeAdminOrSales(req);
  if (!auth) return NextResponse.json({ error: '未登录' }, { status: 401 });
  return NextResponse.json({ user: { id: auth.user.id, email: auth.user.email }, profile: auth.profile });
}
