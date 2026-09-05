"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { hospitalConfig } from "@/config/hospital";
import SectionIntro from "@/components/ui/section-intro/section-intro";

import type { ManagedTestimony } from "@/lib/testimonies";

type TestimonialItem = {
  quote: string;
  name: string;
  context: string;
  image?: string | null;
};

export default function Testimonials({
  items: propItems,
}: {
  items?: ManagedTestimony[] | TestimonialItem[];
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotion();

  const items: readonly TestimonialItem[] =
    propItems && propItems.length > 0
      ? propItems
      : (hospitalConfig.testimonials.items as readonly TestimonialItem[]);
  const active: TestimonialItem = items[activeIndex] || items[0];

  const move = (direction: number) => {
    setActiveIndex(
      (current) => (current + direction + items.length) % items.length,
    );
  };

  useEffect(() => {
    if (paused || reduceMotion || items.length <= 1) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % items.length);
    }, 5600);

    return () => window.clearInterval(interval);
  }, [items.length, paused, reduceMotion]);

  if (!items.length || !active) return null;

  return (
    <section className="testimonials-section texture-warm">
      <div className="shell testimonials-layout">
        <div className="testimonials-heading">
          <SectionIntro
            eyebrow={hospitalConfig.testimonials.eyebrow}
            title={hospitalConfig.testimonials.title}
            text={hospitalConfig.testimonials.text}
          />

          <div className="testimonial-controls">
            <button
              type="button"
              onClick={() => move(-1)}
              aria-label="Show previous testimonial"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={() => move(1)}
              aria-label="Show next testimonial"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div
          className="testimonial-stage"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          <span className="testimonial-quote-mark" aria-hidden="true">
            “
          </span>

          <AnimatePresence mode="wait">
            <motion.article
              key={activeIndex}
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
              className="testimonial-card"
            >
              <blockquote>{active.quote}</blockquote>

              <div className="testimonial-person">
                {active.image ? (
                  <img
                    src={active.image}
                    alt={active.name}
                    className="testimonial-avatar-img"
                    loading="lazy"
                  />
                ) : (
                  <span>{active.name.charAt(0)}</span>
                )}

                <div>
                  <strong>{active.name}</strong>
                  <p>{active.context}</p>
                </div>
              </div>
            </motion.article>
          </AnimatePresence>

          <div className="testimonial-progress">
            {items.map((item, index) => (
              <button
                type="button"
                key={`${item.context}-${index}`}
                onClick={() => setActiveIndex(index)}
                aria-label={`Show testimonial ${index + 1}`}
                className={index === activeIndex ? "active" : ""}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
