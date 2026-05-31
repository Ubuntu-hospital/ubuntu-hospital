"use client";

import Image from "next/image";

import { hospitalConfig } from "@/config/hospital";
import SectionIntro from "@/components/ui/section-intro/section-intro";
import Reveal from "@/components/ui/reveal/reveal.client";

export default function Specialists() {
  const [lead, ...remaining] = hospitalConfig.specialists.people;

  return (
    <section className="section specialists-section" id="specialists">
      <div className="shell">
        <div className="section-topline">
          <SectionIntro
            eyebrow={hospitalConfig.specialists.eyebrow}
            title={hospitalConfig.specialists.title}
            text={hospitalConfig.specialists.text}
          />

          <a className="text-link" href="#specialists">
            Meet the full team
          </a>
        </div>

        <div className="specialists-editorial">
          <Reveal className="specialist-lead">
            <div className="specialist-image">
              <Image
                src={lead.image}
                alt={`${lead.name}, ${lead.role}`}
                fill
                sizes="(max-width: 980px) 100vw, 58vw"
              />

              <div className="specialist-image-wash" />
              <span className="specialist-image-index">01</span>
              <span className="specialist-image-corner" />
            </div>

            <div className="specialist-info">
              <span>Lead specialist</span>
              <h3>{lead.name}</h3>
              <p>{lead.role}</p>
            </div>
          </Reveal>

          <div className="specialists-side">
            {remaining.map((specialist, index) => (
              <Reveal
                className="specialist-side-card"
                delay={index * 0.1}
                key={`${specialist.name}-${specialist.role}`}
              >
                <div className="specialist-side-image">
                  <Image
                    src={specialist.image}
                    alt={`${specialist.name}, ${specialist.role}`}
                    fill
                    sizes="(max-width: 980px) 100vw, 30vw"
                  />

                  <div className="specialist-image-wash" />
                  <span className="specialist-image-index">0{index + 2}</span>
                </div>

                <div className="specialist-side-info">
                  <span>Specialist</span>
                  <h3>{specialist.name}</h3>
                  <p>{specialist.role}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
