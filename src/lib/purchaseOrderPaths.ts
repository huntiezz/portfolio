export function isValidOrderId(orderId: string): boolean {
  return /^HNT-[A-Z0-9]+-[A-Z0-9]+$/i.test(orderId);
}

export function getPurchaseOrderPath(orderId: string): string {
  return `/pricing/order/${orderId}`;
}
