export const aboutPageContent = {
  hero: {
    eyebrow: "About Ubuntu Hospital",
    title: "Built around recovery.",
    text: "Ubuntu brings specialist orthopaedic and spine care into one calm, coordinated hospital experience.",

    image:
      "https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=1800",

    imageAlt: "Modern hospital exterior with a clean entrance",

    points: [
      {
        icon: "stethoscope",
        title: "Specialist focus",
        text: "Orthopaedic and spine care supported by a clear clinical pathway.",
      },
      {
        icon: "shield",
        title: "Modern facility",
        text: "Clinical spaces designed to support confident care decisions.",
      },
      {
        icon: "heart",
        title: "Patient first",
        text: "A hospital experience shaped around dignity, clarity, and support.",
      },
    ],
  },

  story: {
    eyebrow: "Our approach",
    title: "Purpose in every step.",
    text: "A modern hospital should make care easier to understand. Each stage is connected so patients can move forward with greater confidence.",

    steps: [
      {
        number: "01",
        title: "Listen",
        text: "Begin with a clear understanding of the patient's needs.",
      },
      {
        number: "02",
        title: "Plan",
        text: "Coordinate diagnosis and treatment around the right clinical path.",
      },
      {
        number: "03",
        title: "Support",
        text: "Stay present through treatment, recovery, and follow-up care.",
      },
    ],
  },

  commitment: {
    eyebrow: "The care experience",
    title: "Modern care. Human attention.",
    text: "Technology and specialist knowledge matter. The patient experience matters just as much.",

    image:
      "https://images.pexels.com/photos/8312841/pexels-photo-8312841.jpeg?auto=compress&cs=tinysrgb&w=1400",

    imageAlt: "Doctor discussing a treatment plan with a patient",

    points: [
      "Clear communication throughout the care journey.",
      "Coordinated support from consultation to recovery.",
      "A calm hospital environment designed around patients.",
      "Specialist attention backed by practical guidance.",
    ],
  },
} as const;