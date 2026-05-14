/**
 * Fulfillment seam — swap implementation when China supplier API is ready.
 * Phase 15: replace body with supplier POST; env-driven CJ remains optional.
 */

import { createOrder as createCjOrder } from "@/lib/cj";
import type { LineItem } from "@/lib/cj";
import type { ShippingAddress } from "@/lib/cj";

export type DispatchLineItem = {
  productName: string;
  quantity: number;
  priceCents?: number;
  productId?: string;
};

export type DispatchOrderInput = {
  orderId: string;
  stripeSessionId: string;
  email: string;
  customerName?: string;
  shippingAddress: ShippingAddress;
  lineItems: DispatchLineItem[];
  shippingPhone?: string;
};

export type DispatchResult =
  | { status: "manual_fulfillment_pending" }
  | { status: "sent_to_supplier"; supplierOrderId?: string }
  | { status: "supplier_failed"; error: string };

function mapToCjItems(items: DispatchLineItem[]): LineItem[] {
  return items.map((item) => ({
    productName: item.productName,
    quantity: item.quantity,
    priceCents: item.priceCents,
    productId: item.productId,
  }));
}

/**
 * Called after the order row is persisted. CJ runs only when mode is `cj`.
 */
export async function dispatchOrder(
  input: DispatchOrderInput
): Promise<DispatchResult> {
  const mode = process.env.FULFILLMENT_MODE ?? "manual";

  if (mode !== "cj") {
    return { status: "manual_fulfillment_pending" };
  }

  try {
    const cjResponse = await createCjOrder({
      orderNumber: input.stripeSessionId,
      email: input.email,
      customerName: input.customerName,
      shippingAddress: input.shippingAddress,
      lineItems: mapToCjItems(input.lineItems),
      shippingPhone: input.shippingPhone,
    });

    const cjOrderId =
      cjResponse.data?.orderId ??
      (cjResponse.data as { orderId?: string })?.orderId;

    if (cjOrderId) {
      return {
        status: "sent_to_supplier",
        supplierOrderId: String(cjOrderId),
      };
    }

    return {
      status: "supplier_failed",
      error: cjResponse.message ?? "CJ did not return order id",
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : "CJ request failed";
    return { status: "supplier_failed", error: message };
  }
}
