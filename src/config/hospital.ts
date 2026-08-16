export const hospitalConfig = {
  name: "Ubuntu Orthopaedic & Spine Hospital",

  brandName: {
    primary: "Ubuntu",
    specialty: "Orthopaedic & Spine",
    facility: "Hospital",
  },

  branding: {
    logoSrc: "/ubuntu-hospital-logo.png",
    logomarkSrc: "/ubuntu-logomark.png",
    logoAlt: "Ubuntu Orthopaedic and Spine Hospital logo",
    logomarkAlt: "Ubuntu Orthopaedic and Spine Hospital symbol",
  },

  shortName: "Ubuntu Hospital",
  tagline: "We are because you are.",
  description:
    "Specialist orthopaedic and spine care delivered in a modern facility designed around confident recovery.",

  navigation: [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    {
      label: "Services",
      href: "/services",
      children: [
        { label: "Service Overview", href: "/services#home" },
        { label: "Clinical Services", href: "/services#services" },
        { label: "Care Pathway", href: "/services#pathway" },
        { label: "Before Your Visit", href: "/services#visit" },
      ],
    },
    { label: "Tour", href: "/#tour" },
    {
      label: "Patients",
      href: "/patients",
      children: [
        { label: "Emergency Care", href: "/patients#emergency-care" },
        { label: "Visiting Hours", href: "/patients#visiting-hours" },
        { label: "Inpatient Guide", href: "/patients#inpatient-guide" },
        { label: "Outpatient Guide", href: "/patients#outpatient-guide" },
      ],
    },
    { label: "Contact Us", href: "/contact" },
    {
      label: "Gallery",
      href: "/gallery",
    },
  ],

  contact: {
    phoneNumbers: [
      {
        label: "Main line",
        display: "+233 20 143 4000",
        href: "tel:+233201434000",
      },
      {
        label: "Appointments",
        display: "+233 54 990 5216",
        href: "tel:+233549905216",
      },
    ],

    whatsapp: {
      label: "WhatsApp",
      display: "+233 20 143 4000",
      href: "https://wa.me/233201434000",
    },

    email: "info@ubuntuhospital.com",
    address: "Mantukwa, Sunyani, Ghana",
    appointmentHref: "/#booking",
  },

  whatsappSupport: {
    title: "How can we help?",
    text: "Choose a quick enquiry or send a message to the hospital team.",

    inquiries: [
      "I would like to book an appointment.",
      "I need directions to the hospital.",
      "I would like to ask about the available services.",
      "I would like to speak with the hospital team.",
    ],
  },

  hero: {
    eyebrow: "Specialised care. Lasting impact.",
    title: "Stronger Bones.",
    accentTitle: "Better Lives.",
    text: "Expert orthopaedic and spine care built around you.",

    buildingImage:
      "https://images.pexels.com/photos/36938793/pexels-photo-36938793.jpeg?auto=compress&cs=tinysrgb&w=2200",

    buildingAlt: "Modern specialist hospital exterior with a glass facade",

    spineImage: "/images/hospital/ubuntu-spine-reference.png",

    spineAlt:
      "Anatomical spine illustration with highlighted intervertebral discs",

    orbitSteps: ["Diagnose", "Treat", "Recover"],

    features: [
      {
        title: "Specialist Care",
        text: "Orthopaedic and spine expertise you can trust.",
        icon: "stethoscope",
      },
      {
        title: "Advanced Technology",
        text: "Modern facilities for accurate diagnosis.",
        icon: "shield",
      },
      {
        title: "Patient First",
        text: "Personalised care for better outcomes.",
        icon: "users",
      },
      {
        title: "Compassionate Support",
        text: "Support at every stage of your journey.",
        icon: "heart-handshake",
      },
    ],

    focusAreas: [
      {
        title: "Spine",
        text: ["Back pain", "Disorders of the spine"],
        image:
          "/images/hospital/ubuntu-spinal-pain.png",
        alt: "An image showing the spinal column",
      },
      {
        title: "Trauma",
        text: ["Bone injuries", "Muscle injuries", "Joint injuries"],
        image:
          "/images/hospital/ubuntu-knee-replacement.png",
        alt: "A total knee joint replacement",
      },
      {
        title: "General orthopaedics",
        text: ["Joint replacement", "Sports medicine", "Rehabilitation"],
        image:
          "/images/hospital/emergency_room_wound_care.png",
        alt: "An image showing a traumatic hand fracture",
      },
    ],
  },

  services: [
    {
      title: "Emergency",
      text: "Prompt support when urgent care cannot wait.",
      icon: "siren",
    },
    {
      title: "OPD",
      text: "Specialist consultations and patient assessments.",
      icon: "stethoscope",
    },
    {
      title: "X-Ray",
      text: "On-site imaging for faster clinical decisions.",
      icon: "scan",
    },
    {
      title: "Pharmacy",
      text: "Convenient access to prescribed medication.",
      icon: "pill",
    },
    {
      title: "Laboratory",
      text: "Reliable testing within the hospital facility.",
      icon: "flask",
    },
    {
      title: "Physiotherapy",
      text: "Guided rehabilitation focused on safe recovery.",
      icon: "activity",
    },
    {
      title: "Operating Rooms",
      text: "Purpose-built spaces for specialist procedures.",
      icon: "cross",
    },
    {
      title: "Wards",
      text: "Comfortable spaces for attentive inpatient care.",
      icon: "bed",
    },
    {
      title: "Administration",
      text: "Clear support throughout your hospital experience.",
      icon: "building",
    },
    {
      title: "Cafeteria",
      text: "A comfortable refreshment area for patients and visitors.",
      icon: "coffee",
    },
  ],

  about: {
    eyebrow: "About the hospital",
    title: "We are because you are.",
    text: "At Ubuntu Orthopaedic and spine Hospital, its all about HUMANITY",

    image:
      "https://images.pexels.com/photos/8312841/pexels-photo-8312841.jpeg?auto=compress&cs=tinysrgb&w=1400",

    imageAlt: "Doctor consulting a patient in a modern clinical space",

    highlights: [
      "Specialist medical teams",
      "Modern clinical environments",
      "Coordinated recovery support",
    ],
  },

  standard: {
    eyebrow: "The Ubuntu standard",
    title: "Care shaped by values.",
    text: "The name Ubuntu reflects the standard behind each patient experience.",

    mission: {
      eyebrow: "Our mission",
      title: "Innovative and exceptional care.",
      text: "To provide innovative and exceptional care in the diagnosis, treatment, and rehabilitation of musculoskeletal and spinal conditions. We are dedicated to improving the quality of life for our patients through advanced medical technologies, innovative treatment options, and a compassionate approach.",
    },

    vision: {
      eyebrow: "Our vision",
      title: "Premier orthopaedic and spine care.",
      text: "To be the premier centre for orthopaedic and spine care in West Africa and beyond, dedicated to innovative treatment, patient-centred services, and community education. This vision emphasises the hospital's commitment to excellence in specialised medical care, highlighting the need for advanced treatment modalities that cater to the unique needs of the West African population. Our multidisciplinary team of specialists is committed to fostering a healing environment that promotes recovery. Together, we strive to be a leader in orthopaedic and spine health, empowering our patients to lead active, fulfilling lives.",

      image:
        "https://images.pexels.com/photos/18445755/pexels-photo-18445755.jpeg?auto=compress&cs=tinysrgb&w=1400",

      imageAlt:
        "Medical professionals walking outside a modern healthcare facility",
    },

    values: [
      {
        letter: "U",
        word: "Unity",
        text: "Unity of purpose.",
      },
      {
        letter: "B",
        word: "Best quality",
        text: "Best quality services.",
      },
      {
        letter: "U",
        word: "Universal",
        text: "Universal and non-discriminatory.",
      },
      {
        letter: "N",
        word: "Novel",
        text: "Novel and innovative.",
      },
      {
        letter: "T",
        word: "Teamwork",
        text: "Teamwork.",
      },
      {
        letter: "U",
        word: "Upholding",
        text: "Upholding discipline.",
      },
    ],
  },

  tour: {
    eyebrow: "Facility tour",
    title: "Step inside Ubuntu.",
    text: "Explore the spaces designed for consultation, treatment, comfort, and recovery.",

    poster:
      "https://images.pexels.com/photos/29948395/pexels-photo-29948395.jpeg?auto=compress&cs=tinysrgb&w=1800",

    videoId: "LvmyAjVhSK8",

    chapters: ["Reception", "Clinical spaces", "Operating rooms", "Recovery"],
  },

  journey: {
    eyebrow: "Patient journey",
    title: "A clear path forward.",
    text: "Every stage is designed to feel simple, informed, and supported.",

    steps: [
      {
        number: "01",
        title: "Book a visit",
        text: "Call, message, or request an appointment online.",
        icon: "calendar",
      },
      {
        number: "02",
        title: "Meet a specialist",
        text: "Receive an assessment and a clear treatment plan.",
        icon: "stethoscope",
      },
      {
        number: "03",
        title: "Begin recovery",
        text: "Move forward with coordinated treatment and support.",
        icon: "activity",
      },
    ],
  },

  specialists: {
    eyebrow: "Specialist team",
    title: "Expertise you can trust.",
    text: "Introduce the professionals behind the care.",

    people: [
      {
        name: "Dr. Specialist Name",
        role: "Orthopaedic Specialist",

        image:
          "https://images.pexels.com/photos/7578806/pexels-photo-7578806.jpeg?auto=compress&cs=tinysrgb&w=1000",
      },
      {
        name: "Dr. Specialist Name",
        role: "Spine Specialist",

        image:
          "https://images.pexels.com/photos/14797917/pexels-photo-14797917.jpeg?auto=compress&cs=tinysrgb&w=1000",
      },
      {
        name: "Dr. Specialist Name",
        role: "Physiotherapy Specialist",

        image:
          "https://images.pexels.com/photos/19963126/pexels-photo-19963126.jpeg?auto=compress&cs=tinysrgb&w=1000",
      },
    ],
  },

  facilities: {
    eyebrow: "The facility",
    title: "Built for focused care.",
    text: "A closer look at the spaces supporting treatment and recovery.",

    items: [
      {
        title: "Modern wards",
        text: "Comfortable spaces for attentive inpatient care.",

        image:
          "https://images.pexels.com/photos/7563452/pexels-photo-7563452.jpeg?auto=compress&cs=tinysrgb&w=1400",

        alt: "Modern hospital ward with patient beds",
      },
      {
        title: "Operating rooms",
        text: "Purpose-built environments for specialist procedures.",

        image:
          "https://images.pexels.com/photos/16679932/pexels-photo-16679932.jpeg?auto=compress&cs=tinysrgb&w=1400",

        alt: "Medical professionals inside an operating room",
      },
      {
        title: "Consultation spaces",
        text: "Calm clinical rooms for assessments and care planning.",

        image:
          "https://images.pexels.com/photos/20041996/pexels-photo-20041996.jpeg?auto=compress&cs=tinysrgb&w=1400",

        alt: "Clean modern hospital consultation room",
      },
      {
        title: "Physiotherapy support",
        text: "Rehabilitation spaces built around safe progress.",

        image:
          "https://images.pexels.com/photos/20860620/pexels-photo-20860620.jpeg?auto=compress&cs=tinysrgb&w=1400",

        alt: "Physiotherapist supporting a patient during an exercise",
      },
    ],
  },

  testimonials: {
    eyebrow: "Patient voices",
    title: "Care people remember.",
    text: "Replace these sample entries with approved patient feedback.",

    items: [
      {
        quote:
          "The process felt organised from the first consultation. Every step was explained clearly.",
        name: "Patient Name",
        context: "Orthopaedic care",
      },
      {
        quote:
          "The team made recovery feel less overwhelming. I always knew what the next step was.",
        name: "Patient Name",
        context: "Physiotherapy support",
      },
      {
        quote:
          "The environment is calm, modern, and professional. The attention to detail stood out.",
        name: "Patient Name",
        context: "Hospital visit",
      },
    ],
  },

  booking: {
    eyebrow: "Appointments",
    title: "Request a visit.",
    text: "Share a few details and the hospital team can contact you to confirm your appointment.",
    urgentNote: "For urgent medical support, call the hospital directly.",
  },

  faqs: {
    eyebrow: "Frequently asked questions",
    title: "Before your visit.",
    text: "Quick answers to help you prepare and reach the right team.",

    items: [
      {
        question: "How do I book an appointment?",
        answer:
          "Use the appointment request form, call either hospital line, or send a WhatsApp message. The hospital team will contact you to confirm the available date and time.",
      },
      {
        question: "Can I visit the hospital for emergency care?",
        answer:
          "Yes. For urgent medical support, call the hospital directly so the team can guide you before your arrival.",
      },
      {
        question: "What should I bring for my first visit?",
        answer:
          "Bring a valid form of identification, any previous medical reports, test results, prescriptions, and a list of medications you currently use.",
      },
      {
        question: "Does the hospital provide physiotherapy?",
        answer:
          "Yes. Physiotherapy and rehabilitation support are available as part of the hospital's coordinated recovery services.",
      },
      {
        question: "Can I ask for directions through WhatsApp?",
        answer:
          "Yes. Use the WhatsApp support button and select the directions enquiry. The hospital team can guide you to the facility.",
      },
      {
        question: "How can I speak with the hospital team?",
        answer:
          "Call either hospital line or use the WhatsApp support button. You can select a quick enquiry or type your own message.",
      },
    ],
  },

  socialLinks: [
    {
      label: "Instagram",
      handle: "@ubuntu_hospital",
      href: "#",
      icon: "instagram",
    },
    {
      label: "Facebook",
      handle: "Ubuntu Hospital",
      href: "#",
      icon: "facebook",
    },
    {
      label: "LinkedIn",
      handle: "Ubuntu Hospital",
      href: "#",
      icon: "linkedin",
    },
    {
      label: "YouTube",
      handle: "Ubuntu Hospital",
      href: "#",
      icon: "youtube",
    },
  ],

map: {
  label: "Visit Ubuntu Hospital",
  title: "Ubuntu Orthopaedic and Spine Hospital location",

  iframeSrc:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3956.652566077575!2d-2.3786560249989854!3d7.392771992617036!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdac900080dde87%3A0x80a1760fee5785f3!2sUbuntu%20Orthopedic%20%26%20Spine%20Hospital!5e0!3m2!1sen!2sgh!4v1786878325880!5m2!1sen!2sgh",

  directionsHref:
    "https://www.google.com/maps/dir/?api=1&destination=7.392771992617036,-2.3786560249989854",
},

} as const;
