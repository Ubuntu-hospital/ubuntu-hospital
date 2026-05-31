"use client";

import Image from "next/image";
import { Check } from "lucide-react";

import { hospitalConfig } from "@/config/hospital";
import SectionIntro from "@/components/ui/section-intro/section-intro";

export default function About() {
  return (
    <section className="section about-section" id="about">
      <div className="about-orbit about-orbit-one" />
      <div className="about-orbit about-orbit-two" />

      <div className="shell about-layout">
        <div className="about-media">
          <Image
            src={hospitalConfig.about.image}
            alt={hospitalConfig.about.imageAlt}
            fill
            sizes="(max-width: 980px) 100vw, 52vw"
          />

          <div className="about-image-overlay" />

          <div className="about-image-caption">
            <span>Ubuntu specialist care</span>
            <strong>Modern care should still feel personal.</strong>
          </div>
        </div>

        <div className="about-copy">
          <SectionIntro
            eyebrow={hospitalConfig.about.eyebrow}
            title={hospitalConfig.about.title}
            text={hospitalConfig.about.text}
          />

          <div className="about-highlight-list">
            {hospitalConfig.about.highlights.map((item) => (
              <div className="about-highlight" key={item}>
                <span>
                  <Check size={14} />
                </span>

                <p>{item}</p>
              </div>
            ))}
          </div>

          <div className="about-stats">
            {hospitalConfig.about.stats.map((item) => (
              <div key={item.label}>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
