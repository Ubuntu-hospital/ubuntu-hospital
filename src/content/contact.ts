export const contactPageContent = {
  hero: {
    eyebrow: "Contact Ubuntu Hospital",
    title: "Reach the right team.",
    text: "Call, send a message, or use the map to plan your visit. The hospital team is available to guide you to the right point of care.",

    note: "For urgent medical support, call the hospital directly before your arrival.",
  },

  channels: {
    eyebrow: "Contact channels",
    title: "Choose what works best.",
    text: "Use the channel that matches your request. WhatsApp is available for quick enquiries and directions.",
  },

  location: {
    eyebrow: "Hospital location",
    title: "Plan your visit.",
    text: "Use the live map for directions and call ahead when you need additional guidance.",

    notes: [
      "Use the directions button to open the route in Google Maps.",
      "Call the hospital team when you need help locating the facility.",
      "Request an appointment before visiting for a specialist consultation.",
    ],
  },

  visit: {
    eyebrow: "Before your visit",
    title: "Arrive prepared.",
    text: "A few simple steps can help the hospital team support you more efficiently.",

    steps: [
      {
        number: "01",
        title: "Choose a channel",
        text: "Call, send a WhatsApp message, or request an appointment online.",
      },
      {
        number: "02",
        title: "Share your request",
        text: "Briefly explain whether you need directions, a consultation, or general support.",
      },
      {
        number: "03",
        title: "Plan your arrival",
        text: "Use the map and follow the guidance provided by the hospital team.",
      },
    ],
  },

  support: {
    label: "Appointment support",
    title: "Need help before your visit?",
    text: "Use the booking form or speak directly with the hospital team.",
  },
} as const;
