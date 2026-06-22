import { hospitalConfig } from "@/config/hospital";
import { servicesPageContent } from "@/content/services";
import { patientPageContent } from "@/content/patients";
import { teamPageContent } from "@/content/team";

export type GalleryCategory =
  | "all"
  | "hospital"
  | "care"
  | "facilities"
  | "team"
  | "patients";

export type GalleryImage = {
  id: string;
  title: string;
  category: Exclude<GalleryCategory, "all">;
  image: string;
  alt: string;
  featured?: boolean;
};

export const galleryCategories: {
  id: GalleryCategory;
  label: string;
}[] = [
  {
    id: "all",
    label: "All images",
  },
  {
    id: "hospital",
    label: "Hospital",
  },
  {
    id: "care",
    label: "Care areas",
  },
  {
    id: "facilities",
    label: "Facilities",
  },
  {
    id: "team",
    label: "Team",
  },
  {
    id: "patients",
    label: "Patients",
  },
];

const facilityImages: GalleryImage[] = hospitalConfig.facilities.items.map(
  (item, index) => ({
    id: `facility-${index + 1}`,
    title: item.title,
    category: "facilities",
    image: item.image,
    alt: item.alt,
    featured: index === 0,
  }),
);

const specialistImages: GalleryImage[] = hospitalConfig.specialists.people.map(
  (person, index) => ({
    id: `specialist-${index + 1}`,
    title: person.role,
    category: "team",
    image: person.image,
    alt: person.name,
  }),
);

const galleryImages: GalleryImage[] = [
  {
    id: "hospital-exterior",
    title: "Hospital exterior",
    category: "hospital",
    image: hospitalConfig.hero.buildingImage,
    alt: hospitalConfig.hero.buildingAlt,
    featured: true,
  },
  {
    id: "facility-tour",
    title: "Facility tour",
    category: "hospital",
    image: hospitalConfig.tour.poster,
    alt: "Ubuntu Hospital facility tour preview",
    featured: true,
  },
  {
    id: "services-hero",
    title: "Hospital services",
    category: "hospital",
    image: servicesPageContent.hero.image,
    alt: servicesPageContent.hero.imageAlt,
  },
  {
    id: "patient-information",
    title: "Patient information",
    category: "patients",
    image: patientPageContent.hero.image,
    alt: patientPageContent.hero.imageAlt,
    featured: true,
  },                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
  {
    id: "team-hero",
    title: "Hospital team",
    category: "team",
    image: teamPageContent.hero.image,
    alt: teamPageContent.hero.imageAlt,
  },
  {
    id: "spine-care",
    title: "Spine care",
    category: "care",
    image: hospitalConfig.hero.focusAreas[0].image,
    alt: hospitalConfig.hero.focusAreas[0].alt,
  },
  {
    id: "trauma-care",
    title: "Trauma care",
    category: "care",
    image: hospitalConfig.hero.focusAreas[1].image,
    alt: hospitalConfig.hero.focusAreas[1].alt,
  },
  {
    id: "general-orthopaedics",
    title: "General orthopaedics",
    category: "care",
    image: hospitalConfig.hero.focusAreas[2].image,
    alt: hospitalConfig.hero.focusAreas[2].alt,
  },
  {
    id: "about-care",
    title: "Clinical consultation",
    category: "patients",
    image: hospitalConfig.about.image,
    alt: hospitalConfig.about.imageAlt,
  },
  {
    id: "vision-care",
    title: "Hospital vision",
    category: "hospital",
    image: hospitalConfig.standard.vision.image,
    alt: hospitalConfig.standard.vision.imageAlt,
  },
  ...facilityImages,
  ...specialistImages,
  {
    id: "before-visit",
    title: "Before your visit",
    category: "patients",
    image: servicesPageContent.support.image,
    alt: servicesPageContent.support.imageAlt,
  },
];

export const galleryPageContent = {
  hero: {
    eyebrow: "Hospital gallery",
    title: "A closer look at Ubuntu Hospital.",
    text: "Explore the hospital spaces, care environments, team, and patient support areas.",
  },

  images: galleryImages,
} as const;