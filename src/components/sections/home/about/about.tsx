"use client";

import Image from "next/image";
import { Check } from "lucide-react";

import { hospitalConfig } from "@/config/hospital";
import SectionIntro from "@/components/ui/section-intro/section-intro";

export default function About({
  imageOverride,
}: {
  imageOverride?: { image: string; alt: string };
}) {
  const imageSrc = imageOverride?.image || hospitalConfig.about.image;
  const imageAlt = imageOverride?.alt || hospitalConfig.about.imageAlt;

  return (
    <section className="section about-section" id="about">
      <div className="about-orbit about-orbit-one" />
      <div className="about-orbit about-orbit-two" />

      <div className="shell about-layout">
        <div className="about-media">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            unoptimized
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
        </div>
      </div>
    </section>
  );
}
