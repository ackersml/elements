-- Orders table for Stripe checkout → CJ Dropshipping flow
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  stripe_session_id text NOT NULL UNIQUE,
  stripe_payment_intent_id text,
  email text NOT NULL,
  customer_name text,
  shipping_address jsonb,
  line_items jsonb NOT NULL,
  amount_total integer NOT NULL,
  status text NOT NULL DEFAULT 'paid',
  cj_order_id text,
  tracking_url text,
  tracking_number text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_orders_stripe_session_id ON orders (stripe_session_id);
CREATE INDEX IF NOT EXISTS idx_orders_email ON orders (email);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders (status);
