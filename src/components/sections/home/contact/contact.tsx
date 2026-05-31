"use client";

import {
  Navigation as NavigationIcon,
  MessageCircle,
  Phone,
} from "lucide-react";

import { hospitalConfig } from "@/config/hospital";
import Button from "@/components/ui/button/button";
import Reveal from "@/components/ui/reveal/reveal.client";
import SectionIntro from "@/components/ui/section-intro/section-intro";

export default function Contact() {
  const primaryPhone = hospitalConfig.contact.phoneNumbers[0];

  return (
    <section className="section contact-section" id="contact">
      <div className="shell">
        <SectionIntro
          eyebrow="Find the hospital"
          title="Easy to reach."
          text="Use the map, call either hospital line, or send a WhatsApp message."
        />

        <div className="contact-layout">
          <Reveal className="contact-map-frame">
            <div className="contact-map-topline">
              <div className="contact-map-heading">
                <span>{hospitalConfig.map.label}</span>
                <strong>{hospitalConfig.contact.address}</strong>
              </div>

              <div className="contact-map-actions">
                <a
                  href={hospitalConfig.map.directionsHref}
                  target="_blank"
                  rel="noreferrer"
                >
                  <NavigationIcon size={15} />
                  Directions
                </a>

                <a href={primaryPhone.href}>
                  <Phone size={15} />
                  Call
                </a>
              </div>
            </div>

            <iframe
              title={hospitalConfig.map.title}
              src={hospitalConfig.map.iframeSrc}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </Reveal>

          <div className="contact-panel">
            <Reveal className="contact-address-block">
              <span>Visit the hospital</span>
              <h3>{hospitalConfig.contact.address}</h3>
            </Reveal>

            <div className="contact-lines">
              {hospitalConfig.contact.phoneNumbers.map((phone) => (
                <a href={phone.href} key={phone.label}>
                  <span className="contact-line-icon">
                    <Phone size={17} />
                  </span>

                  <div>
                    <small>{phone.label}</small>
                    <strong>{phone.display}</strong>
                  </div>
                </a>
              ))}

              <a
                href={hospitalConfig.contact.whatsapp.href}
                target="_blank"
                rel="noreferrer"
              >
                <span className="contact-line-icon">
                  <MessageCircle size={17} />
                </span>

                <div>
                  <small>{hospitalConfig.contact.whatsapp.label}</small>
                  <strong>{hospitalConfig.contact.whatsapp.display}</strong>
                </div>
              </a>
            </div>

            <Button href={hospitalConfig.contact.appointmentHref}>
              Book an appointment
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
