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
            {visibleImages.map((item, index) => (
              <Reveal
                key={item.id}
                delay={(index % 6) * 0.04}
                className={
                  item.featured
                    ? `${styles.galleryCard} ${styles.galleryCardFeatured}`
                    : styles.galleryCard
                }
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
                      item.featured
                        ? "(max-width: 980px) 100vw, 50vw"
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
            ))}
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
