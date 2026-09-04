"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import { hospitalConfig } from "@/config/hospital";
import { routes } from "@/config/routes";
import SectionIntro from "@/components/ui/section-intro/section-intro";

export default function Facilities() {
  return (
    <section
      className="section facilities-section texture-warm"
      id="facilities"
    >
      <div className="shell">
        <div className="section-topline">
          <SectionIntro
            eyebrow={hospitalConfig.facilities.eyebrow}
            title={hospitalConfig.facilities.title}
            text={hospitalConfig.facilities.text}
          />

          <Link className="text-link" href={routes.facilities}>
            View all spaces
          </Link>
        </div>

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
          className="facility-mosaic"
        >
          {hospitalConfig.facilities.items.map((facility, index) => (
            <motion.article
              key={facility.title}
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
              className={`facility-tile facility-tile-${index + 1}`}
            >
              <Image
                src={facility.image}
                alt={facility.alt}
                fill
                unoptimized
                sizes="(max-width: 980px) 100vw, 58vw"
              />

              <div className="facility-tile-overlay" />

              <span>0{index + 1}</span>

              <div>
                <h3>{facility.title}</h3>
                <p>{facility.text}</p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
