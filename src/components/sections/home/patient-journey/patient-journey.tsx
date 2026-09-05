"use client";

import { motion } from "framer-motion";

import { hospitalConfig } from "@/config/hospital";
import { KneeMark } from "@/components/ui/icons/knee-mark";
import Reveal from "@/components/ui/reveal/reveal.client";
import SectionIntro from "@/components/ui/section-intro/section-intro";
import { icons } from "@/components/ui/icons/Icons";

export default function PatientJourney() {
  return (
    <section className="section journey-section">
      <div className="shell">
        <div className="journey-heading">
          <SectionIntro
            eyebrow={hospitalConfig.journey.eyebrow}
            title={hospitalConfig.journey.title}
            text={hospitalConfig.journey.text}
          />

          <Reveal className="mobility-badge" delay={0.1}>
            <span className="mobility-icon">
              <KneeMark />
            </span>

            <div>
              <strong>Mobility</strong>
              <strong>Strength</strong>
              <strong>Freedom</strong>
            </div>
          </Reveal>
        </div>

        <div className="journey-route">
          <motion.div
            className="journey-route-line"
            initial={{
              scaleX: 0,
            }}
            whileInView={{
              scaleX: 1,
            }}
            viewport={{
              once: true,
              margin: "-120px",
            }}
            transition={{
              duration: 1.05,
              ease: [0.22, 1, 0.36, 1],
            }}
          />

          {hospitalConfig.journey.steps.map((step, index) => {
            const Icon = icons[step.icon];

            return (
              <Reveal
                className="journey-stop"
                delay={index * 0.12}
                key={step.number}
              >
                <div className="journey-marker">
                  <span>{step.number}</span>
                </div>

                <span className="journey-icon">
                  {Icon ? <Icon size={21} strokeWidth={1.55} /> : null}
                </span>

                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
