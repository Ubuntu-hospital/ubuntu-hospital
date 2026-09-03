"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { hospitalConfig } from "@/config/hospital";
import Reveal from "@/components/ui/reveal/reveal.client";
import SectionIntro from "@/components/ui/section-intro/section-intro";

const easing = [0.22, 1, 0.36, 1] as const;

export default function UbuntuStandard({
  visionImageOverride,
}: {
  visionImageOverride?: { image: string; alt: string };
}) {
  const visionSrc =
    visionImageOverride?.image || hospitalConfig.standard.vision.image;
  const visionAlt =
    visionImageOverride?.alt || hospitalConfig.standard.vision.imageAlt;

  return (
    <section className="standard-section" id="vision">
      <div className="standard-intro texture-warm">
        <div className="standard-intro-ring standard-intro-ring-one" />
        <div className="standard-intro-ring standard-intro-ring-two" />

        <div className="shell standard-intro-layout">
          <SectionIntro
            eyebrow={hospitalConfig.standard.eyebrow}
            title={hospitalConfig.standard.title}
            text={hospitalConfig.standard.text}
          />

          <Reveal className="standard-word" delay={0.1}>
            {"UBUNTU".split("").map((letter, index) => (
              <motion.span
                key={`${letter}-${index}`}
                initial={{
                  opacity: 0,
                  y: 22,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  delay: index * 0.09,
                  duration: 0.45,
                  ease: easing,
                }}
              >
                {letter}
              </motion.span>
            ))}
          </Reveal>
        </div>
      </div>

      <div className="mission-section">
        <div className="shell mission-layout">
          <Reveal className="standard-sequence-number">01</Reveal>

          <SectionIntro
            eyebrow={hospitalConfig.standard.mission.eyebrow}
            title={hospitalConfig.standard.mission.title}
            text={hospitalConfig.standard.mission.text}
          />

          <Reveal className="mission-symbol" delay={0.1}>
            <span />
            <span />
            <span />
          </Reveal>
        </div>
      </div>

      <div className="vision-section texture-dark">
        <div className="shell vision-layout">
          <div className="vision-copy">
            <Reveal className="standard-sequence-number standard-sequence-number-light">
              02
            </Reveal>

            <SectionIntro
              eyebrow={hospitalConfig.standard.vision.eyebrow}
              title={hospitalConfig.standard.vision.title}
              text={hospitalConfig.standard.vision.text}
              inverse
            />
          </div>

          <Reveal className="vision-image">
            <Image
              src={visionSrc}
              alt={visionAlt}
              fill
              unoptimized
              sizes="(max-width: 980px) 100vw, 52vw"
            />

            <div className="vision-image-overlay" />
            <div className="vision-image-line" />
          </Reveal>
        </div>
      </div>

      <div className="values-section texture-warm">
        <div className="shell">
          <div className="values-header">
            <Reveal className="standard-sequence-number">03</Reveal>

            <SectionIntro
              eyebrow="Core values"
              title="The meaning behind Ubuntu."
              text="Each letter expresses a principle that shapes the patient experience."
            />
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              margin: "-60px",
            }}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.09,
                },
              },
            }}
            className="values-track"
          >
            {hospitalConfig.standard.values.map((item, index) => (
              <motion.article
                key={`${item.letter}-${item.word}`}
                variants={{
                  hidden: {
                    opacity: 0,
                    y: 28,
                  },
                  visible: {
                    opacity: 1,
                    y: 0,
                  },
                }}
                className="value-node"
              >
                <span className="value-position">0{index + 1}</span>
                <strong>{item.letter}</strong>
                <h3>{item.word}</h3>
                <p>{item.text}</p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
