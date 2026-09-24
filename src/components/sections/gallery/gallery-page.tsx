"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

import Reveal from "@/components/ui/reveal/reveal.client";
import {
  galleryCategories,
  galleryPageContent,
  type GalleryCategory,
  type GalleryImage,
} from "@/content/gallery";

import styles from "./gallery-page.module.css";

type CardSpan = "single" | "wide" | "full";

function computeCardSpans(items: GalleryImage[]): CardSpan[] {
  const spans: CardSpan[] = new Array(items.length).fill("single");
  let col = 0; // Current column in row (0, 1, 2)
  let alternateWideRight = false;

  for (let i = 0; i < items.length; i++) {
    const isFeatured = Boolean(items[i].featured);
    const spaceInRow = 3 - col;

    if (isFeatured) {
      if (spaceInRow === 3) {
        // Start of row: can we make it wide (span 2)?
        if (i + 1 < items.length) {
          if (alternateWideRight) {
            // First item single (col 0), next item can be wide (cols 1 & 2)
            spans[i] = "single";
            col = 1;
          } else {
            // First item wide (cols 0 & 1), next item will be single (col 2)
            spans[i] = "wide";
            col = 2;
          }
          alternateWideRight = !alternateWideRight;
        } else {
          // Last item alone in row: make it full (span 3)
          spans[i] = "full";
          col = 3;
        }
      } else if (spaceInRow === 2) {
        // Exactly 2 columns left in this row (col === 1):
        // This featured item takes cols 1 & 2, completing the row cleanly!
        spans[i] = "wide";
        col = 3;
      } else {
        // Only 1 column left in this row (col === 2):
        // A wide card cannot fit here without wrapping and leaving an empty hole.
        // So it takes 1 column, completing the row cleanly!
        spans[i] = "single";
        col = 3;
      }
    } else {
      // Normal item: takes 1 column
      spans[i] = "single";
      col += 1;
    }

    if (col >= 3) {
      col = 0;
    }
  }

  return spans;
}

export default function GalleryPage({
  images = galleryPageContent.images,
}: {
  images?: GalleryImage[];
}) {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>("all");
  const [activeImage, setActiveImage] = useState<GalleryImage | null>(null);

  const visibleImages = useMemo(() => {
    if (activeCategory === "all") {
      return images;
    }

    return images.filter((image) => image.category === activeCategory);
  }, [activeCategory, images]);

  const spans = useMemo(() => computeCardSpans(visibleImages), [visibleImages]);

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroTexture} />
        <div className={styles.heroGlow} />
        <div className={styles.heroOrbit} />

        <div className={`shell ${styles.heroInner}`}>
          <Reveal className={styles.heroCopy}>
            <p className={styles.eyebrow}>{galleryPageContent.hero.eyebrow}</p>

            <h1>{galleryPageContent.hero.title}</h1>

            <p>{galleryPageContent.hero.text}</p>
          </Reveal>
        </div>
      </section>

      <section className={styles.gallerySection}>
        <div className="shell">
          <div className={styles.categoryBar} aria-label="Gallery categories">
            {galleryCategories.map((category) => {
              const isActive = category.id === activeCategory;

              return (
                <button
                  key={category.id}
                  type="button"
                  className={
                    isActive
                      ? `${styles.categoryButton} ${styles.categoryButtonActive}`
                      : styles.categoryButton
                  }
                  onClick={() => setActiveCategory(category.id)}
                >
                  {category.label}
                </button>
              );
            })}
          </div>

          <div className={styles.galleryGrid}>
            {visibleImages.map((item, index) => {
              const span = spans[index];
              const cardClassName =
                span === "wide"
                  ? `${styles.galleryCard} ${styles.galleryCardWide}`
                  : span === "full"
                    ? `${styles.galleryCard} ${styles.galleryCardFull}`
                    : styles.galleryCard;

              return (
                <Reveal
                  key={item.id}
                  delay={(index % 6) * 0.04}
                  className={cardClassName}
                >
                  <button
                    type="button"
                    className={styles.galleryButton}
                    onClick={() => setActiveImage(item)}
                    aria-label={`Open ${item.title}`}
                  >
                    <Image
                      src={item.image}
                      alt={item.alt}
                      fill
                      sizes={
                        span === "full"
                          ? "100vw"
                          : span === "wide"
                            ? "(max-width: 700px) 100vw, (max-width: 980px) 100vw, 66vw"
                            : "(max-width: 699px) 100vw, (max-width: 980px) 50vw, 33vw"
                      }
                    />

                    <span className={styles.galleryWash} />

                    <span className={styles.galleryCaption}>
                      <small>{item.category}</small>
                      <strong>{item.title}</strong>
                    </span>
                  </button>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {activeImage ? (
        <div
          className={styles.lightbox}
          role="dialog"
          aria-modal="true"
          aria-label={activeImage.title}
        >
          <button
            type="button"
            className={styles.lightboxBackdrop}
            onClick={() => setActiveImage(null)}
            aria-label="Close gallery image"
          />

          <div className={styles.lightboxPanel}>
            <button
              type="button"
              className={styles.lightboxClose}
              onClick={() => setActiveImage(null)}
            >
              Close
            </button>

            <div className={styles.lightboxImage}>
              <Image
                src={activeImage.image}
                alt={activeImage.alt}
                fill
                sizes="100vw"
                priority
              />
            </div>

            <div className={styles.lightboxCaption}>
              <span>{activeImage.category}</span>
              <strong>{activeImage.title}</strong>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
