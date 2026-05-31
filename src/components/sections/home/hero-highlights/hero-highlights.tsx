"use client";

import { motion } from "framer-motion";

import { hospitalConfig } from "@/config/hospital";
import { icons } from "@/components/ui/icons/Icons";

const easing = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 18,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

export default function HeroHighlights() {
  return (
    <section className="hero-highlights-section">
      <motion.div
        initial={{
          opacity: 0,
          y: 18,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
        }}
        transition={{
          duration: 0.62,
          ease: easing,
        }}
        className="shell hero-feature-rail"
      >
        {hospitalConfig.hero.features.map((feature) => {
          const Icon = icons[feature.icon];

          return (
            <div className="hero-feature" key={feature.title}>
              <span className="hero-feature-icon">
                {Icon ? <Icon size={22} strokeWidth={1.6} /> : null}
              </span>

              <div>
                <h3>{feature.title}</h3>
                <p>{feature.text}</p>
              </div>
            </div>
          );
        })}
      </motion.div>
    </section>
  );
}
