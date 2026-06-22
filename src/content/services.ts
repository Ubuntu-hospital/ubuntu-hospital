export type ServiceCategoryId =
  | "access"
  | "diagnostics"
  | "treatment"
  | "medication";

export type ServiceIconName =
  | "activity"
  | "flask"
  | "pill"
  | "scan"
  | "siren"
  | "stethoscope";

export type HospitalService = {
  id: string;
  title: string;
  shortText: string;
  description: string;
  icon: ServiceIconName;
  category: ServiceCategoryId;
  highlights: readonly string[];
};

export const servicesPageContent = {
  hero: {
    eyebrow: "Hospital services",
    title: "Specialist care, connected.",
    text: "From your first consultation to recovery, essential hospital services stay coordinated around your care.",
    image:
      "https://images.pexels.com/photos/33812023/pexels-photo-33812023.jpeg?auto=compress&cs=tinysrgb&w=1800",
    imageAlt: "Modern hospital corridor with seating and clinical rooms",
  },

  browser: {
    eyebrow: "Explore services",
    title: "Find the right care.",
  },

  pathway: {
    eyebrow: "Connected care",
    title: "One clear pathway.",
    text: "Each service supports a different stage of the patient journey without making the experience complicated.",
    steps: [
      {
        number: "01",
        title: "Consult",
        text: "Start with an assessment and a clear discussion of your needs.",
      },
      {
        number: "02",
        title: "Diagnose",
        text: "Use the required tests and imaging to guide the next step.",
      },
      {
        number: "03",
        title: "Treat",
        text: "Receive care through the appropriate clinical service.",
      },
      {
        number: "04",
        title: "Recover",
        text: "Move forward with follow-up support and rehabilitation.",
      },
    ],
  },

  support: {
    eyebrow: "Before your visit",
    title: "Come prepared.",
    text: "A few simple details can help the clinical team understand your needs faster and guide you more clearly.",
    image:
      "https://images.pexels.com/photos/8312841/pexels-photo-8312841.jpeg?auto=compress&cs=tinysrgb&w=1400",
    imageAlt: "Doctor discussing care with a patient in a modern hospital",
    points: [
      "Bring previous reports and test results where available.",
      "Keep a list of medications you currently use.",
      "Call ahead when you need urgent medical support.",
    ],
  },

  finalCta: {
    eyebrow: "Your next step",
    title: "Start with the right team.",
    text: "Request an appointment or call the hospital for guidance on the service you need.",
  },
} as const;

export const serviceCategories = [
  {
    id: "access",
    label: "Access and urgent care",
  },
  {
    id: "diagnostics",
    label: "Diagnostics",
  },
  {
    id: "treatment",
    label: "Treatment and recovery",
  },
  {
    id: "medication",
    label: "Medication support",
  },
] as const;

export const hospitalServices: readonly HospitalService[] = [
  {
    id: "emergency",
    title: "Emergency",
    shortText: "Prompt support when urgent care cannot wait.",
    description:
      "Emergency care provides a clear first point of contact for patients who need urgent medical attention and arrival guidance.",
    icon: "siren",
    category: "access",
    highlights: [
      "Urgent medical support",
      "Direct hospital contact",
      "Clear arrival guidance",
    ],
  },
  {
    id: "opd",
    title: "OPD",
    shortText: "Specialist consultations and patient assessments.",
    description:
      "The outpatient department supports consultations, clinical reviews, and the first step towards an appropriate care plan.",
    icon: "stethoscope",
    category: "access",
    highlights: [
      "Clinical assessment",
      "Specialist consultation",
      "Treatment planning",
    ],
  },
  {
    id: "x-ray",
    title: "X-Ray",
    shortText: "On-site imaging for faster clinical decisions.",
    description:
      "X-Ray services support timely imaging and help the medical team make informed clinical decisions without unnecessary delays.",
    icon: "scan",
    category: "diagnostics",
    highlights: [
      "On-site imaging",
      "Faster clinical review",
      "Coordinated reporting",
    ],
  },
  {
    id: "laboratory",
    title: "Laboratory",
    shortText: "Reliable testing within the hospital facility.",
    description:
      "Laboratory services support the diagnostic process with testing that helps clinicians understand the patient's condition more clearly.",
    icon: "flask",
    category: "diagnostics",
    highlights: [
      "Clinical testing",
      "Reliable support",
      "Connected diagnosis",
    ],
  },
  {
    id: "physiotherapy",
    title: "Physiotherapy",
    shortText: "Guided rehabilitation focused on safe recovery.",
    description:
      "Physiotherapy supports mobility, strength, and safe progress through guided rehabilitation designed around the patient's recovery needs.",
    icon: "activity",
    category: "treatment",
    highlights: [
      "Guided rehabilitation",
      "Mobility support",
      "Recovery planning",
    ],
  },
  {
    id: "pharmacy",
    title: "Pharmacy",
    shortText: "Convenient access to prescribed medication.",
    description:
      "The pharmacy gives patients convenient access to prescribed medication and helps keep treatment support connected within the hospital.",
    icon: "pill",
    category: "medication",
    highlights: [
      "Prescription support",
      "Medication guidance",
      "Convenient access",
    ],
  },
] as const;