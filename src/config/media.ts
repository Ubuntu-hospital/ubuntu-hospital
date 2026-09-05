import { hospitalConfig } from "@/config/hospital";

export const media = {
  hero: {
    buildingImage: hospitalConfig.hero.buildingImage,
    buildingAlt: hospitalConfig.hero.buildingAlt,
    spineImage: hospitalConfig.hero.spineImage,
    spineAlt: hospitalConfig.hero.spineAlt,
  },
  about: {
    image: hospitalConfig.about.image,
    imageAlt: hospitalConfig.about.imageAlt,
  },
  standardVision: {
    image: hospitalConfig.standard.vision.image,
    imageAlt: hospitalConfig.standard.vision.imageAlt,
  },
  tour: {
    poster: hospitalConfig.tour.poster,
    videoId: hospitalConfig.tour.videoId,
  },
  specialists: hospitalConfig.specialists.people.map((person) => person.image),
  facilities: hospitalConfig.facilities.items.map((item) => ({
    image: item.image,
    alt: item.alt,
  })),
} as const;
