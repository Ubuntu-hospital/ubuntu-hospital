import { hospitalConfig } from "@/config/hospital";

export const homeContent = {
  hero: hospitalConfig.hero,
  services: hospitalConfig.services,
  about: hospitalConfig.about,
  standard: hospitalConfig.standard,
  tour: hospitalConfig.tour,
  journey: hospitalConfig.journey,
  specialists: hospitalConfig.specialists,
  facilities: hospitalConfig.facilities,
  testimonials: hospitalConfig.testimonials,
  booking: hospitalConfig.booking,
  socials: hospitalConfig.socialLinks,
  contact: hospitalConfig.contact,
  map: hospitalConfig.map,
} as const;
