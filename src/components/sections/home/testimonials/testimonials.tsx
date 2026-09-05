import { listTestimonies } from "@/lib/testimonies";
import TestimonialsClient from "./testimonials.client";

export default async function Testimonials() {
  const testimonies = await listTestimonies();
  return <TestimonialsClient items={testimonies} />;
}
