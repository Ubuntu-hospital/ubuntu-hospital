"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { Phone } from "lucide-react";

import { hospitalConfig } from "@/config/hospital";
import Button from "@/components/ui/button/button";

const easing = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 28,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.09,
    },
  },
};

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const photoY = useTransform(scrollYProgress, [0, 1], [0, 28]);
  const spineY = useTransform(scrollYProgress, [0, 1], [0, -24]);

  const primaryPhone = hospitalConfig.contact.phoneNumbers[0];
  const heroTextParts = hospitalConfig.hero.text.split("you");

  return (
    <section className="hero" id="home" ref={heroRef}>
      <div className="hero-grain" />
      <div className="hero-warm-glow" />
      <div className="hero-dot-field" />
      <div className="hero-soft-circle" />

      <div className="shell hero-layout">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="hero-copy"
        >
          <motion.p
            initial={{
              opacity: 0,
              y: 14,
              filter: "blur(6px)",
            }}
            animate={{
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
            }}
            transition={{
              duration: 0.72,
              delay: 0.12,
              ease: easing,
            }}
            className="hero-eyebrow"
          >
            <span aria-hidden="true" />
            {hospitalConfig.name}
          </motion.p>

          <motion.h1 variants={fadeUp}>
            <span>{hospitalConfig.hero.title}</span>
            <span className="hero-title-accent">
              {hospitalConfig.hero.accentTitle}
            </span>
          </motion.h1>

          <motion.div variants={fadeUp} className="hero-rule">
            <span />
          </motion.div>

          <motion.p variants={fadeUp} className="hero-text">
            {heroTextParts[0]}
            <strong>you</strong>
            {heroTextParts[1]}
          </motion.p>

          <motion.div variants={fadeUp} className="hero-actions">
            <Button href={hospitalConfig.contact.appointmentHref}>
              Book an appointment
            </Button>

            <a className="secondary-action" href={primaryPhone.href}>
              <Phone size={17} />
              Call hospital
            </a>
          </motion.div>
        </motion.div>

        <div className="hero-visual">
          <motion.div
            className="hero-sky"
            style={{
              y: reduceMotion ? 0 : photoY,
            }}
          />

          <motion.div
            className="hero-building"
            style={{
              y: reduceMotion ? 0 : photoY,
            }}
          >
            <Image
              src={hospitalConfig.hero.buildingImage}
              alt={hospitalConfig.hero.buildingAlt}
              fill
              priority
              sizes="(max-width: 980px) 100vw, 62vw"
            />

            <div className="hero-building-overlay" />
          </motion.div>

          <div className="hero-image-sweep" />

          <motion.div
            className="hero-spine"
            style={{
              y: reduceMotion ? 0 : spineY,
            }}
          >
            <Image
              src={hospitalConfig.hero.spineImage}
              alt={hospitalConfig.hero.spineAlt}
              fill
              priority
              sizes="220px"
              className="hero-spine-image"
            />
          </motion.div>

          <motion.div
            className="hero-orbit hero-orbit-main"
            animate={reduceMotion ? undefined : { rotate: [0, 1.8, 0] }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <div className="hero-orbit hero-orbit-soft" />

          {hospitalConfig.hero.orbitSteps.map((step, index) => (
            <motion.div
              key={step}
              initial={{
                opacity: 0,
                scale: 0.86,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                delay: 0.55 + index * 0.16,
                duration: 0.5,
                ease: easing,
              }}
              className={`hero-orbit-step hero-orbit-step-${index + 1}`}
            >
              <i />
              <span>{step}</span>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="hero-bottom-wave" />
    </section>
  );
}
