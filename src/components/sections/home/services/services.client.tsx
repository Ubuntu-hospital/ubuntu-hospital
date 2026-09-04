"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

import { hospitalConfig } from "@/config/hospital";
import { routes } from "@/config/routes";
import SectionIntro from "@/components/ui/section-intro/section-intro";
import { icons } from "@/components/ui/icons/Icons";

const easing = [0.22, 1, 0.36, 1] as const;

export default function Services() {
  const [activeIndex, setActiveIndex] = useState(0);
  const visibleServices = hospitalConfig.services.slice(0, 6);
  const remainingServices = hospitalConfig.services.slice(6);
  const activeService = visibleServices[activeIndex];
  const ActiveIcon = icons[activeService.icon];

  return (
    <section className="section services-section texture-dark" id="services">
      <div className="shell">
        <div className="services-header">
          <SectionIntro
            eyebrow="Essential care"
            title="Care, connected."
            text="Core hospital services stay close, coordinated, and easy to access."
            inverse
          />

          <p className="services-side-note">
            Select a service to view a quick introduction.
          </p>
        </div>

        <div className="services-console">
          <motion.div
            layout
            className="service-stage"
            transition={{
              duration: 0.45,
              ease: easing,
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeService.title}
                initial={{
                  opacity: 0,
                  y: 18,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: -14,
                }}
                transition={{
                  duration: 0.38,
                  ease: easing,
                }}
                className="service-stage-content"
              >
                <span className="service-stage-index">0{activeIndex + 1}</span>

                <span className="service-stage-icon">
                  {ActiveIcon ? (
                    <ActiveIcon size={31} strokeWidth={1.35} />
                  ) : null}
                </span>

                <h3>{activeService.title}</h3>
                <p>{activeService.text}</p>

                <Link href={routes.booking}>Request an appointment</Link>
              </motion.div>
            </AnimatePresence>

            <div className="service-stage-orbit" />
            <div className="service-stage-orbit service-stage-orbit-small" />
          </motion.div>

          <div className="services-directory">
            {visibleServices.map((service, index) => {
              const Icon = icons[service.icon];
              const active = activeIndex === index;

              return (
                <button
                  type="button"
                  key={service.title}
                  className={
                    active
                      ? "service-directory-row active"
                      : "service-directory-row"
                  }
                  onMouseEnter={() => setActiveIndex(index)}
                  onFocus={() => setActiveIndex(index)}
                  onClick={() => setActiveIndex(index)}
                >
                  <span className="service-directory-number">0{index + 1}</span>

                  <span className="service-directory-name">
                    {service.title}
                  </span>

                  <span className="service-directory-icon">
                    {Icon ? <Icon size={18} strokeWidth={1.55} /> : null}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="services-secondary">
          <span>Also available</span>

          <div>
            {remainingServices.map((service) => (
              <p key={service.title}>{service.title}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
