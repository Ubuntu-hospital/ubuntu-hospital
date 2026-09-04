import type { Metadata } from "next";
import { requireAdminSession } from "@/lib/admin-auth";
import { requireSuperAdminSession } from "@/lib/admin-auth";
import { listTestimoniesForAdmin } from "@/lib/testimonies";
import TestimoniesManager from "./testimonies-manager.client";

export const metadata: Metadata = {
  title: "Patient Testimonies | Ubuntu Hospital Admin",
  description: "Manage patient voices, reviews, and testimonials.",
};

export const dynamic = "force-dynamic";

export default async function AdminTestimoniesPage() {
  await requireAdminSession();
  await requireSuperAdminSession();
  const testimonies = await listTestimoniesForAdmin();

  return <TestimoniesManager testimonies={testimonies} />;
}
