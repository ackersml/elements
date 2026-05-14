-- Orders table for dropship flow: Stripe checkout -> webhook -> CJ
create table if not exists public.orders (
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

create index if not exists orders_stripe_session_id on public.orders (stripe_session_id);
create index if not exists orders_email on public.orders (email);
create index if not exists orders_status on public.orders (status);

comment on table public.orders is 'Orders from Stripe Checkout; sent to CJ for fulfillment. Status: paid, sent_to_cj, cj_failed, shipped';
