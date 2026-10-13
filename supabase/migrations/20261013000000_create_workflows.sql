create table if not exists public.workflows (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null check (char_length(name) between 1 and 120),
  description text not null default '',
  status text not null default 'draft' check (status in ('draft', 'active', 'paused')),
  steps jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);
create index if not exists workflows_user_id_updated_at_idx on public.workflows(user_id, updated_at desc);
alter table public.workflows enable row level security;
drop policy if exists workflows_select_own on public.workflows;
drop policy if exists workflows_insert_own on public.workflows;
drop policy if exists workflows_update_own on public.workflows;
drop policy if exists workflows_delete_own on public.workflows;
create policy workflows_select_own on public.workflows for select to authenticated using ((select auth.uid()) = user_id);
create policy workflows_insert_own on public.workflows for insert to authenticated with check ((select auth.uid()) = user_id);
create policy workflows_update_own on public.workflows for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy workflows_delete_own on public.workflows for delete to authenticated using ((select auth.uid()) = user_id);
create or replace function public.set_workflows_updated_at() returns trigger language plpgsql set search_path = public as $$ begin new.updated_at = timezone('utc', now()); return new; end; $$;
create trigger workflows_set_updated_at before update on public.workflows for each row execute function public.set_workflows_updated_at();
grant select, insert, update, delete on public.workflows to authenticated;
