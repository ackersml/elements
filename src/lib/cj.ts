/**
 * CJ Dropshipping API client (server-only).
 * Create Order V2: https://developers.cjdropshipping.com/api2.0/v1/shopping/order/createOrderV2
 */

const CJ_ORDER_API =
  "https://developers.cjdropshipping.com/api2.0/v1/shopping/order/createOrderV2";

export type ShippingAddress = {
  line1?: string;
  line2?: string;
  city?: string;
  state?: string;
  postal_code?: string;
  country?: string;
};

export type LineItem = {
  productId?: string;
  productName?: string;
  quantity: number;
  priceCents?: number;
};

export type OrderForCj = {
  orderNumber: string;
  email: string;
  customerName?: string;
  shippingAddress: ShippingAddress;
  lineItems: LineItem[];
  shippingPhone?: string;
};

export type CjCreateOrderResponse = {
  result?: boolean;
  message?: string;
  data?: { orderId?: string; [key: string]: unknown };
};

function getEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env: ${name}`);
  return v;
}

export async function createOrder(order: OrderForCj): Promise<CjCreateOrderResponse> {
  const token = getEnv("CJ_ACCESS_TOKEN");
  const vid = getEnv("CJ_PRODUCT_VID");
  const storageId = getEnv("CJ_STORAGE_ID");
  const logisticName = getEnv("CJ_LOGISTIC_NAME");
  const fromCountryCode = getEnv("CJ_FROM_COUNTRY_CODE");

  const addr = order.shippingAddress;
  const countryCode = (addr.country ?? "").toUpperCase();
  const shippingAddressLine =
    [addr.line1, addr.line2].filter(Boolean).join(", ") || "";

  const products = order.lineItems.map((item, index) => ({
    vid,
    quantity: item.quantity,
    storeLineItemId: `${order.orderNumber}-${index}`,
  }));

  const body = {
    orderNumber: order.orderNumber,
    shippingCountryCode: countryCode,
    shippingCountry: countryCode,
    shippingProvince: addr.state ?? "",
    shippingCity: addr.city ?? "",
    shippingAddress: shippingAddressLine,
    shippingCustomerName: order.customerName ?? "",
    shippingZip: addr.postal_code ?? "",
    shippingPhone: order.shippingPhone ?? "",
    email: order.email,
    logisticName,
    fromCountryCode,
    storageId,
    products,
    payType: 3,
  };

  const res = await fetch(CJ_ORDER_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "CJ-Access-Token": token,
    },
    body: JSON.stringify(body),
  });

  const data = (await res.json()) as CjCreateOrderResponse;
  if (!res.ok) {
    throw new Error(
      data.message ?? `CJ API error: ${res.status} ${res.statusText}`
    );
  }
  return data;
}
