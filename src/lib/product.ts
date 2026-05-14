/**
 * Legacy single-product exports — backed by the Elements catalog default SKU.
 */
import {
  formatPrice,
  getDefaultProduct,
  type Product,
} from "@/lib/products";

export { formatPrice, getDefaultProduct, type Product };

export const product = getDefaultProduct();
