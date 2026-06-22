import type { Metadata } from "next";

import { ContactPage } from "@/components/sections/contact/contact-page";
import { hospitalConfig } from "@/config/hospital";

export const metadata: Metadata = {
  title: `Contact | ${hospitalConfig.name}`,

  description:
    "Contact Ubuntu Orthopaedic & Spine Hospital for appointments, directions, hospital enquiries, WhatsApp support, and specialist care guidance.",
};

export default function ContactRoute() {
  return <ContactPage />;
}
