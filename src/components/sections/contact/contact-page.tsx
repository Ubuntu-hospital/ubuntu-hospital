import Image from "next/image";
import {
  CalendarDays,
  Check,
  Clock3,
  Mail,
  MapPin,
  Navigation as NavigationIcon,
  Phone,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";
import type { ReactNode } from "react";
import { WhatsAppIcon } from "@/components/ui/icons/whatsapp-icon";
import { hospitalConfig } from "@/config/hospital";
import { contactPageContent } from "@/content/contact";

import styles from "./contact-page.module.css";
import Reveal from "@/components/ui/reveal/reveal.client";
import Socials from "../home/socials/socials";
import Faqs from "../home/faqs/faqs";
import FinalCta from "../home/final-cta/final-cta";

type ContactChannel = {
  id: string;
  label: string;
  value: string;
  text: string;
  action: string;
  href: string;
  icon: ReactNode;
  external?: boolean;
  whatsapp?: boolean;
};

export function ContactPage({
  heroImageOverride,
}: {
  heroImageOverride?: { image: string; alt: string };
}) {
  const primaryPhone = hospitalConfig.contact.phoneNumbers[0];
  const heroImageSrc =
    heroImageOverride?.image || hospitalConfig.hero.buildingImage;
  const heroImageAlt =
    heroImageOverride?.alt || hospitalConfig.hero.buildingAlt;

  const directionsHref = hospitalConfig.map.directionsHref;

  const phoneChannels: ContactChannel[] =
    hospitalConfig.contact.phoneNumbers.map((phone, index) => ({
      id: `phone-${index}`,
      label: phone.label,
      value: phone.display,
      text:
        index === 0
          ? "For general enquiries, urgent support, and hospital guidance."
          : "For appointment enquiries and support before your visit.",
      action: "Call hospital",
      href: phone.href,
      icon:
        index === 0 ? (
          <Phone size={21} strokeWidth={1.6} />
        ) : (
          <CalendarDays size={21} strokeWidth={1.6} />
        ),
    }));

  const contactChannels: ContactChannel[] = [
    ...phoneChannels,
    {
      id: "whatsapp",
      label: hospitalConfig.contact.whatsapp.label,
      value: hospitalConfig.contact.whatsapp.display,
      text: "Send a message for directions, appointments, or general enquiries.",
      action: "Open WhatsApp",
      href: hospitalConfig.contact.whatsapp.href,
      icon: <WhatsAppIcon size={21} />,
      external: true,
      whatsapp: true,
    },
    {
      id: "email",
      label: "Email",
      value: hospitalConfig.contact.email,
      text: "Send non-urgent questions or general information requests.",
      action: "Send email",
      href: `mailto:${hospitalConfig.contact.email}`,
      icon: <Mail size={21} strokeWidth={1.6} />,
    },
  ];

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroTexture} />
        <div className={styles.heroGlow} />
        <div className={styles.heroOrbitLarge} />
        <div className={styles.heroOrbitSmall} />

        <div className={`shell ${styles.heroGrid}`}>
          <Reveal className={styles.heroCopy}>
            <p className={styles.eyebrow}>{contactPageContent.hero.eyebrow}</p>

            <h1>{contactPageContent.hero.title}</h1>

            <p className={styles.heroText}>{contactPageContent.hero.text}</p>

            <div className={styles.heroActions}>
              <a
                className={styles.primaryAction}
                href={hospitalConfig.contact.appointmentHref}
              >
                <CalendarDays size={16} />
                Book appointment
              </a>

              <a className={styles.secondaryAction} href={primaryPhone.href}>
                <Phone size={16} />
                Call hospital
              </a>
            </div>

            <div className={styles.heroNote}>
              <ShieldCheck size={18} strokeWidth={1.6} />

              <p>{contactPageContent.hero.note}</p>
            </div>
          </Reveal>

          <Reveal className={styles.heroMedia} delay={0.1}>
            <Image
              src={heroImageSrc}
              alt={heroImageAlt}
              fill
              priority
              unoptimized
              sizes="(max-width: 980px) 100vw, 54vw"
            />

            <div className={styles.heroMediaOverlay} />
            <div className={styles.heroMediaCurve} />

            <div className={styles.heroLocationCard}>
              <span className={styles.heroLocationIcon}>
                <MapPin size={19} strokeWidth={1.7} />
              </span>

              <div>
                <small>Visit the hospital</small>

                <strong>{hospitalConfig.contact.address}</strong>
              </div>
            </div>

            <a className={styles.heroPhoneCard} href={primaryPhone.href}>
              <Phone size={16} />

              <div>
                <small>{primaryPhone.label}</small>
                <strong>{primaryPhone.display}</strong>
              </div>
            </a>
          </Reveal>
        </div>
      </section>

      <section
        className={styles.channelsSection}
        id="contact-channels"
        aria-labelledby="contact-channels-title"
      >
        <div className={`shell ${styles.channelsShell}`}>
          <div className={styles.sectionHeading}>
            <Reveal>
              <p className={styles.eyebrow}>
                {contactPageContent.channels.eyebrow}
              </p>

              <h2 id="contact-channels-title">
                {contactPageContent.channels.title}
              </h2>

              <p>{contactPageContent.channels.text}</p>
            </Reveal>
          </div>

          <div className={styles.channelsGrid}>
            {contactChannels.map((channel, index) => (
              <Reveal
                className={styles.channelCard}
                delay={index * 0.06}
                key={channel.id}
              >
                <span
                  className={
                    channel.whatsapp
                      ? `${styles.channelIcon} ${styles.channelIconWhatsapp}`
                      : styles.channelIcon
                  }
                >
                  {channel.icon}
                </span>

                <small>{channel.label}</small>

                <strong>{channel.value}</strong>

                <p>{channel.text}</p>

                <a
                  href={channel.href}
                  target={channel.external ? "_blank" : undefined}
                  rel={channel.external ? "noreferrer" : undefined}
                >
                  {channel.action}
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section
        className={styles.locationSection}
        id="location"
        aria-labelledby="location-title"
      >
        <div className={`shell ${styles.locationGrid}`}>
          <Reveal className={styles.locationCopy}>
            <p className={styles.eyebrow}>
              {contactPageContent.location.eyebrow}
            </p>

            <h2 id="location-title">{contactPageContent.location.title}</h2>

            <p className={styles.locationText}>
              {contactPageContent.location.text}
            </p>

            <address className={styles.addressCard}>
              <span className={styles.addressIcon}>
                <MapPin size={18} strokeWidth={1.7} />
              </span>

              <div>
                <small>Hospital address</small>

                <strong>{hospitalConfig.contact.address}</strong>
              </div>
            </address>

            <div className={styles.locationActions}>
              <a
                className={styles.primaryAction}
                href={directionsHref}
                target="_blank"
                rel="noreferrer"
              >
                <NavigationIcon size={16} />
                Get directions
              </a>

              <a className={styles.secondaryAction} href={primaryPhone.href}>
                <Phone size={16} />
                Call for guidance
              </a>
            </div>

            <div className={styles.locationNotes}>
              {contactPageContent.location.notes.map((note) => (
                <div key={note}>
                  <span>
                    <Check size={14} strokeWidth={2.1} />
                  </span>

                  <p>{note}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal className={styles.mapFrame} delay={0.08}>
            <div className={styles.mapTopbar}>
              <div>
                <small>Live map</small>

                <strong>{hospitalConfig.map.label}</strong>
              </div>

              <MapPin size={18} strokeWidth={1.7} />
            </div>

            <iframe
              title={hospitalConfig.map.title}
              src={hospitalConfig.map.iframeSrc}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </Reveal>
        </div>
      </section>

      <section className={styles.visitSection}>
        <div className={styles.visitTexture} />

        <div className={`shell ${styles.visitGrid}`}>
          <Reveal className={styles.visitCopy}>
            <p className={styles.eyebrowInverse}>
              {contactPageContent.visit.eyebrow}
            </p>

            <h2>{contactPageContent.visit.title}</h2>

            <p>{contactPageContent.visit.text}</p>
          </Reveal>

          <div className={styles.visitSteps}>
            {contactPageContent.visit.steps.map((step, index) => (
              <Reveal
                className={styles.visitStep}
                delay={index * 0.08}
                key={step.number}
              >
                <span>{step.number}</span>

                <div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.supportStrip}>
        <div className={`shell ${styles.supportStripInner}`}>
          <span className={styles.supportStripIcon}>
            <Stethoscope size={21} strokeWidth={1.6} />
          </span>

          <div>
            <small>{contactPageContent.support.label}</small>

            <h2>{contactPageContent.support.title}</h2>

            <p>{contactPageContent.support.text}</p>
          </div>

          <a
            className={styles.supportStripAction}
            href={hospitalConfig.contact.appointmentHref}
          >
            Book appointment
          </a>
        </div>
      </section>

      <Socials />
      <Faqs />
      <FinalCta />
    </>
  );
}
