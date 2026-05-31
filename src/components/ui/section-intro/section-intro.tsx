"use client";

import Reveal from "@/components/ui/reveal/reveal.client";

export default function SectionIntro({
  eyebrow,
  title,
  text,
  inverse = false,
  centered = false,
}: {
  eyebrow: string;
  title: string;
  text?: string;
  inverse?: boolean;
  centered?: boolean;
}) {
  return (
    <Reveal
      className={`section-intro ${centered ? "section-intro-centered" : ""}`}
    >
      <p className={inverse ? "eyebrow eyebrow-inverse" : "eyebrow"}>
        {eyebrow}
      </p>

      <h2
        className={
          inverse ? "section-title section-title-inverse" : "section-title"
        }
      >
        {title}
      </h2>

      {text ? (
        <p
          className={
            inverse ? "section-text section-text-inverse" : "section-text"
          }
        >
          {text}
        </p>
      ) : null}
    </Reveal>
  );
}
