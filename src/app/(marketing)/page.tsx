import Hero from "@/components/sections/home/hero/hero.client";
import HeroHighlights from "@/components/sections/home/hero-highlights/hero-highlights";
import Services from "@/components/sections/home/services/services.client";
import About from "@/components/sections/home/about/about";
import UbuntuStandard from "@/components/sections/home/ubuntu-standard/ubuntu-standard";
import Tour from "@/components/sections/home/tour/tour.client";
import PatientJourney from "@/components/sections/home/patient-journey/patient-journey";
import Specialists from "@/components/sections/home/specialists/specialists";
import Facilities from "@/components/sections/home/facilities/facilities";
import Testimonials from "@/components/sections/home/testimonials/testimonials.client";
import Booking from "@/components/sections/home/booking/booking";
import Socials from "@/components/sections/home/socials/socials";
import Contact from "@/components/sections/home/contact/contact";
import Faqs from "@/components/sections/home/faqs/faqs";
import FinalCta from "@/components/sections/home/final-cta/final-cta";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <HeroHighlights />
      <Services />
      <About />
      <UbuntuStandard />
      <Tour />
      <PatientJourney />
      <Specialists />
      <Facilities />
      <Testimonials />
      <Booking />
      <Socials />
      <Contact />
      <Faqs />
      <FinalCta />
    </main>
  );
}
