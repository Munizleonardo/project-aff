-- TechParks - Supabase schema
-- Cole este arquivo no Supabase SQL Editor e execute.
-- Depois configure no projeto:
-- NEXT_PUBLIC_SUPABASE_URL=https://SEU-PROJETO.supabase.co
-- NEXT_PUBLIC_SUPABASE_ANON_KEY=SUA_ANON_KEY

create extension if not exists pgcrypto;

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text not null default '',
  icon_name text not null default 'tag',
  accent_from text not null default 'from-cyan-400',
  accent_to text not null default 'to-blue-600',
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  short_description text not null default '',
  full_description text not null default '',
  category_id uuid references public.categories(id) on delete set null,
  department_slug text,
  main_image_url text not null default '',
  old_price numeric(12,2) not null default 0,
  price numeric(12,2) not null default 0,
  installment text not null default '',
  discount_percentage integer not null default 0,
  rating numeric(3,2) not null default 0,
  reviews_count integer not null default 0,
  clicks_count integer not null default 0,
  tags text[] not null default '{}',
  specs jsonb not null default '{}'::jsonb,
  pros text[] not null default '{}',
  cons text[] not null default '{}',
  featured boolean not null default false,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  image_url text not null,
  alt_text text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.product_videos (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  title text not null,
  thumbnail_url text not null default '',
  duration text not null default '',
  video_url text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.affiliate_offers (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  marketplace_name text not null,
  affiliate_url text not null,
  price numeric(12,2),
  old_price numeric(12,2),
  installment text,
  discount_percentage integer,
  is_primary boolean not null default false,
  is_active boolean not null default true,
  starts_at timestamptz,
  ends_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists affiliate_offers_one_primary_per_product
  on public.affiliate_offers(product_id)
  where is_primary = true and is_active = true;

create table if not exists public.product_reviews (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  reviewer_name text not null,
  rating integer not null check (rating between 1 and 5),
  body text not null,
  is_verified_purchase boolean not null default false,
  published_at timestamptz not null default now(),
  is_active boolean not null default true
);

create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text not null default '',
  body text not null default '',
  category_slug text,
  reading_time text not null default '',
  published_at date not null default current_date,
  author_name text not null default 'Equipe TechParks',
  image_url text not null default '',
  tags text[] not null default '{}',
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.click_events (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references public.products(id) on delete set null,
  affiliate_offer_id uuid references public.affiliate_offers(id) on delete set null,
  source text,
  user_agent text,
  created_at timestamptz not null default now()
);

create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users(id) on delete cascade,
  full_name text not null default '',
  email text not null default '',
  phone text,
  accepted_terms boolean not null default false,
  accepted_terms_at timestamptz,
  accepted_terms_version text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles add column if not exists accepted_terms boolean not null default false;
alter table public.profiles add column if not exists accepted_terms_at timestamptz;
alter table public.profiles add column if not exists accepted_terms_version text;

create table if not exists public.user_saved_products (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  product_id uuid not null references public.products(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (user_id, product_id)
);

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

drop trigger if exists on_auth_user_created_create_profile on auth.users;
create trigger on_auth_user_created_create_profile
  after insert on auth.users
  for each row execute function public.handle_new_user_profile();

create or replace view public.category_public as
select
  c.id::text as id,
  c.name,
  c.slug,
  c.description,
  c.icon_name as "iconName",
  concat(c.accent_from, ' ', c.accent_to) as accent,
  c.sort_order as "sortOrder"
from public.categories c
where c.is_active = true
order by c.sort_order asc, c.name asc;

create or replace view public.product_catalog as
select
  p.id::text as id,
  p.name,
  p.slug,
  p.short_description as "shortDescription",
  p.full_description as "fullDescription",
  coalesce(c.name, '') as category,
  coalesce(p.department_slug, c.slug, '') as department,
  p.main_image_url as image,
  coalesce(
    array_remove(array_agg(distinct pi.image_url order by pi.image_url), null),
    array[p.main_image_url]
  ) as gallery,
  coalesce(ao.old_price, p.old_price)::float8 as "oldPrice",
  coalesce(ao.price, p.price)::float8 as price,
  coalesce(ao.installment, p.installment) as installment,
  coalesce(ao.discount_percentage, p.discount_percentage) as "discountPercentage",
  p.rating::float8 as rating,
  p.reviews_count as "reviewsCount",
  p.clicks_count as clicks,
  coalesce(ao.affiliate_url, '') as "affiliateUrl",
  p.tags,
  p.specs,
  p.pros,
  p.cons,
  coalesce(
    jsonb_agg(
      distinct jsonb_build_object(
        'title', pv.title,
        'thumbnail', pv.thumbnail_url,
        'duration', pv.duration,
        'url', pv.video_url
      )
    ) filter (where pv.id is not null),
    '[]'::jsonb
  ) as videos,
  coalesce(
    jsonb_agg(
      distinct jsonb_build_object(
        'authorName', pr.reviewer_name,
        'rating', pr.rating,
        'body', pr.body,
        'publishedAt', pr.published_at,
        'isVerifiedPurchase', pr.is_verified_purchase
      )
    ) filter (where pr.id is not null),
    '[]'::jsonb
  ) as reviews,
  p.featured
from public.products p
left join public.categories c on c.id = p.category_id
left join public.product_images pi on pi.product_id = p.id
left join public.product_videos pv on pv.product_id = p.id
left join public.product_reviews pr on pr.product_id = p.id and pr.is_active = true
left join lateral (
  select *
  from public.affiliate_offers offer
  where offer.product_id = p.id
    and offer.is_active = true
    and (offer.starts_at is null or offer.starts_at <= now())
    and (offer.ends_at is null or offer.ends_at >= now())
  order by offer.is_primary desc, offer.created_at desc
  limit 1
) ao on true
where p.is_active = true
group by p.id, c.name, c.slug, ao.old_price, ao.price, ao.installment, ao.discount_percentage, ao.affiliate_url;

alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.product_images enable row level security;
alter table public.product_videos enable row level security;
alter table public.affiliate_offers enable row level security;
alter table public.product_reviews enable row level security;
alter table public.blog_posts enable row level security;
alter table public.click_events enable row level security;
alter table public.profiles enable row level security;
alter table public.user_saved_products enable row level security;

drop policy if exists "Public read categories" on public.categories;
create policy "Public read categories" on public.categories for select using (is_active = true);

drop policy if exists "Public read products" on public.products;
create policy "Public read products" on public.products for select using (is_active = true);

drop policy if exists "Public read product images" on public.product_images;
create policy "Public read product images" on public.product_images for select using (true);

drop policy if exists "Public read product videos" on public.product_videos;
create policy "Public read product videos" on public.product_videos for select using (true);

drop policy if exists "Public read active affiliate offers" on public.affiliate_offers;
create policy "Public read active affiliate offers" on public.affiliate_offers for select using (is_active = true);

drop policy if exists "Public read active reviews" on public.product_reviews;
create policy "Public read active reviews" on public.product_reviews for select using (is_active = true);

drop policy if exists "Public read active blog posts" on public.blog_posts;
create policy "Public read active blog posts" on public.blog_posts for select using (is_active = true);

drop policy if exists "Public insert click events" on public.click_events;
create policy "Public insert click events" on public.click_events for insert with check (true);

drop policy if exists "Users read own profile" on public.profiles;
create policy "Users read own profile" on public.profiles for select using (auth.uid() = user_id);

drop policy if exists "Users insert own profile" on public.profiles;
create policy "Users insert own profile" on public.profiles for insert with check (auth.uid() = user_id);

drop policy if exists "Users update own profile" on public.profiles;
create policy "Users update own profile" on public.profiles for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "Users read own saved products" on public.user_saved_products;
create policy "Users read own saved products" on public.user_saved_products for select using (auth.uid() = user_id);

drop policy if exists "Users insert own saved products" on public.user_saved_products;
create policy "Users insert own saved products" on public.user_saved_products for insert with check (auth.uid() = user_id);

drop policy if exists "Users delete own saved products" on public.user_saved_products;
create policy "Users delete own saved products" on public.user_saved_products for delete using (auth.uid() = user_id);

grant usage on schema public to anon, authenticated;
grant select on public.category_public to anon, authenticated;
grant select on public.product_catalog to anon, authenticated;
grant select on public.categories to anon, authenticated;
grant select on public.products to anon, authenticated;
grant select on public.product_images to anon, authenticated;
grant select on public.product_videos to anon, authenticated;
grant select on public.affiliate_offers to anon, authenticated;
grant select on public.product_reviews to anon, authenticated;
grant select on public.blog_posts to anon, authenticated;
grant insert on public.click_events to anon, authenticated;
grant select, insert, update on public.profiles to authenticated;
grant select, insert, delete on public.user_saved_products to authenticated;

-- Como cadastrar um produto:
-- 1) Crie ou encontre a categoria em public.categories.
-- 2) Insira o produto em public.products usando o category_id.
-- 3) Insira imagens extras em public.product_images.
-- 4) Insira o link afiliado em public.affiliate_offers. O campo affiliate_url é onde vai o link de afiliado.
--
-- Exemplo de cadastro:
-- insert into public.categories (name, slug, description, icon_name, accent_from, accent_to, sort_order)
-- values ('Monitores', 'monitores', 'Telas ultrawide, 4K e alta taxa.', 'monitor', 'from-sky-400', 'to-indigo-600', 10)
-- on conflict (slug) do nothing;
--
-- insert into public.products (
--   name, slug, short_description, full_description, category_id, department_slug,
--   main_image_url, old_price, price, installment, discount_percentage,
--   rating, reviews_count, clicks_count, tags, specs, pros, cons, featured
-- )
-- select
--   'Monitor Exemplo 27 144Hz',
--   'monitor-exemplo-27-144hz',
--   'Monitor para jogos e produtividade.',
--   'Descricao completa do produto.',
--   c.id,
--   c.slug,
--   'https://url-da-imagem.com/produto.webp',
--   1599.90,
--   1199.90,
--   '10x de R$ 119,99',
--   25,
--   4.8,
--   0,
--   0,
--   array['monitor', '144hz'],
--   '{"Tela":"27 polegadas","Resolucao":"2560x1440","Frequencia":"144Hz"}'::jsonb,
--   array['Boa imagem', 'Alta taxa de atualizacao'],
--   array['Preco pode variar'],
--   true
-- from public.categories c
-- where c.slug = 'monitores';
--
-- insert into public.affiliate_offers (
--   product_id, marketplace_name, affiliate_url, price, old_price, installment, discount_percentage, is_primary
-- )
-- select
--   p.id,
--   'Amazon',
--   'https://seu-link-de-afiliado-aqui',
--   1199.90,
--   1599.90,
--   '10x de R$ 119,99',
--   25,
--   true
-- from public.products p
-- where p.slug = 'monitor-exemplo-27-144hz';
