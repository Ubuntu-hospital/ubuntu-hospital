"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Building2, ChevronRight, Maximize2, Play } from "lucide-react";
import { useRef, useState } from "react";

import { hospitalConfig } from "@/config/hospital";
import Reveal from "@/components/ui/reveal/reveal.client";
import SectionIntro from "@/components/ui/section-intro/section-intro";

export default function Tour() {
  const [playing, setPlaying] = useState(false);
  const frameRef = useRef<HTMLDivElement>(null);

  const openFullscreen = async () => {
    try {
      await frameRef.current?.requestFullscreen?.();
    } catch {
      return;
    }
  };

  return (
    <section className="section tour-section texture-dark" id="tour">
      <div className="tour-outline-word" aria-hidden="true">
        TOUR
      </div>

      <div className="shell tour-layout">
        <div className="tour-copy">
          <SectionIntro
            eyebrow={hospitalConfig.tour.eyebrow}
            title={hospitalConfig.tour.title}
            text={hospitalConfig.tour.text}
            inverse
          />

          <div className="tour-chapters">
            {hospitalConfig.tour.chapters.map((chapter, index) => (
              <div key={chapter}>
                <span>0{index + 1}</span>
                <p>{chapter}</p>
              </div>
            ))}
          </div>

          <Link
            href="/facilities"
            className="tour-facilities-link"
            aria-label="Explore Ubuntu Hospital facilities"
          >
            <span className="tour-facilities-text">
              <strong>Explore the facility</strong>
              <small>
                Wards, theatres, consultation rooms and recovery spaces
              </small>
            </span>

            <ChevronRight
              className="tour-facilities-arrow"
              size={18}
              strokeWidth={2.4}
              aria-hidden="true"
            />
          </Link>
        </div>

        <Reveal className="tour-video-shell">
          <div className="tour-video-frame" ref={frameRef}>
            {playing ? (
              <>
                <iframe
                  className="tour-video-player"
                  src={`https://www.youtube-nocookie.com/embed/${hospitalConfig.tour.videoId}?autoplay=1&rel=0&modestbranding=1`}
                  title="Ubuntu Hospital facility tour preview"
                  allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                  allowFullScreen
                />

                <button
                  type="button"
                  className="tour-fullscreen-button"
                  onClick={openFullscreen}
                >
                  <Maximize2 size={15} />
                  Full screen
                </button>
              </>
            ) : (
              <>
                <Image
                  src={hospitalConfig.tour.poster}
                  alt="Modern hospital interior preview"
                  fill
                  sizes="(max-width: 980px) 100vw, 62vw"
                  className="tour-video-poster"
                />

                <div className="tour-video-soft-blur" />

                <button
                  type="button"
                  className="tour-play-button"
                  onClick={() => setPlaying(true)}
                  aria-label="Play hospital facility tour"
                >
                  <span>
                    <Play size={22} fill="currentColor" />
                  </span>

                  <strong>Play facility tour</strong>
                  <small>Explore the hospital</small>
                </button>
              </>
            )}
          </div>

          <div className="tour-frame-corner tour-frame-corner-top" />
          <div className="tour-frame-corner tour-frame-corner-bottom" />
        </Reveal>
      </div>
    </section>
  );
}
