import Hero from "@/components/sections/home/hero/hero.client";
import Tour from "@/components/sections/home/tour/tour.client";
import Booking from "@/components/sections/home/booking/booking";
import Testimonials from "@/components/sections/home/testimonials/testimonials";
import Specialists from "@/components/sections/home/specialists/specialists";
import PatientJourney from "@/components/sections/home/patient-journey/patient-journey";
import Facilities from "@/components/sections/home/facilities/facilities";
import { listTeamMembers } from "@/lib/team-members";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const managedMembers = await listTeamMembers();
  return (
    <main>
      <Hero />
      <Tour />
      <Facilities />
      <Specialists people={managedMembers} />
      <PatientJourney />
      <Testimonials />
      <Booking />
    </main>
  );
}
