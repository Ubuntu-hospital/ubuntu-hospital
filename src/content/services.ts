export type ServiceCategoryId =
  | "access"
  | "diagnostics"
  | "treatment"
  | "medication"
  | "support";

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
  {
    id: "support",
    label: "Patient support",
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
    id: "general-surgery",
    title: "General Surgery",
    shortText: "Surgical assessment and coordinated operative care.",
    description:
      "General Surgery provides consultation, operative care, and follow-up through a coordinated surgical pathway built around patient safety.",
    icon: "stethoscope",
    category: "treatment",
    highlights: [
      "Surgical consultations",
      "Elective and emergency procedures",
      "Postoperative review",
    ],
  },
  {
    id: "medicine",
    title: "Medicine",
    shortText: "General medical assessment, treatment, and follow-up.",
    description:
      "The Medicine Department evaluates and manages general medical conditions, supporting patients with clear diagnosis, treatment, and ongoing clinical review.",
    icon: "stethoscope",
    category: "treatment",
    highlights: [
      "General medical consultations",
      "Management of acute and chronic conditions",
      "Clinical follow-up",
    ],
  },
  {
    id: "x-ray",
    title: "X-Ray",
    shortText: "On-site imaging for faster clinical decisions.",
    description:
      "Our general X-Ray service provides timely diagnostic imaging to support clinical assessment, treatment planning, and follow-up care.",
    icon: "scan",
    category: "diagnostics",
    highlights: [
      "General X-Ray services",
      "On-site diagnostic imaging",
      "Coordinated clinical reporting",
    ],
  },
  {
    id: "laboratory",
    title: "Laboratory",
    shortText: "Reliable testing within the hospital facility.",
    description:
      "Our modern laboratory delivers accurate, timely, and reliable diagnostic testing across four core service areas.",
    icon: "flask",
    category: "diagnostics",
    highlights: [
      "Chemical Pathology — liver and kidney function, electrolytes, lipid profile, glucose, urea, creatinine, PSA, HbA1c, C-reactive protein, and uric acid",
      "Haematology — full blood count, blood film, ESR, coagulation profile, hepatitis screening, sickling, haemoglobin genotype, typhoid, and preoperative screening",
      "Microbiology — wound swab, blood, urine, and other specimen cultures with sensitivity testing",
      "Blood Bank — blood grouping, cross-matching, donor screening, and safe blood products",
    ],
  },
  {
    id: "physiotherapy",
    title: "Physiotherapy",
    shortText: "Guided rehabilitation focused on safe recovery.",
    description:
      "Physiotherapy provides individualised rehabilitation, mobility support, and therapeutic care for recovery, independence, and long-term function.",
    icon: "activity",
    category: "treatment",
    highlights: [
      "Neurological rehabilitation, including stroke and spinal cord injury",
      "Casting and splinting, including patella tendon-bearing, below-knee, and above-knee casts",
      "Preoperative and postoperative rehabilitation",
      "Gait training and mobility re-education",
      "Full-body massage",
      "Congenital musculoskeletal care, including clubfoot and cerebral palsy",
      "Electrotherapy services",
      "Sports injury rehabilitation",
    ],
  },
  {
    id: "neurosurgery",
    title: "Neurosurgery",
    shortText: "Specialist surgical care for neurological conditions.",
    description:
      "Neurosurgery offers specialist evaluation and surgical management for conditions affecting the brain, spinal cord, and peripheral nerves.",
    icon: "activity",
    category: "treatment",
    highlights: [
      "Specialist neurological assessment",
      "Surgical treatment planning",
      "Coordinated recovery support",
    ],
  },
  {
    id: "pain-management",
    title: "Pain Management",
    shortText: "Focused assessment and relief for persistent pain.",
    description:
      "Pain Management combines careful assessment with an individual care plan to reduce pain, restore function, and improve quality of life.",
    icon: "activity",
    category: "treatment",
    highlights: [
      "Individual pain assessment",
      "Non-surgical pain interventions",
      "Ongoing symptom review",
    ],
  },
  {
    id: "neurology",
    title: "Neurology",
    shortText: "Diagnosis and care for nervous system conditions.",
    description:
      "Neurology supports the diagnosis and medical management of conditions affecting the brain, spinal cord, nerves, and muscles.",
    icon: "activity",
    category: "treatment",
    highlights: [
      "Neurological consultation",
      "Diagnostic assessment",
      "Long-term condition management",
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
  {
    id: "cafeteria",
    title: "Cafeteria",
    shortText: "Convenient refreshments for patients and visitors.",
    description:
      "The hospital cafeteria provides a convenient place for patients, visitors, and staff to access refreshments during their time at the hospital.",
    icon: "pill",
    category: "support",
    highlights: [
      "On-site convenience",
      "Patient and visitor access",
      "Refreshments during hospital hours",
    ],
  },
] as const;
