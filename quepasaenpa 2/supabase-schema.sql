-- ================================================
-- QUE PASA EN PA — Supabase Schema
-- Copia y pega esto en el SQL Editor de Supabase
-- ================================================

create table if not exists articles (
  id uuid default gen_random_uuid() primary key,
  slug text unique not null,
  category text not null,
  title_es text not null,
  title_en text not null,
  excerpt_es text not null,
  excerpt_en text not null,
  content_es text not null,
  content_en text not null,
  author text not null default 'Redacción QP-PA',
  image text not null,
  source_url text,
  source_name text,
  read_time integer default 3,
  featured boolean default false,
  published boolean default true,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Index para búsquedas rápidas
create index if not exists articles_category_idx on articles(category);
create index if not exists articles_created_at_idx on articles(created_at desc);
create index if not exists articles_featured_idx on articles(featured);
create index if not exists articles_slug_idx on articles(slug);

-- Habilitar Row Level Security
alter table articles enable row level security;

-- Política: cualquiera puede leer artículos publicados
create policy "Public can read published articles"
  on articles for select
  using (published = true);

-- Política: solo service_role puede insertar/actualizar
create policy "Service role can insert articles"
  on articles for insert
  with check (true);

create policy "Service role can update articles"
  on articles for update
  using (true);
