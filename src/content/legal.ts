import { routes } from "@/config/routes";
import { hospitalConfig } from "@/config/hospital";

export type LegalSection = {
  id: string;
  title: string;
  paragraphs?: readonly string[];
  bullets?: readonly string[];
};

export type LegalDocument = {
  eyebrow: string;
  title: string;
  introduction: string;
  effectiveDate: string;
  sections: readonly LegalSection[];
};

export const legalSiteContent = {
  footer: {
    copyright:
      "Copyright 2026 Ubuntu Orthopaedic & Spine Hospital. All rights reserved.",
    links: [
      { label: "Privacy Policy", href: routes.privacy },
      { label: "Terms of Use", href: routes.legal },
    ],
  },

  legal: {
    eyebrow: "Legal information",
    title: "Terms of Use",
    introduction:
      "These terms explain the conditions that apply when you access or use the Ubuntu Orthopaedic & Spine Hospital website.",
    effectiveDate: "2 August 2026",
    sections: [
      {
        id: "website-use",
        title: "Using this website",
        paragraphs: [
          "This website provides general information about the hospital, its focused care areas, services, facilities, and ways to contact us. By continuing to use the website, you agree to these terms.",
        ],
        bullets: [
          "Use the website only for lawful purposes.",
          "Do not attempt to interfere with its security, availability, or operation.",
          "Do not submit false, misleading, abusive, or unlawful information through any form.",
        ],
      },
      {
        id: "medical-information",
        title: "Medical information and emergencies",
        paragraphs: [
          "Website content is provided for general information and does not replace an examination, diagnosis, treatment plan, or advice from a qualified healthcare professional.",
          "The website is not an emergency service. If you need urgent medical support, call the hospital directly or contact the appropriate emergency service.",
        ],
      },
      {
        id: "appointments",
        title: "Appointment requests",
        paragraphs: [
          "Submitting an appointment request does not create a confirmed appointment or a clinician-patient relationship. An appointment is confirmed only when the hospital contacts you and agrees the date, time, and service.",
          "You are responsible for providing accurate contact and appointment information so the hospital can respond appropriately.",
        ],
      },
      {
        id: "content",
        title: "Content and intellectual property",
        paragraphs: [
          "Unless otherwise stated, the hospital owns or is authorised to use the website design, branding, written content, and other materials. You may view and print reasonable extracts for personal, non-commercial use.",
          "Clinical and stock imagery may be used under separate public-domain or open licences. Those materials remain subject to the terms attached to their original source where applicable.",
        ],
      },
      {
        id: "third-parties",
        title: "Third-party services and links",
        paragraphs: [
          "The website may link to maps, messaging services, email providers, social platforms, or other third-party services. Their availability, content, and privacy practices are controlled by their respective providers, not by the hospital.",
        ],
      },
      {
        id: "availability",
        title: "Accuracy and availability",
        paragraphs: [
          "We aim to keep website information accurate and available, but services, clinicians, visiting arrangements, contact details, and other information may change. Please contact the hospital to confirm information that is important to your care or visit.",
          "To the extent permitted by Ghanaian law, the hospital is not responsible for loss arising solely from website interruption, technical failure, or reliance on general website information instead of professional advice.",
        ],
      },
      {
        id: "law",
        title: "Governing law and updates",
        paragraphs: [
          "These terms are governed by the laws of the Republic of Ghana. We may update them when the website, hospital services, or legal requirements change. The effective date above identifies the current version.",
        ],
      },
      {
        id: "contact",
        title: "Contact us",
        paragraphs: [
          `Questions about these terms can be sent to ${hospitalConfig.contact.email} or raised by calling ${hospitalConfig.contact.phoneNumbers[0].display}.`,
        ],
      },
    ],
  } satisfies LegalDocument,

  privacy: {
    eyebrow: "Your information",
    title: "Privacy Policy",
    introduction:
      "This policy explains how Ubuntu Orthopaedic & Spine Hospital handles personal information provided through this website and related hospital contact channels.",
    effectiveDate: "2 August 2026",
    sections: [
      {
        id: "scope",
        title: "Who this policy applies to",
        paragraphs: [
          "This policy applies to patients, prospective patients, visitors, representatives, and other people who use the website, submit an appointment request, or contact the hospital through a channel linked from the website.",
          "Ubuntu Orthopaedic & Spine Hospital is responsible for the personal information it collects for these purposes and processes it in accordance with applicable Ghanaian data-protection requirements, including the Data Protection Act, 2012 (Act 843).",
        ],
      },
      {
        id: "information-collected",
        title: "Information we may collect",
        bullets: [
          "Identity and contact details, including your name, telephone number, and email address.",
          "Appointment details, including your preferred date, requested service, and any note you choose to provide.",
          "Messages and records of communications with the hospital.",
          "Basic technical information needed to operate and secure the website, such as device, browser, server-log, and network information.",
          "Health-related information only when you choose to include it in an appointment note or communication.",
        ],
      },
      {
        id: "use",
        title: "How we use information",
        bullets: [
          "Respond to enquiries and appointment requests.",
          "Coordinate the requested hospital service and communicate next steps.",
          "Provide safe, appropriate care and maintain relevant operational records.",
          "Protect the website, patients, staff, and hospital systems from misuse or security threats.",
          "Meet legal, regulatory, professional, and record-keeping obligations.",
          "Improve hospital communications and website performance using aggregated or non-identifying information where practical.",
        ],
      },
      {
        id: "sharing",
        title: "When information may be shared",
        paragraphs: [
          "We do not sell personal information. Information may be shared only where necessary with authorised hospital staff, clinicians involved in care, trusted service providers supporting hospital operations, regulators or public authorities where legally required, or another healthcare provider when authorised or necessary for appropriate care.",
          "Service providers are expected to handle information confidentially and only for the agreed service.",
        ],
      },
      {
        id: "retention",
        title: "Retention and security",
        paragraphs: [
          "We keep personal information only for as long as reasonably necessary for the purpose for which it was collected and to satisfy applicable clinical, legal, regulatory, accounting, or operational requirements.",
          "The hospital uses reasonable administrative, organisational, and technical safeguards designed to prevent unauthorised access, loss, misuse, alteration, or disclosure. No internet transmission or storage system can be guaranteed to be completely secure.",
        ],
      },
      {
        id: "cookies",
        title: "Cookies and linked services",
        paragraphs: [
          "The public website may use essential technical storage required for security and core functionality. Administrative areas use authentication cookies for authorised staff access.",
          "When you follow a link to WhatsApp, maps, email, or another third-party service, that provider may process information under its own privacy terms.",
        ],
      },
      {
        id: "rights",
        title: "Your data-protection rights",
        paragraphs: [
          "Subject to Ghanaian law and appropriate identity verification, you may ask whether we hold your personal information, request access or correction, object to certain processing, withdraw consent where processing relies on consent, or raise a concern about how your information is handled.",
          "You may also contact Ghana's Data Protection Commission if you believe your data-protection rights have been infringed.",
        ],
      },
      {
        id: "contact",
        title: "Privacy enquiries",
        paragraphs: [
          `Send privacy requests or questions to ${hospitalConfig.contact.email}, call ${hospitalConfig.contact.phoneNumbers[0].display}, or write to ${hospitalConfig.name}, ${hospitalConfig.contact.address}. Please do not send urgent medical requests through a privacy enquiry.`,
        ],
      },
      {
        id: "updates",
        title: "Policy updates",
        paragraphs: [
          "We may revise this policy when our website practices, hospital operations, or legal obligations change. The effective date above shows when this version took effect.",
        ],
      },
    ],
  } satisfies LegalDocument,
} as const;
