"use client";

import { Bitcoin, CreditCard } from "lucide-react";
import {
  PURCHASE_PAYMENT_METHODS,
  type PurchasePaymentMethod,
} from "@/data/purchasePayment";
import {
  quoteBody,
  quoteCardClass,
  quoteCardDescClass,
  quoteCardIconClass,
  quoteGrid,
  quoteHeading,
} from "@/components/quote/quoteUi";

export function PaymentMethodStep({
  paymentMethod,
  onSelect,
}: {
  paymentMethod: PurchasePaymentMethod | null;
  onSelect: (method: PurchasePaymentMethod) => void;
}) {
  return (
    <>
      <h1 className={quoteHeading}>how do you want to pay?</h1>
      <p className={quoteBody}>crypto gets an instant invoice. card checkout follows up by email.</p>
      <div className={quoteGrid}>
        {PURCHASE_PAYMENT_METHODS.map((method) => {
          const selected = paymentMethod === method.id;
          return (
            <button
              key={method.id}
              type="button"
              onClick={() => onSelect(method.id)}
              className={quoteCardClass(selected)}
            >
              <span className={quoteCardIconClass(selected)}>
                {method.id === "crypto" ? (
                  <Bitcoin className="h-7 w-7" strokeWidth={1.5} aria-hidden />
                ) : (
                  <CreditCard className="h-7 w-7" strokeWidth={1.5} aria-hidden />
                )}
              </span>
              <span className="font-pixel text-2xl lowercase tracking-wide">{method.title}</span>
              <span className={quoteCardDescClass(selected)}>{method.description}</span>
            </button>
          );
        })}
      </div>
    </>
  );
}
