import type { Metadata } from "next";

import { hospitalConfig } from "@/config/hospital";
import { routes, type AppRouteKey } from "@/config/routes";
import { getAppUrl } from "@/lib/env";

export { routes, type AppRouteKey };

/**
 * Returns the dynamically configured base URL for the application.
 */
export function getBaseUrl(): string {
  return getAppUrl();
}

/**
 * Generates an absolute canonical URL for any relative route path.
 */
export function getCanonicalUrl(pathname: string = ""): string {
  const base = getBaseUrl().replace(/\/+$/, "");
  const normalizedPath = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${base}${normalizedPath === "/" ? "" : normalizedPath}`;
}

/**
 * Master SEO configurations for public routes.
 * Optimised for Google Search rankings, Sitelinks, and Answer Engine Optimization (AEO / Perplexity / Gemini / AI Overviews).
 */
export const pageSeoConfig = {
  home: {
    title: "Ubuntu Orthopaedic & Spine Hospital | Specialist Care in Ghana",
    description:
      "Premier specialist hospital in Mantukwa, Sunyani, Ghana offering advanced spine surgery, joint replacement, trauma and fracture care, and comprehensive rehabilitation.",
    keywords: [
      "Ubuntu Orthopaedic & Spine Hospital",
      "orthopaedic hospital Ghana",
      "spine hospital Sunyani",
      "spine surgery Ghana",
      "best orthopaedic doctor Sunyani",
      "joint replacement Ghana",
      "knee replacement surgery",
      "hip replacement Ghana",
      "bone fracture treatment Sunyani",
      "trauma surgery Ghana",
      "physiotherapy clinic Sunyani",
      "back pain specialist Ghana",
      "orthopedic clinic Bono region",
    ],
    path: routes.home,
    image: "/opengraph-image",
  },
  about: {
    title: `About Us | Specialist Medical Team & Modern Facility`,
    description:
      "Discover our patient-first recovery philosophy, board-certified orthopaedic and spine surgeons, advanced medical equipment, and high-standard clinical care in Sunyani, Ghana.",
    keywords: [
      "about Ubuntu hospital",
      "orthopaedic surgeons Ghana",
      "spine specialists Sunyani",
      "hospital in Mantukwa",
      "healthcare facilities Bono region",
      "patient recovery hospital Ghana",
    ],
    path: routes.about,
    image: "/images/hospital/ubuntu-hospital-exterior.png",
  },
  services: {
    title: `Clinical Services | Spine Surgery, Joint Replacement & Trauma`,
    description:
      "Specialised medical and surgical treatments: spinal decompression, spinal fusion, arthroscopic joint surgery, total knee and hip replacement, complex trauma fixation, and rehabilitation.",
    keywords: [
      "spine surgery Sunyani",
      "orthopaedic services Ghana",
      "joint replacement surgery",
      "bone trauma surgery",
      "physiotherapy rehabilitation",
      "spinal deformity correction",
      "disc herniation surgery",
    ],
    path: routes.services,
    image: "/images/hospital/emergency_room_wound_care.png",
  },
  patients: {
    title: `Patients & Visitors Guide | Admissions, Emergency Care & Hours`,
    description:
      "Essential guide for patients and visitors: 24/7 emergency care protocols, daily visiting hours, outpatient preparation checklist, and comfortable inpatient recovery amenities.",
    keywords: [
      "patient guide Ubuntu hospital",
      "visiting hours Sunyani hospital",
      "emergency medical care Sunyani",
      "hospital admission checklist Ghana",
      "patient care Bono region",
    ],
    path: routes.patients,
    image: "/images/hospital/ubuntu-knee-replacement.png",
  },
  facilities: {
    title: `Modern Facilities | Operating Theatres & Diagnostic Radiology`,
    description:
      "Tour our ultra-modern sterile laminar flow operating theatres, digital X-ray and ultrasound diagnostic suite, high dependency recovery beds, and private patient suites.",
    keywords: [
      "hospital facilities Sunyani",
      "operating theatre Ghana",
      "digital radiology Sunyani",
      "diagnostic imaging Bono region",
      "modern patient wards Ghana",
    ],
    path: routes.facilities,
    image: "/images/hospital/emergency_room_wound_care.png",
  },
  team: {
    title: `Specialist Team | Orthopaedic Surgeons & Spine Specialists`,
    description:
      "Meet our distinguished multidisciplinary clinical team: leading orthopaedic surgeons, spine care consultants, anaesthesiologists, and certified physiotherapists.",
    keywords: [
      "orthopaedic doctors Ghana",
      "spine surgeon Sunyani",
      "medical consultants Bono region",
      "physiotherapists Ghana",
      "hospital doctors list",
    ],
    path: routes.team,
    image: "/images/hospital/ubuntu-spine-reference.png",
  },
  gallery: {
    title: `Hospital Gallery | Clinical Suites & Patient Spaces in Pictures`,
    description:
      "Explore high-resolution photography showcasing our modern surgical environments, patient care wards, recovery spaces, and welcoming reception in Sunyani, Ghana.",
    keywords: [
      "Ubuntu hospital pictures",
      "hospital photos Sunyani",
      "operating theatre gallery",
      "healthcare facility Ghana photos",
    ],
    path: routes.gallery,
    image: "/images/hospital/emergency_room_wound_care.png",
  },
  contact: {
    title: `Contact Us & Directions | Mantukwa, Sunyani, Ghana`,
    description:
      "Get in touch with Ubuntu Orthopaedic & Spine Hospital. Call +233 20 143 4000, send a WhatsApp enquiry, request an appointment online, or get driving directions to Mantukwa.",
    keywords: [
      "contact Ubuntu hospital",
      "hospital phone number Sunyani",
      "directions to Ubuntu hospital",
      "Mantukwa hospital location",
      "book appointment Sunyani doctor",
    ],
    path: routes.contact,
    image: "/opengraph-image",
  },
  privacy: {
    title: `Privacy Policy | Confidential Patient Data Protection`,
    description:
      "Read our strict patient data protection and medical confidentiality standards compliant with Ghana Data Protection Act and international healthcare privacy guidelines.",
    keywords: ["hospital privacy policy", "patient confidentiality Ghana"],
    path: routes.privacy,
    image: "/opengraph-image",
  },
  legal: {
    title: `Terms & Legal Information | Clinical Services Terms`,
    description:
      "Terms of service, patient rights, hospital guidelines, and general legal notices for Ubuntu Orthopaedic & Spine Hospital.",
    keywords: ["hospital terms of service", "patient rights Ghana"],
    path: routes.legal,
    image: "/opengraph-image",
  },
} as const;

export type PageSeoKey = keyof typeof pageSeoConfig;

/**
 * Helper to generate Next.js Metadata for any public page.
 * Enforces unified formatting, canonical URLs, OpenGraph, Twitter Cards, and Googlebot directives.
 */
export function getPageMetadata(
  pageKey: PageSeoKey,
  overrides?: Partial<Metadata>,
): Metadata {
  const page = pageSeoConfig[pageKey];
  const canonicalUrl = getCanonicalUrl(page.path);
  const imageUrl = page.image.startsWith("http")
    ? page.image
    : `${getBaseUrl()}${page.image.startsWith("/") ? page.image : `/${page.image}`}`;

  const baseMetadata: Metadata = {
    title: page.title,
    description: page.description,
    keywords: [...page.keywords],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: page.title,
      description: page.description,
      url: canonicalUrl,
      siteName: hospitalConfig.name,
      locale: "en_GH",
      type: "website",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${page.title} - ${hospitalConfig.name}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: [imageUrl],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };

  if (!overrides) {
    return baseMetadata;
  }

  return {
    ...baseMetadata,
    ...overrides,
    openGraph: {
      ...baseMetadata.openGraph,
      ...overrides.openGraph,
    },
    twitter: {
      ...baseMetadata.twitter,
      ...overrides.twitter,
    },
  };
}

/* --------------------------------------------------------------------------
   JSON-LD Structured Data Generators (Google Rich Results & AEO Engine)
   -------------------------------------------------------------------------- */

/**
 * Returns schema.org Hospital & MedicalBusiness structured data.
 * Powers Google Knowledge Panel, Local Hospital listings, Google Maps indexing, and AI Search answers.
 */
export function getHospitalJsonLd() {
  const baseUrl = getBaseUrl();
  const phone =
    hospitalConfig.contact.phoneNumbers[0]?.display || "+233 20 143 4000";

  return {
    "@context": "https://schema.org",
    "@type": ["Hospital", "MedicalBusiness", "EmergencyService"],
    "@id": `${baseUrl}#hospital`,
    name: hospitalConfig.name,
    alternateName: [
      hospitalConfig.shortName,
      "Ubuntu Orthopedic & Spine Hospital",
      "Ubuntu Spine Hospital",
    ],
    url: baseUrl,
    logo: {
      "@type": "ImageObject",
      url: `${baseUrl}${hospitalConfig.branding.logoSrc}`,
      caption: hospitalConfig.branding.logoAlt,
    },
    image: `${baseUrl}/opengraph-image`,
    description: hospitalConfig.description,
    slogan: hospitalConfig.tagline,
    telephone: phone,
    email: hospitalConfig.contact.email,
    priceRange: "$$",
    currenciesAccepted: "GHS, USD",
    paymentAccepted: "Cash, Mobile Money, Bank Transfer, Health Insurance",
    hasMap: hospitalConfig.map.directionsHref,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Mantukwa",
      addressLocality: "Sunyani",
      addressRegion: "Bono Region",
      postalCode: "00233",
      addressCountry: "GH",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 7.392772,
      longitude: -2.378656,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "00:00",
        closes: "23:59",
        description: "24/7 Emergency and Inpatient Services",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "17:00",
        description: "Outpatient Specialist Clinics",
      },
    ],
    medicalSpecialty: [
      "https://schema.org/Orthopedics",
      "https://schema.org/Neurosurgery",
      "https://schema.org/PhysicalMedicineAndRehabilitation",
      "https://schema.org/EmergencyMedicine",
    ],
    department: [
      {
        "@type": "MedicalOrganization",
        name: "Spine Surgery & Care Centre",
        description:
          "Specialised surgical and conservative management of spinal disorders and back conditions.",
      },
      {
        "@type": "MedicalOrganization",
        name: "Joint Replacement & Arthroplasty Unit",
        description:
          "Total and partial hip, knee, and shoulder joint replacements.",
      },
      {
        "@type": "MedicalOrganization",
        name: "Trauma and Fracture Care Unit",
        description:
          "Comprehensive fixation and management of acute bone fractures and sports trauma.",
      },
      {
        "@type": "MedicalOrganization",
        name: "Physiotherapy & Rehabilitation Department",
        description:
          "Post-operative and conservative musculoskeletal physical rehabilitation.",
      },
    ],
    availableService: [
      {
        "@type": "MedicalProcedure",
        name: "Spinal Decompression & Fusion",
        procedureType: "https://schema.org/SurgicalProcedure",
      },
      {
        "@type": "MedicalProcedure",
        name: "Total Knee Replacement",
        procedureType: "https://schema.org/SurgicalProcedure",
      },
      {
        "@type": "MedicalProcedure",
        name: "Total Hip Replacement",
        procedureType: "https://schema.org/SurgicalProcedure",
      },
      {
        "@type": "MedicalProcedure",
        name: "Fracture Fixation & Trauma Reconstruction",
        procedureType: "https://schema.org/SurgicalProcedure",
      },
      {
        "@type": "MedicalTherapy",
        name: "Musculoskeletal Physiotherapy",
      },
    ],
    sameAs: hospitalConfig.socialLinks
      .filter((s) => s.href && s.href !== "#")
      .map((s) => s.href),
  };
}

