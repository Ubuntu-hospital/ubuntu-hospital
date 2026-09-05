"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Phone } from "lucide-react";

import { hospitalConfig } from "@/config/hospital";
import Button from "@/components/ui/button/button";

const easing = [0.22, 1, 0.36, 1] as const;

const focusAreas = [
  {
    title: "Spine",
    text: "Back pain and disorders of the spine.",
    image: hospitalConfig.hero.focusAreas[0].image,
    alt: hospitalConfig.hero.focusAreas[0].alt,
  },
  {
    title: "Trauma",
    text: "Injuries affecting the bone, muscle, and joints.",
    image: hospitalConfig.hero.focusAreas[1].image,
    alt: hospitalConfig.hero.focusAreas[1].alt,
  },
  {
    title: "General orthopaedics",
    text: "Joint replacement, sports medicine, and rehabilitation.",
    image: hospitalConfig.hero.focusAreas[2].image,
    alt: hospitalConfig.hero.focusAreas[2].alt,
  },
] as const;

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);

  const activeArea = focusAreas[activeIndex];
  const primaryPhone = hospitalConfig.contact.phoneNumbers[0];

  useEffect(() => {
    if (reduceMotion) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % focusAreas.length);
    }, 5200);

    return () => window.clearInterval(timer);
  }, [reduceMotion]);

  return (
    <section className="hero" id="home">
      <div className="hero-media">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeArea.title}
            className="hero-image"
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.985 }}
            transition={{ duration: 0.72, ease: easing }}
          >
            <Image
              src={activeArea.image}
              alt={activeArea.alt}
              fill
              priority={activeIndex === 0}
              sizes="100vw"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="hero-shade" />
      <div className="hero-orange-wash" />
      <div className="hero-texture" />

      <div className="shell hero-shell">
        <div className="hero-top">
          <p className="hero-hospital-name" aria-label={hospitalConfig.name}>
            <span className="hero-hospital-brand">
              {hospitalConfig.brandName.primary}
            </span>
            <span>
              {hospitalConfig.brandName.specialty}{" "}
              {hospitalConfig.brandName.facility}
            </span>
          </p>

          <div className="hero-controls" aria-label="Focused care areas">
            {focusAreas.map((area, index) => {
              const isActive = index === activeIndex;

              return (
                <button
                  key={area.title}
                  type="button"
                  className={
                    isActive
                      ? "hero-control hero-control-active"
                      : "hero-control"
                  }
                  onClick={() => setActiveIndex(index)}
                  aria-label={`${String(index + 1).padStart(2, "0")} - Show ${area.title}`}
                  aria-pressed={isActive}
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <i aria-hidden="true" />
                </button>
              );
            })}
          </div>
        </div>

        <div className="hero-content">
          <p className="hero-label">Focused care area</p>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeArea.title}
              className="hero-copy-slide"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.45, ease: easing }}
            >
              <h1>{activeArea.title}</h1>
              <p>{activeArea.text}</p>
            </motion.div>
          </AnimatePresence>

          <div className="hero-actions">
            <Button href={hospitalConfig.contact.appointmentHref}>
              Book an appointment
            </Button>

            <a className="hero-call-action" href={primaryPhone.href}>
              <Phone size={17} strokeWidth={1.9} />
              Call hospital
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
