import Hero from "@/components/sections/home/hero/hero.client";
import Tour from "@/components/sections/home/tour/tour.client";
import Booking from "@/components/sections/home/booking/booking";
import Testimonials from "@/components/sections/home/testimonials/testimonials.client";
import Specialists from "@/components/sections/home/specialists/specialists";
import PatientJourney from "@/components/sections/home/patient-journey/patient-journey";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Tour />
      <Specialists />
      <PatientJourney />
      <Testimonials />
      <Booking />
    </main>
  );
}
