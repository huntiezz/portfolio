import type { GetServerSideProps } from "next";
import SiteFrame from "@/components/portfolio/SiteFrame";
import SiteHeader from "@/components/portfolio/SiteHeader";
import SiteFooter from "@/components/portfolio/SiteFooter";
import PricingPageContent from "@/components/purchase/PricingPageContent";
import { getPurchaseOrderPath, isValidOrderId } from "@/lib/purchaseOrderPaths";

export default function PricingPage() {
  return (
    <SiteFrame variant="flow">
      <SiteHeader />
      <PricingPageContent />
      <SiteFooter />
    </SiteFrame>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const order = ctx.query.order;
  if (typeof order === "string" && isValidOrderId(order)) {
    return { redirect: { destination: getPurchaseOrderPath(order), permanent: false } };
  }
  return { props: {} };
};
