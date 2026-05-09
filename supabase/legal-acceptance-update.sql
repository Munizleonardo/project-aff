alter table public.profiles add column if not exists accepted_terms boolean not null default false;
alter table public.profiles add column if not exists accepted_terms_at timestamptz;
alter table public.profiles add column if not exists accepted_terms_version text;

create or replace function public.handle_new_user_profile()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (user_id, full_name, email, phone, accepted_terms, accepted_terms_at, accepted_terms_version)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    coalesce(new.email, ''),
    nullif(new.raw_user_meta_data->>'phone', ''),
    coalesce((new.raw_user_meta_data->>'accepted_terms')::boolean, false),
    case
      when coalesce((new.raw_user_meta_data->>'accepted_terms')::boolean, false) then now()
      else null
    end,
    nullif(new.raw_user_meta_data->>'accepted_terms_version', '')
  )
  on conflict (user_id) do update set
    full_name = excluded.full_name,
    email = excluded.email,
    phone = excluded.phone,
    accepted_terms = excluded.accepted_terms,
    accepted_terms_at = excluded.accepted_terms_at,
    accepted_terms_version = excluded.accepted_terms_version,
    updated_at = now();

  return new;
end;
$$;
