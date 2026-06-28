"use client";

import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import type { StoredPurchaseInvoice } from "@/lib/purchaseInvoiceStore";

const PurchaseFlow = dynamic(() => import("@/components/purchase/PurchaseFlow"), {
  ssr: false,
  loading: () => (
    <div className="px-6 py-12 sm:px-10">
      <p className="font-mono text-[11px] uppercase tracking-[0.34em] text-foreground/45">loading invoice…</p>
    </div>
  ),
});

export default function PurchaseOrderPageContent({
  restoredInvoice,
}: {
  restoredInvoice: StoredPurchaseInvoice;
}) {
  const router = useRouter();

  return (
    <main className="flex min-h-0 flex-1 flex-col">
      <PurchaseFlow
        restoredInvoice={restoredInvoice}
        onExit={() => void router.push("/pricing")}
      />
    </main>
  );
}
