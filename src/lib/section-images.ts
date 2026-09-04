import { hospitalConfig } from "@/config/hospital";
import { routes } from "@/config/routes";
import { patientPageContent } from "@/content/patients";
import { servicesPageContent } from "@/content/services";

export type SectionDefinition = {
  sectionId: string;
  title: string;
  page: string;
  location: string;
  defaultImage: string;
  defaultAlt: string;
  publicUrl: string;
};

export const MANAGED_SECTIONS: SectionDefinition[] = [
  {
    sectionId: "hero-patients",
    title: "Patients Page Hero",
    page: "Patients Page",
    location: "Hero Header Section",
    defaultImage: patientPageContent.hero.image,
    defaultAlt: patientPageContent.hero.imageAlt,
    publicUrl: routes.patients,
  },
  {
    sectionId: "hero-contact",
    title: "Contact Page Hero",
    page: "Contact Page",
    location: "Hero Header Section",
    defaultImage: hospitalConfig.hero.buildingImage,
    defaultAlt: hospitalConfig.hero.buildingAlt,
    publicUrl: routes.contact,
  },
  {
    sectionId: "hero-services",
    title: "Services Page Hero",
    page: "Services Page",
    location: "Hero Header Section",
    defaultImage: servicesPageContent.hero.image,
    defaultAlt: servicesPageContent.hero.imageAlt,
    publicUrl: routes.services,
  },
  {
    sectionId: "services-before-you-visit",
    title: "Before You Visit Section",
    page: "Services Page",
    location: "Come Prepared / Support Section",
    defaultImage: servicesPageContent.support.image,
    defaultAlt: servicesPageContent.support.imageAlt,
    publicUrl: `${routes.services}#visit`,
  },
  {
    sectionId: "about-our-vision",
    title: "Our Vision Section",
    page: "About Page",
    location: "Ubuntu Standard & Vision Section",
    defaultImage: hospitalConfig.standard.vision.image,
    defaultAlt: hospitalConfig.standard.vision.imageAlt,
    publicUrl: `${routes.about}#vision`,
  },
  {
    sectionId: "about-the-hospital",
    title: "About the Hospital Section",
    page: "About Page",
    location: "About Hospital Care Section",
    defaultImage: hospitalConfig.about.image,
    defaultAlt: hospitalConfig.about.imageAlt,
    publicUrl: `${routes.about}#about`,
  },
];

export type ManagedSectionImage = SectionDefinition & {
  currentImage: string;
  imageAlt: string;
  isOverridden: boolean;
};

export async function getManagedSectionImages(): Promise<
  ManagedSectionImage[]
> {
  const [{ connectToDatabase }, { SectionImageModel }] = await Promise.all([
    import("@/lib/mongodb"),
    import("@/models/section-image"),
  ]);
  await connectToDatabase();

  const overrides = await SectionImageModel.find().lean();
  const overrideMap = new Map(overrides.map((doc) => [doc.sectionId, doc]));

  return MANAGED_SECTIONS.map((section) => {
    const override = overrideMap.get(section.sectionId);
    return {
      ...section,
      currentImage: override?.image || section.defaultImage,
      imageAlt: override?.imageAlt || section.defaultAlt,
      isOverridden: Boolean(override?.image),
    };
  });
}

export async function getSectionImage(
  sectionId: string,
  fallbackImage: string,
  fallbackAlt?: string,
): Promise<{ image: string; alt: string }> {
  try {
    const [{ connectToDatabase }, { SectionImageModel }] = await Promise.all([
      import("@/lib/mongodb"),
      import("@/models/section-image"),
    ]);
    await connectToDatabase();

    const override = await SectionImageModel.findOne({ sectionId }).lean();
    if (override?.image) {
      return {
        image: override.image,
        alt: override.imageAlt || fallbackAlt || "Hospital Section Photo",
      };
    }
  } catch (error) {
    console.error(`Error loading section image for ${sectionId}:`, error);
  }

  return {
    image: fallbackImage,
    alt: fallbackAlt || "Hospital Section Photo",
  };
}
