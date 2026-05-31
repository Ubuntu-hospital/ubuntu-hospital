"use client";

import { AnimatePresence, motion } from "framer-motion";

import { hospitalConfig } from "@/config/hospital";
import { socialIcons } from "@/components/ui/icons/Icons";
import Reveal from "@/components/ui/reveal/reveal.client";

const easing = [0.22, 1, 0.36, 1] as const;

export default function Socials() {
  return (
    <section className="social-section texture-warm">
      <div className="shell social-layout">
        <Reveal className="social-copy">
          <p className="eyebrow">Stay connected</p>
          <h2>Follow the hospital.</h2>

          <p>
            Keep up with hospital updates, health education, and announcements.
          </p>
        </Reveal>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            margin: "-64px",
          }}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.09,
              },
            },
          }}
          className="social-grid"
        >
          {hospitalConfig.socialLinks.map((item) => {
            const Icon = socialIcons[item.icon];

            return (
              <motion.a
                variants={{
                  hidden: {
                    opacity: 0,
                    y: 18,
                  },
                  visible: {
                    opacity: 1,
                    y: 0,
                  },
                }}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="social-link-card"
                key={item.label}
              >
                <span>
                  {Icon ? <Icon size={18} strokeWidth={1.75} /> : null}
                </span>

                <div>
                  <small>{item.label}</small>
                  <strong>{item.handle}</strong>
                </div>
              </motion.a>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
