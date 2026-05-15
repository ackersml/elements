-- Elements storefront orders (Stripe checkout). Use table name elements_store_orders
-- on shared Supabase projects; set SUPABASE_ORDERS_TABLE=orders on a dedicated project.

create table if not exists public.elements_store_orders (
  id uuid primary key default gen_random_uuid(),
  stripe_session_id text not null unique,
  stripe_payment_intent_id text,
  email text not null,
  customer_name text,
  shipping_address jsonb not null default '{}',
  line_items jsonb not null default '[]',
  amount_total integer not null,
  status text not null default 'paid',
  cj_order_id text,
  tracking_url text,
  tracking_number text,
  created_at timestamptz not null default now()
);

create index if not exists elements_store_orders_stripe_session_id
  on public.elements_store_orders (stripe_session_id);
create index if not exists elements_store_orders_email
  on public.elements_store_orders (email);
create index if not exists elements_store_orders_status
  on public.elements_store_orders (status);

comment on table public.elements_store_orders is
  'Elements storefront orders from Stripe Checkout';

alter table public.elements_store_orders enable row level security;
