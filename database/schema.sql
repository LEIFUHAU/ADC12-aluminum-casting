-- ============================================================
-- ADC12 国际站 客户管理 + 访问统计  Supabase 建表脚本
-- 在 Supabase Dashboard -> SQL Editor -> New query -> 粘贴 -> Run
-- 可重复执行（IF NOT EXISTS / OR REPLACE）
-- ============================================================

-- ---------- 1. 用户档案表（扩展 Supabase Auth 用户） ----------
create table if not exists public.profiles (
  id         uuid primary key references auth.users(id) on delete cascade,
  full_name  text,
  role       text not null default 'sales' check (role in ('admin','sales')),
  phone      text,
  created_at timestamptz not null default now()
);

-- ---------- 2. 客户/询盘表 ----------
create table if not exists public.leads (
  id         uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name       text not null,
  email      text,
  phone      text,
  company    text,
  country    text,
  message    text,
  source     text not null default 'website',
  status     text not null default 'new'
             check (status in ('new','contacting','qualified','deal','lost')),
  owner_id   uuid references public.profiles(id) on delete set null,
  updated_at timestamptz not null default now()
);

create index if not exists leads_status_idx   on public.leads(status);
create index if not exists leads_owner_idx   on public.leads(owner_id);
create index if not exists leads_created_idx on public.leads(created_at desc);

-- ---------- 3. 访问统计表 ----------
create table if not exists public.page_views (
  id         uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  path       text,
  locale     text,
  country    text,
  referrer   text,
  utm_source text,
  device     text,
  visitor_id text
);

create index if not exists pv_created_idx on public.page_views(created_at desc);
create index if not exists pv_path_idx    on public.page_views(path);

-- ---------- 4. 注册自动建档触发器 ----------
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, phone)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    coalesce(new.raw_user_meta_data->>'phone', '')
  );
  return new;
end;
$$ language plpgsql security definer set search_path = public;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------- 5. Row Level Security ----------
alter table public.profiles   enable row level security;
alter table public.leads      enable row level security;
alter table public.page_views enable row level security;

-- profiles：登录用户可读本人；admin 可读全部（写由 service role / 触发器）
drop policy if exists "profiles_self_read" on public.profiles;
create policy "profiles_self_read" on public.profiles
  for select using (auth.uid() = id);

drop policy if exists "profiles_admin_read_all" on public.profiles;
create policy "profiles_admin_read_all" on public.profiles
  for select using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

-- leads：admin 读全部；sales 读自己负责的；写入由服务端 service role 完成
drop policy if exists "leads_admin_read" on public.leads;
create policy "leads_admin_read" on public.leads
  for select using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

drop policy if exists "leads_owner_read" on public.leads;
create policy "leads_owner_read" on public.leads
  for select using (owner_id = auth.uid());

-- page_views：任何人可插入（访客埋点），登录用户可读
drop policy if exists "pv_public_insert" on public.page_views;
create policy "pv_public_insert" on public.page_views for insert with check (true);

drop policy if exists "pv_auth_read" on public.page_views;
create policy "pv_auth_read" on public.page_views
  for select using (auth.uid() is not null);

-- ---------- 6. 把第一个管理员提为 admin（把 EMAIL 换成你的登录邮箱） ----------
-- 先在 Authentication -> Users 建好账号后，再执行下面这句：
-- update public.profiles set role = 'admin'
-- where id = (select id from auth.users where email = 'YOUR_ADMIN_EMAIL@gmail.com');
