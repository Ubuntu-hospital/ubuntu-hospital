import Image from "next/image";
import {
  CalendarDays,
  Check,
  MapPin,
  Phone,
  ShieldCheck,
} from "lucide-react";

import { hospitalConfig } from "@/config/hospital";
import { facilitiesPageContent } from "@/content/facilities";

import { FacilityExplorer } from "./facility-explorer.client";
import styles from "./facilities-page.module.css";
import Reveal from "@/components/ui/reveal/reveal.client";
import Tour from "../home/tour/tour.client";

export function FacilitiesPage() {
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
            <p className={styles.eyebrow}>
              {facilitiesPageContent.hero.eyebrow}
            </p>

            <h1>{facilitiesPageContent.hero.title}</h1>

            <p className={styles.heroText}>
              {facilitiesPageContent.hero.text}
            </p>

            <div className={styles.heroActions}>
              <a
                className={styles.primaryAction}
                href="#facility-explorer"
              >
                Explore the facility
              </a>

              <a
                className={styles.secondaryAction}
                href="/#booking"
              >
                <CalendarDays size={16} />
                Book appointment
              </a>
            </div>

            <div className={styles.heroStats}>
              {facilitiesPageContent.hero.stats.map((item) => (
                <div key={item.label}>
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal className={styles.heroMedia} delay={0.1}>
            <Image
              src={facilitiesPageContent.hero.image}
              alt={facilitiesPageContent.hero.imageAlt}
              fill
              priority
              sizes="(max-width: 980px) 100vw, 54vw"
            />

            <div className={styles.heroMediaOverlay} />
            <div className={styles.heroMediaCurve} />

            <div className={styles.heroMediaBadge}>
              <ShieldCheck size={16} strokeWidth={1.7} />
              Purpose-built spaces
            </div>

            <div className={styles.heroMediaCard}>
              <span>Inside Ubuntu Hospital</span>

              <strong>
                Spaces designed for care and recovery.
              </strong>
            </div>
          </Reveal>
        </div>
      </section>

      <section className={styles.facilityStrip}>
        <div className={`shell ${styles.facilityStripInner}`}>
          <span className={styles.facilityStripIcon}>
            <MapPin size={20} strokeWidth={1.7} />
          </span>

          <div>
            <small>Visit the hospital</small>

            <h2>{hospitalConfig.contact.address}</h2>
          </div>

          <a href="/contact">
            Plan your visit
          </a>
        </div>
      </section>

      <FacilityExplorer />

      <section className={styles.standardSection}>
        <div className={styles.standardTexture} />
        <div className={styles.standardOrbitOne} />
        <div className={styles.standardOrbitTwo} />

        <div className={`shell ${styles.standardGrid}`}>
          <Reveal className={styles.standardMedia}>
            <Image
              src={facilitiesPageContent.standard.image}
              alt={facilitiesPageContent.standard.imageAlt}
              fill
              sizes="(max-width: 980px) 100vw, 50vw"
            />

            <div className={styles.standardMediaOverlay} />

            <div className={styles.standardMediaCard}>
              <span>Specialist facility</span>

              <strong>
                Clinical focus without losing the human touch.
              </strong>
            </div>
          </Reveal>

          <Reveal className={styles.standardCopy} delay={0.08}>
            <p className={styles.eyebrowInverse}>
              {facilitiesPageContent.standard.eyebrow}
            </p>

            <h2>{facilitiesPageContent.standard.title}</h2>

            <p className={styles.standardText}>
              {facilitiesPageContent.standard.text}
            </p>

            <div className={styles.standardPoints}>
              {facilitiesPageContent.standard.points.map((point) => (
                <div className={styles.standardPoint} key={point.number}>
                  <span>{point.number}</span>

                  <div>
                    <h3>{point.title}</h3>
                    <p>{point.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <Tour />

      <section className={styles.visitSection}>
        <div className={styles.visitOrbitOne} />
        <div className={styles.visitOrbitTwo} />

        <div className={`shell ${styles.visitGrid}`}>
          <Reveal>
            <p className={styles.visitEyebrow}>
              {facilitiesPageContent.visit.eyebrow}
            </p>

            <h2>{facilitiesPageContent.visit.title}</h2>

            <p>{facilitiesPageContent.visit.text}</p>
          </Reveal>

          <Reveal
            className={styles.visitActions}
            delay={0.08}
          >
            <a
              className={styles.visitPrimary}
              href="/#booking"
            >
              Book appointment
            </a>

            <a
              className={styles.visitSecondary}
              href={primaryPhone.href}
            >
              <Phone size={16} />
              Call hospital
            </a>
          </Reveal>
        </div>
      </section>

    </>
  );
}