/**
 * Returns schema.org WebSite structured data with SearchAction.
 * Enables Google Sitelinks Searchbox in search results.
 */
export function getWebSiteJsonLd() {
  const baseUrl = getBaseUrl();

  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${baseUrl}#website`,
    url: baseUrl,
    name: hospitalConfig.name,
    alternateName: hospitalConfig.shortName,
    description: hospitalConfig.description,
    publisher: {
      "@id": `${baseUrl}#hospital`,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${getCanonicalUrl(routes.services)}?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export interface BreadcrumbItem {
  name: string;
  path: string;
}

/**
 * Returns schema.org BreadcrumbList structured data.
 * Renders hierarchical rich breadcrumb trails directly on Google Search Results.
 */
export function getBreadcrumbJsonLd(items: BreadcrumbItem[]) {
  const allItems: BreadcrumbItem[] = [
    { name: "Home", path: routes.home },
    ...items.filter((item) => item.path !== routes.home),
  ];

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: allItems.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: getCanonicalUrl(item.path),
    })),
  };
}

/**
 * Returns schema.org FAQPage structured data from hospital FAQ content.
 * Directly activates Google FAQ rich results (accordion dropdowns in SERP) and fuels AI Answer Engines (AEO).
 */
export function getFaqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: hospitalConfig.faqs.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

/**
 * Returns structured medical procedure services list for Google rich indexing.
 */
export function getMedicalServicesJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "@id": `${getCanonicalUrl(routes.services)}#webpage`,
    url: getCanonicalUrl(routes.services),
    name: "Specialist Orthopaedic & Spine Services",
    description: pageSeoConfig.services.description,
    about: [
      {
        "@type": "MedicalCondition",
        name: "Spinal Disc Disorders & Herniation",
      },
      {
        "@type": "MedicalCondition",
        name: "Osteoarthritis of Knee and Hip",
      },
      {
        "@type": "MedicalCondition",
        name: "Bone Fractures and Musculoskeletal Trauma",
      },
    ],
  };
}

/**
 * Generates Physician schemas for medical specialists.
 */
export function getPhysiciansJsonLd(
  teamMembers: Array<{ name: string; role?: string; specialty?: string }>,
) {
  const baseUrl = getBaseUrl();

  return {
    "@context": "https://schema.org",
    "@graph": teamMembers.map((member) => ({
      "@type": "Physician",
      name: member.name,
      jobTitle: member.role || member.specialty || "Medical Specialist",
      worksFor: {
        "@id": `${baseUrl}#hospital`,
      },
    })),
  };
}
