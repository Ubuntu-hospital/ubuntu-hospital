import Image from "next/image";
import { CalendarDays, Phone } from "lucide-react";

import { hospitalConfig } from "@/config/hospital";
import { patientPageContent } from "@/content/patients";
import Reveal from "@/components/ui/reveal/reveal.client";
import SectionIntro from "@/components/ui/section-intro/section-intro";
import PatientJourney from "@/components/sections/home/patient-journey/patient-journey";
import Faqs from "@/components/sections/home/faqs/faqs";
import Booking from "@/components/sections/home/booking/booking";

import styles from "./patients-page.module.css";

export function PatientsPage() {
  const primaryPhone = hospitalConfig.contact.phoneNumbers[0];

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroTexture} />
        <div className={styles.heroGlow} />
        <div className={styles.heroOrbitLarge} />
        <div className={styles.heroOrbitSmall} />

        <div className={`shell ${styles.heroGrid}`}>
          <Reveal className={styles.heroCopy}>
            <p className={styles.eyebrow}>{patientPageContent.hero.eyebrow}</p>

            <h1>{patientPageContent.hero.title}</h1>

            <p className={styles.heroText}>{patientPageContent.hero.text}</p>

            <div className={styles.heroActions}>
              <a className={styles.primaryAction} href="#emergency-care">
                Emergency guidance
              </a>

              <a
                className={styles.secondaryAction}
                href={hospitalConfig.contact.appointmentHref}
              >
                <CalendarDays size={16} strokeWidth={1.9} />
                Book appointment
              </a>
            </div>
          </Reveal>

          <Reveal className={styles.heroMedia} delay={0.1}>
            <Image
              src={patientPageContent.hero.image}
              alt={patientPageContent.hero.imageAlt}
              fill
              priority
              sizes="(max-width: 980px) 100vw, 54vw"
            />

            <div className={styles.heroMediaOverlay} />

            <div className={styles.heroMediaCard}>
              <span>Before your visit</span>
              <strong>
                Guidance for patients, admissions, and clinic reviews.
              </strong>
            </div>
          </Reveal>
        </div>
      </section>

      <section
        className={`section ${styles.emergencySection}`}
        id="emergency-care"
      >
        <div className="shell">
          <div className={styles.emergencyGrid}>
            <SectionIntro
              eyebrow={patientPageContent.emergencyCare.eyebrow}
              title={patientPageContent.emergencyCare.title}
              text={patientPageContent.emergencyCare.text}
            />

            <Reveal className={styles.emergencyCard} delay={0.08}>
              <div className={styles.emergencyPoints}>
                {patientPageContent.emergencyCare.points.map((point) => (
                  <p key={point}>{point}</p>
                ))}
              </div>

              <a className={styles.emergencyAction} href={primaryPhone.href}>
                <Phone size={16} strokeWidth={1.9} />
                Call {primaryPhone.display}
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      <PatientJourney />

      <section className={`section texture-warm ${styles.guidesSection}`}>
        <div className="shell">
          <div className={styles.guidesIntro}>
            <SectionIntro
              eyebrow="Patient guides"
              title="Useful guidance for planned visits."
              text="Key information for visits, admission, and clinic reviews."
            />
          </div>

          <div className={styles.guidesStack}>
            <article className={styles.visitingGuide} id="visiting-hours">
              <Reveal className={styles.guidePanel}>
                <div className={styles.guidePanelHead}>
                  <h3>{patientPageContent.visitingHours.title}</h3>
                  <p>{patientPageContent.visitingHours.text}</p>
                </div>

                <div className={styles.timeGrid}>
                  {patientPageContent.visitingHours.times.map((item) => (
                    <div className={styles.timeBlock} key={item.label}>
                      <span>{item.label}</span>
                      <strong>{item.time}</strong>
                    </div>
                  ))}
                </div>
              </Reveal>
            </article>

            <div className={styles.guideColumns}>
              <article id="inpatient-guide">
                <Reveal className={styles.guidePanel} delay={0.06}>
                  <div className={styles.guidePanelHead}>
                    <h3>{patientPageContent.inpatientGuide.title}</h3>
                    <p>{patientPageContent.inpatientGuide.text}</p>
                  </div>

                  <div className={styles.guideList}>
                    {patientPageContent.inpatientGuide.points.map((point) => (
                      <p key={point}>{point}</p>
                    ))}
                  </div>
                </Reveal>
              </article>

              <article id="outpatient-guide">
                <Reveal className={styles.guidePanel} delay={0.12}>
                  <div className={styles.guidePanelHead}>
                    <h3>{patientPageContent.outpatientGuide.title}</h3>
                    <p>{patientPageContent.outpatientGuide.text}</p>
                  </div>

                  <div className={styles.guideList}>
                    {patientPageContent.outpatientGuide.points.map((point) => (
                      <p key={point}>{point}</p>
                    ))}
                  </div>
                </Reveal>
              </article>
            </div>
          </div>
        </div>
      </section>

      <Faqs />
      <Booking />
    </>
  );
}
