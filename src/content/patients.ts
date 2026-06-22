export const patientPageContent = {
  hero: {
    eyebrow: "Patient information",
    title: "Plan your visit with confidence.",
    text: "Quick information for emergency care, visiting hours, inpatient admission, and outpatient appointments.",
    image:
      "https://images.pexels.com/photos/7089401/pexels-photo-7089401.jpeg?auto=compress&cs=tinysrgb&w=1800",
    imageAlt:
      "Healthcare professional speaking with a patient in a hospital setting",
  },

  overview: [
    {
      title: "Emergency care",
      text: "Urgent care guidance before arrival.",
      href: "#emergency-care",
    },
    {
      title: "Visiting hours",
      text: "Hospital visiting times at a glance.",
      href: "#visiting-hours",
    },
    {
      title: "Inpatient guide",
      text: "What to bring for admission.",
      href: "#inpatient-guide",
    },
    {
      title: "Outpatient guide",
      text: "How to prepare for clinic visits.",
      href: "#outpatient-guide",
    },
  ],

  emergencyCare: {
    eyebrow: "Emergency care",
    title: "Emergency Care",
    text: "Call the hospital first when urgent support is needed.",
    points: [
      "Call before arrival for urgent support.",
      "Bring any recent reports or prescriptions.",
      "Share key symptoms or injuries clearly.",
    ],
  },

  visitingHours: {
    title: "Visiting Hours",
    text: "Please follow the approved ward visiting periods and speak with the hospital team before arrival.",
    times: [
      {
        label: "Morning",
        time: "10:00 AM – 12:00 PM",
      },
      {
        label: "Afternoon",
        time: "3:00 PM – 5:00 PM",
      },
      {
        label: "Evening",
        time: "6:00 PM – 7:00 PM",
      },
    ],
  },

  inpatientGuide: {
    eyebrow: "Inpatient guide",
    title: "Inpatient Guide",
    text: "Bring the essentials needed for a smooth admission.",
    points: [
      "Valid identification and hospital paperwork.",
      "Previous reports, scans, and current medications.",
      "Only necessary personal items.",
    ],
  },

  outpatientGuide: {
    eyebrow: "Outpatient guide",
    title: "Outpatient Guide",
    text: "Arrive prepared for consultation and review.",
    points: [
      "Bring reports, prescriptions, and questions.",
      "Explain symptoms or progress clearly.",
      "Follow review instructions after the visit.",
    ],
  },
} as const;
