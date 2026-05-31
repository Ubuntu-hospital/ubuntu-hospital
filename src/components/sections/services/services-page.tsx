import Image from "next/image";
import { Check, Phone, ShieldCheck, Stethoscope } from "lucide-react";

import Reveal from "@/components/ui/reveal/reveal.client";
import { hospitalConfig } from "@/config/hospital";
import { servicesPageContent } from "@/content/services";

import ServiceBrowser from "./service-browser.client";
import styles from "./services-page.module.css";

export default function ServicesPage() {
  const primaryPhone = hospitalConfig.contact.phoneNumbers[0];

  return (
    <>
      <section className={styles.hero} id="home">
        <div className={styles.heroTexture} />
        <div className={styles.heroGlow} />
        <div className={styles.heroOrbit} />

        <div className="shell">
          <div className={styles.heroGrid}>
            <Reveal className={styles.heroCopy}>
              <p className={styles.eyebrow}>
                {servicesPageContent.hero.eyebrow}
              </p>

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
                  Request appointment
                </a>
              </div>

              <div className={styles.heroStats}>
                {servicesPageContent.hero.stats.map((stat) => (
                  <div key={stat.label}>
                    <strong>{stat.value}</strong>
                    <span>{stat.label}</span>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal className={styles.heroMedia} delay={0.08}>
              <Image
                src={servicesPageContent.hero.image}
                alt={servicesPageContent.hero.imageAlt}
                width={1100}
                height={1300}
                priority
                sizes="(min-width: 980px) 40vw, 100vw"
              />

              <div className={styles.heroMediaOverlay}>
                <div className={styles.heroMediaCard}>
                  <ShieldCheck size={22} strokeWidth={1.8} />
                  <div>
                    <strong>Coordinated hospital support</strong>
                    <span>Clinical, diagnostic, and recovery services aligned</span>
                  </div>
                </div>

                <div className={styles.heroMediaLabel}>
                  <span>Focused care</span>
                  <strong>From urgent support to guided recovery</strong>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className={styles.emergencyStrip} aria-label="Emergency contact">
        <div className={`shell ${styles.emergencyStripInner}`}>
          <div className={styles.emergencyStripIcon}>
            <Phone size={18} strokeWidth={2} />
          </div>

          <p>
            For urgent medical support, call{" "}
            <a href={primaryPhone.href}>{primaryPhone.display}</a> before your
            arrival so the team can guide you.
          </p>
        </div>
      </section>

      <ServiceBrowser />

      <section className={`${styles.pathwaySection} section`} id="tour">
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

      <section className={`${styles.supportSection} section`} id="about">
        <div className="shell">
          <div className={styles.supportGrid}>
            <Reveal className={styles.supportMedia}>
              <Image
                src={servicesPageContent.support.image}
                alt={servicesPageContent.support.imageAlt}
                width={1000}
                height={1200}
                sizes="(min-width: 980px) 34vw, 100vw"
              />

              <div className={styles.supportMediaOverlay}>
                <div className={styles.supportMediaCard}>
                  <Stethoscope size={20} strokeWidth={1.8} />
                  <div>
                    <strong>Before you arrive</strong>
                    <span>Simple preparation helps the team guide care faster</span>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal className={styles.supportCopy} delay={0.08}>
              <p className={styles.eyebrow}>
                {servicesPageContent.support.eyebrow}
              </p>
              <h2>{servicesPageContent.support.title}</h2>
              <p>{servicesPageContent.support.text}</p>

              <div className={styles.supportPoints}>
                {servicesPageContent.support.points.map((point) => (
                  <span key={point}>
                    <Check size={16} strokeWidth={2} />
                    {point}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className={`${styles.specialistsSection} section`} id="specialists">
        <div className="shell">
          <div className={styles.specialistsShell}>
            <Reveal className={styles.specialistsHeader}>
              <p className={styles.eyebrow}>
                {servicesPageContent.specialists.eyebrow}
              </p>
              <h2>{servicesPageContent.specialists.title}</h2>
              <p>{servicesPageContent.specialists.text}</p>
            </Reveal>

            <div className={styles.specialistsGrid}>
              {hospitalConfig.specialists.people.map((specialist, index) => (
                <Reveal
                  className={styles.specialistCard}
                  delay={index * 0.06}
                  key={`${specialist.name}-${index}`}
                >
                  <div className={styles.specialistImage}>
                    <Image
                      src={specialist.image}
                      alt={specialist.name}
                      width={900}
                      height={1100}
                      sizes="(min-width: 980px) 22vw, 100vw"
                    />

                    <div className={styles.specialistOverlay}>
                      <span>Specialist care</span>
                    </div>
                  </div>

                  <div className={styles.specialistBody}>
                    <strong>{specialist.name}</strong>
                    <p>{specialist.role}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
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

              <a
                className={styles.finalCtaSecondary}
                href={primaryPhone.href}
              >
                Call {primaryPhone.display}
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
