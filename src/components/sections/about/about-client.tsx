import Image from "next/image";
import {
  CalendarDays,
  Check,
  HeartHandshake,
  Phone,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";

import { hospitalConfig } from "@/config/hospital";
import { aboutPageContent } from "@/content/about";

import styles from "./about-page.module.css";
import Facilities from "../home/facilities/facilities";
import Testimonials from "../home/testimonials/testimonials.client";
import FinalCta from "../home/final-cta/final-cta";
import Reveal from "@/components/ui/reveal/reveal.client";
import About from "../home/about/about";
import UbuntuStandard from "../home/ubuntu-standard/ubuntu-standard";

const identityIcons = {
  stethoscope: Stethoscope,
  shield: ShieldCheck,
  heart: HeartHandshake,
} as const;

export function AboutPage() {
  const primaryPhone = hospitalConfig.contact.phoneNumbers[0];

  return (
    <>
      {/* <section className={styles.hero}>
        <div className={styles.heroTexture} />
        <div className={styles.heroGlow} />
        <div className={styles.heroOrbitLarge} />
        <div className={styles.heroOrbitSmall} />

        <div className={`shell ${styles.heroGrid}`}>
          <Reveal className={styles.heroCopy}>
            <p className={styles.eyebrow}>
              {aboutPageContent.hero.eyebrow}
            </p>

            <h1>{aboutPageContent.hero.title}</h1>

            <p className={styles.heroText}>
              {aboutPageContent.hero.text}
            </p>

            <div className={styles.heroActions}>
              <a className={styles.primaryAction} href="/#booking">
                <CalendarDays size={16} />
                Book appointment
              </a>

              <a className={styles.secondaryAction} href={primaryPhone.href}>
                <Phone size={16} />
                Call hospital
              </a>
            </div>
          </Reveal>

          <Reveal className={styles.heroMedia} delay={0.1}>
            <Image
              src={aboutPageContent.hero.image}
              alt={aboutPageContent.hero.imageAlt}
              fill
              priority
              sizes="(max-width: 980px) 100vw, 54vw"
            />

            <div className={styles.heroMediaOverlay} />
            <div className={styles.heroMediaCurve} />

            <div className={styles.heroMediaLabel}>
              <span>{hospitalConfig.shortName}</span>
              <strong>Specialist care with purpose.</strong>
            </div>
          </Reveal>
        </div>
      </section>

      <section className={styles.identityStrip}>
        <div className={`shell ${styles.identityGrid}`}>
          {aboutPageContent.hero.points.map((item, index) => {
            const Icon = identityIcons[item.icon];

            return (
              <Reveal
                className={styles.identityItem}
                delay={index * 0.07}
                key={item.title}
              >
                <span className={styles.identityIcon}>
                  <Icon size={21} strokeWidth={1.6} />
                </span>

                <div>
                  <h2>{item.title}</h2>
                  <p>{item.text}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className={styles.storySection}>
        <div className={styles.storyTexture} />

        <div className={`shell ${styles.storyGrid}`}>
          <Reveal className={styles.storyIntro}>
            <p className={styles.eyebrow}>
              {aboutPageContent.story.eyebrow}
            </p>

            <h2>{aboutPageContent.story.title}</h2>

            <p>{aboutPageContent.story.text}</p>
          </Reveal>

          <div className={styles.storySteps}>
            {aboutPageContent.story.steps.map((step, index) => (
              <Reveal
                className={styles.storyStep}
                delay={index * 0.09}
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
      </section> */}

      <UbuntuStandard />

       <About />

      {/* <section className={styles.commitmentSection}>
        <div className={styles.commitmentOrbitOne} />
        <div className={styles.commitmentOrbitTwo} />

        <div className={`shell ${styles.commitmentGrid}`}>
          <Reveal className={styles.commitmentMedia}>
            <Image
              src={aboutPageContent.commitment.image}
              alt={aboutPageContent.commitment.imageAlt}
              fill
              sizes="(max-width: 980px) 100vw, 50vw"
            />

            <div className={styles.commitmentMediaOverlay} />

            <div className={styles.commitmentMediaCard}>
              <span>Patient first</span>
              <strong>Care should feel clear and personal.</strong>
            </div>
          </Reveal>

          <Reveal className={styles.commitmentCopy} delay={0.08}>
            <p className={styles.eyebrowInverse}>
              {aboutPageContent.commitment.eyebrow}
            </p>

            <h2>{aboutPageContent.commitment.title}</h2>

            <p>{aboutPageContent.commitment.text}</p>

            <div className={styles.commitmentPoints}>
              {aboutPageContent.commitment.points.map((point) => (
                <div key={point}>
                  <span>
                    <Check size={14} strokeWidth={2.1} />
                  </span>

                  <p>{point}</p>
                </div>
              ))}
            </div>

            <div className={styles.commitmentActions}>
              <a className={styles.lightAction} href="/#booking">
                Book appointment
              </a>

              <a className={styles.ghostAction} href={primaryPhone.href}>
                <Phone size={16} />
                Call hospital
              </a>
            </div>
          </Reveal>
        </div>
      </section> */}

      <Facilities />
      <Testimonials />
      <FinalCta />
    </>
  );
}