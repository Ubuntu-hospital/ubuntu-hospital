"use client";

import Image from "next/image";

import { hospitalConfig } from "@/config/hospital";
import Reveal from "@/components/ui/reveal/reveal.client";

export default function HeroHighlights() {
  return (
    <section
      className="hero-highlights-section"
      aria-labelledby="home-overview-title"
    >
      <div className="shell">
        <div className="hero-overview-topline">
          <p className="eyebrow">What we do</p>
          <h2 id="home-overview-title">
            Focused care across core orthopaedic needs.
          </h2>
        </div>

        <div className="hero-focus-grid">
          {hospitalConfig.hero.focusAreas.map((item, index) => (
            <Reveal
              className="hero-focus-card"
              delay={index * 0.08}
              key={item.title}
            >
              <div className="hero-focus-image">
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 980px) 100vw, 30vw"
                />
                <div className="hero-focus-wash" />
              </div>

              <div className="hero-focus-copy">
                <h3>{item.title}</h3>

                <ul className="hero-focus-list">
                  {item.text.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
