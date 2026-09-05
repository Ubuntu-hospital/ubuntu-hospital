import Image from "next/image";
import { CalendarDays } from "lucide-react";

import Reveal from "@/components/ui/reveal/reveal.client";
import { hospitalConfig } from "@/config/hospital";
import { servicesPageContent } from "@/content/services";

import ServiceBrowser from "./service-browser.client";
import styles from "./services-page.module.css";
import HeroHighlights from "../home/hero-highlights/hero-highlights";

export default function ServicesPage({
  heroImageOverride,
  beforeYouVisitImageOverride,
}: {
  heroImageOverride?: { image: string; alt: string };
  beforeYouVisitImageOverride?: { image: string; alt: string };
}) {
  const primaryPhone = hospitalConfig.contact.phoneNumbers[0];
  const heroImageSrc =
    heroImageOverride?.image || servicesPageContent.hero.image;
  const heroImageAlt =
    heroImageOverride?.alt || servicesPageContent.hero.imageAlt;

  const visitImageSrc =
    beforeYouVisitImageOverride?.image || servicesPageContent.support.image;
  const visitImageAlt =
    beforeYouVisitImageOverride?.alt || servicesPageContent.support.imageAlt;

  return (
    <>
      <section className={styles.hero} id="home">
        <div className={styles.heroTexture} />
        <div className={styles.heroGlow} />
        <div className={styles.heroOrbit} />

        <div className={`shell ${styles.heroGrid}`}>
          <Reveal className={styles.heroCopy}>
            <p className={styles.eyebrow}>{servicesPageContent.hero.eyebrow}</p>

            <div className={styles.heroText}>
              <h1>{servicesPageContent.hero.title}</h1>
              <p>{servicesPageContent.hero.text}</p>
            </div>

            <div className={styles.heroActions}>
              <a className={styles.primaryAction} href="#services">
                Explore services
              </a>

              <a
                className={styles.secondaryAction}
                href={hospitalConfig.contact.appointmentHref}
              >
                <CalendarDays size={16} strokeWidth={1.9} />
                Request appointment
              </a>
            </div>
          </Reveal>

          <Reveal className={styles.heroMedia} delay={0.08}>
            <Image
              src={heroImageSrc}
              alt={heroImageAlt}
              fill
              priority
              unoptimized
              sizes="(max-width: 980px) 100vw, 54vw"
            />

            <div className={styles.heroMediaOverlay} />
          </Reveal>
        </div>
      </section>

      <section className={styles.emergencyStrip} aria-label="Emergency contact">
        <div className={`shell ${styles.emergencyStripInner}`}>
          <p>
            For urgent medical support, call{" "}
            <a href={primaryPhone.href}>{primaryPhone.display}</a> before your
            arrival so the team can guide you.
          </p>
        </div>
      </section>

      <div id="services">
        <ServiceBrowser />
      </div>
      <HeroHighlights />

      <section className={`${styles.pathwaySection} section`} id="pathway">
        <div className="shell">
          <div className={styles.pathwayShell}>
            <Reveal className={styles.pathwayHeading}>
              <p className={styles.eyebrow}>
                {servicesPageContent.pathway.eyebrow}
              </p>

              <h2>{servicesPageContent.pathway.title}</h2>

              <p>{servicesPageContent.pathway.text}</p>
            </Reveal>

            <div className={styles.pathwayTrack}>
              <div className={styles.pathwayLine} />

              {servicesPageContent.pathway.steps.map((step, index) => (
                <Reveal
                  className={styles.pathwayStep}
                  delay={index * 0.06}
                  key={step.number}
                >
                  <span className={styles.pathwayNumber}>{step.number}</span>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={`${styles.supportSection} section`} id="visit">
        <div className={`shell ${styles.supportGrid}`}>
          <Reveal className={styles.supportMedia}>
            <Image
              src={visitImageSrc}
              alt={visitImageAlt}
              fill
              unoptimized
              sizes="(max-width: 980px) 100vw, 42vw"
            />

            <div className={styles.supportMediaOverlay} />
          </Reveal>

          <Reveal className={styles.supportCopy} delay={0.08}>
            <p className={styles.eyebrow}>
              {servicesPageContent.support.eyebrow}
            </p>

            <h2>{servicesPageContent.support.title}</h2>

            <p>{servicesPageContent.support.text}</p>

            <div className={styles.supportPoints}>
              {servicesPageContent.support.points.map((point) => (
                <span key={point}>{point}</span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className={styles.finalCta} id="contact">
        <div className={styles.finalCtaOrbitOne} />
        <div className={styles.finalCtaOrbitTwo} />

        <div className="shell">
          <Reveal className={styles.finalCtaGrid}>
            <div>
              <p className={styles.finalCtaEyebrow}>
                {servicesPageContent.finalCta.eyebrow}
              </p>

              <h2>{servicesPageContent.finalCta.title}</h2>

              <p>{servicesPageContent.finalCta.text}</p>
            </div>

            <div className={styles.finalCtaActions}>
              <a
                className={styles.finalCtaPrimary}
                href={hospitalConfig.contact.appointmentHref}
              >
                Request appointment
              </a>

              <a className={styles.finalCtaSecondary} href={primaryPhone.href}>
                Call {primaryPhone.display}
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
