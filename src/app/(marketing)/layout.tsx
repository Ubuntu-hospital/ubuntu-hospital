import type { ReactNode } from "react";

import SiteFooter from "@/components/layout/site-footer/site-footer";
import SiteHeader from "@/components/layout/site-header/site-header.client";
import WhatsAppFab from "@/components/widgets/whatsapp-fab/whatsapp-fab.client";

export default function MarketingLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <SiteHeader />
      {children}
      <SiteFooter />
      <WhatsAppFab />
    </>
  );
}
