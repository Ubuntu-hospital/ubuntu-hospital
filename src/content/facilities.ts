export type FacilityCategoryId =
  | "all"
  | "clinical"
  | "recovery"
  | "support";

export type FacilitySpaceCategoryId = Exclude<
  FacilityCategoryId,
  "all"
>;

export type FacilityIconName =
  | "activity"
  | "bed"
  | "building"
  | "coffee"
  | "cross"
  | "flask"
  | "pill"
  | "scan"
  | "stethoscope";

export type FacilitySpace = {
  id: string;
  title: string;
  shortText: string;
  description: string;
  image: string;
  imageAlt: string;
  icon: FacilityIconName;
  category: FacilitySpaceCategoryId;
  features: readonly string[];
};

export const facilitiesPageContent = {
  hero: {
    eyebrow: "The facility",
    title: "Designed for focused care.",
    text: "Explore the spaces supporting consultation, diagnosis, treatment, comfort, and recovery at Ubuntu Hospital.",

    image:
      "https://images.pexels.com/photos/7563452/pexels-photo-7563452.jpeg?auto=compress&cs=tinysrgb&w=1800",

    imageAlt:
      "Modern hospital ward with clean beds and clinical equipment",

    stats: [
      {
        value: "10",
        label: "Hospital services",
      },
      {
        value: "01",
        label: "Connected facility",
      },
      {
        value: "360°",
        label: "Patient support",
      },
    ],
  },

  explorer: {
    eyebrow: "Explore the hospital",
    title: "Spaces with purpose.",
    text: "Select an area to see how each part of the facility supports the patient experience.",
  },

  standard: {
    eyebrow: "Inside Ubuntu",
    title: "Modern spaces. Human attention.",
    text: "Every environment is designed to support clinical focus while keeping the patient experience calm and clear.",

    image:
      "https://images.pexels.com/photos/16679932/pexels-photo-16679932.jpeg?auto=compress&cs=tinysrgb&w=1600",

    imageAlt:
      "Medical professionals working inside a modern operating room",

    points: [
      {
        number: "01",
        title: "Clinical focus",
        text: "Purpose-built spaces support clear medical decisions and specialist care.",
      },
      {
        number: "02",
        title: "Patient comfort",
        text: "The hospital environment is designed to feel calm, organised, and welcoming.",
      },
      {
        number: "03",
        title: "Connected recovery",
        text: "Consultation, treatment, and rehabilitation stay within one coordinated pathway.",
      },
    ],
  },

  visit: {
    eyebrow: "Plan your visit",
    title: "See the hospital in person.",
    text: "Request an appointment or contact the hospital team for directions and visit guidance.",
  },
} as const;

export const facilityCategories = [
  {
    id: "all",
    label: "All spaces",
  },
  {
    id: "clinical",
    label: "Clinical areas",
  },
  {
    id: "recovery",
    label: "Recovery spaces",
  },
  {
    id: "support",
    label: "Patient support",
  },
] as const;

