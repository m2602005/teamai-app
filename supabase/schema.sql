-- ひと月さいふ: Supabase のテーブルとアクセス制限
-- Supabase ダッシュボード → SQL Editor に貼り付けて実行してください（何度実行しても大丈夫です）。

-- 出費（1件 = 1行）
create table if not exists public.expenses (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null default auth.uid() references auth.users(id) on delete cascade,
  spent_on   date not null,
  amount     integer not null check (amount > 0 and amount <= 10000000),
  category   text not null default 'other'
             check (category in ('food','move','fun','daily','other')),
  created_at timestamptz not null default now()
);
create index if not exists expenses_user_date on public.expenses (user_id, spent_on);

-- 限度額の決め方（1人 = 1行）
create table if not exists public.settings (
  user_id    uuid primary key default auth.uid() references auth.users(id) on delete cascade,
  mode       text not null default 'm10' check (mode in ('same','m10','m20','custom')),
  custom     integer not null default 0 check (custom >= 0),
  updated_at timestamptz not null default now()
);

-- 行レベルセキュリティ: 自分のデータだけ読み書きできる
alter table public.expenses enable row level security;
alter table public.settings enable row level security;

drop policy if exists "expenses_select_own" on public.expenses;
drop policy if exists "expenses_insert_own" on public.expenses;
drop policy if exists "expenses_update_own" on public.expenses;
drop policy if exists "expenses_delete_own" on public.expenses;
create policy "expenses_select_own" on public.expenses for select to authenticated using (auth.uid() = user_id);
create policy "expenses_insert_own" on public.expenses for insert to authenticated with check (auth.uid() = user_id);
create policy "expenses_update_own" on public.expenses for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "expenses_delete_own" on public.expenses for delete to authenticated using (auth.uid() = user_id);

drop policy if exists "settings_select_own" on public.settings;
drop policy if exists "settings_insert_own" on public.settings;
drop policy if exists "settings_update_own" on public.settings;
create policy "settings_select_own" on public.settings for select to authenticated using (auth.uid() = user_id);
create policy "settings_insert_own" on public.settings for insert to authenticated with check (auth.uid() = user_id);
create policy "settings_update_own" on public.settings for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
