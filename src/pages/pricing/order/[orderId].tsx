import type { GetServerSideProps } from "next";
import SiteFrame from "@/components/portfolio/SiteFrame";
import SiteHeader from "@/components/portfolio/SiteHeader";
import SiteFooter from "@/components/portfolio/SiteFooter";
import PurchaseOrderPageContent from "@/components/purchase/PurchaseOrderPageContent";
import { isValidOrderId } from "@/lib/purchaseOrderPaths";
import { getPurchaseInvoice, type StoredPurchaseInvoice } from "@/lib/purchaseInvoiceStore";

type PurchaseOrderPageProps = {
  restoredInvoice: StoredPurchaseInvoice;
};

export default function PurchaseOrderPage({ restoredInvoice }: PurchaseOrderPageProps) {
  return (
    <SiteFrame variant="flow">
      <SiteHeader />
      <PurchaseOrderPageContent restoredInvoice={restoredInvoice} />
      <SiteFooter />
    </SiteFrame>
  );
}

export const getServerSideProps: GetServerSideProps<PurchaseOrderPageProps> = async (ctx) => {
  const orderId = ctx.params?.orderId;
  if (typeof orderId !== "string" || !isValidOrderId(orderId)) {
    return { redirect: { destination: "/pricing", permanent: false } };
  }

  const restoredInvoice = await getPurchaseInvoice(orderId);
  if (!restoredInvoice) {
    return { redirect: { destination: "/pricing", permanent: false } };
  }

  return { props: { restoredInvoice } };
};