export const facilitySpaces: readonly FacilitySpace[] = [
  {
    id: "reception-opd",
    title: "Reception and OPD",
    shortText: "A clear first point of contact for patients and visitors.",
    description:
      "The reception and outpatient areas are designed to make arrival simple. Patients can receive guidance, complete the required steps, and begin their consultation journey with clarity.",
    image:
      "https://images.pexels.com/photos/20041996/pexels-photo-20041996.jpeg?auto=compress&cs=tinysrgb&w=1600",
    imageAlt: "Modern hospital consultation and reception environment",
    icon: "stethoscope",
    category: "clinical",
    features: [
      "Patient guidance",
      "Specialist consultations",
      "Clear arrival support",
    ],
  },
  {
    id: "diagnostic-imaging",
    title: "Diagnostic Imaging",
    shortText: "On-site imaging for faster clinical decisions.",
    description:
      "Diagnostic imaging supports timely assessments and helps the clinical team make informed decisions without unnecessary delays.",
    image:
      "https://images.pexels.com/photos/7659564/pexels-photo-7659564.jpeg?auto=compress&cs=tinysrgb&w=1600",
    imageAlt: "Modern hospital diagnostic imaging environment",
    icon: "scan",
    category: "clinical",
    features: [
      "On-site imaging",
      "Faster assessments",
      "Connected reporting",
    ],
  },
  {
    id: "laboratory",
    title: "Laboratory",
    shortText: "Reliable testing within the hospital facility.",
    description:
      "The laboratory supports diagnosis with clinical testing that helps the medical team understand each patient's condition more clearly.",
    image:
      "https://images.pexels.com/photos/3735709/pexels-photo-3735709.jpeg?auto=compress&cs=tinysrgb&w=1600",
    imageAlt: "Laboratory professional working inside a clinical laboratory",
    icon: "flask",
    category: "clinical",
    features: [
      "Clinical testing",
      "Reliable support",
      "Coordinated diagnosis",
    ],
  },
  {
    id: "operating-rooms",
    title: "Operating Rooms",
    shortText: "Purpose-built environments for specialist procedures.",
    description:
      "The operating rooms are designed to support specialist procedures in a controlled clinical environment with the required focus and coordination.",
    image:
      "https://images.pexels.com/photos/16679932/pexels-photo-16679932.jpeg?auto=compress&cs=tinysrgb&w=1600",
    imageAlt: "Medical professionals working in an operating room",
    icon: "cross",
    category: "clinical",
    features: [
      "Specialist procedures",
      "Controlled environment",
      "Clinical coordination",
    ],
  },
  {
    id: "wards",
    title: "Modern Wards",
    shortText: "Comfortable spaces for attentive inpatient care.",
    description:
      "Hospital wards provide a calm environment for patients who require monitoring, support, and recovery care after treatment.",
    image:
      "https://images.pexels.com/photos/7563452/pexels-photo-7563452.jpeg?auto=compress&cs=tinysrgb&w=1600",
    imageAlt: "Clean modern hospital ward with patient beds",
    icon: "bed",
    category: "recovery",
    features: [
      "Inpatient support",
      "Comfortable spaces",
      "Attentive monitoring",
    ],
  },
  {
    id: "physiotherapy",
    title: "Physiotherapy",
    shortText: "Rehabilitation spaces built around safe progress.",
    description:
      "Physiotherapy spaces support movement, strength, and safe recovery through guided rehabilitation designed around each patient's needs.",
    image:
      "https://images.pexels.com/photos/20860620/pexels-photo-20860620.jpeg?auto=compress&cs=tinysrgb&w=1600",
    imageAlt: "Physiotherapist assisting a patient during rehabilitation",
    icon: "activity",
    category: "recovery",
    features: [
      "Mobility support",
      "Guided rehabilitation",
      "Recovery planning",
    ],
  },
  {
    id: "pharmacy",
    title: "Pharmacy",
    shortText: "Convenient access to prescribed medication.",
    description:
      "The pharmacy keeps the patient experience connected by providing access to prescribed medication and practical guidance within the hospital.",
    image:
      "https://images.pexels.com/photos/8657300/pexels-photo-8657300.jpeg?auto=compress&cs=tinysrgb&w=1600",
    imageAlt: "Hospital pharmacy with organised medication shelves",
    icon: "pill",
    category: "support",
    features: [
      "Prescription support",
      "Convenient access",
      "Patient guidance",
    ],
  },
  {
    id: "cafeteria",
    title: "Cafeteria",
    shortText: "A comfortable refreshment area for visitors.",
    description:
      "The cafeteria provides a convenient place for patients, visitors, and families during their time at the hospital.",
    image:
      "https://images.pexels.com/photos/3768126/pexels-photo-3768126.jpeg?auto=compress&cs=tinysrgb&w=1600",
    imageAlt: "Modern cafeteria seating area",
    icon: "coffee",
    category: "support",
    features: [
      "Visitor comfort",
      "Refreshment area",
      "Convenient access",
    ],
  },
  {
    id: "administration",
    title: "Administration",
    shortText: "Clear support throughout the hospital experience.",
    description:
      "The administration team helps patients and visitors navigate appointments, enquiries, and the practical steps involved in receiving care.",
    image:
      "https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=1600",
    imageAlt: "Hospital administration professional assisting a visitor",
    icon: "building",
    category: "support",
    features: [
      "Appointment guidance",
      "Patient enquiries",
      "Visitor support",
    ],
  },
] as const;