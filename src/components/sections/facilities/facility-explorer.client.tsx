"use client";

import Image from "next/image";
import Link from "next/link";
import { routes } from "@/config/routes";
import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  BedDouble,
  Building2,
  CalendarDays,
  Check,
  Coffee,
  Cross,
  FlaskConical,
  MapPin,
  Pill,
  ScanLine,
  Stethoscope,
} from "lucide-react";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ComponentType,
} from "react";

import {
  facilityCategories,
  facilitySpaces,
  facilitiesPageContent,
  type FacilitySpace,
  type FacilityCategoryId,
  type FacilityIconName,
} from "@/content/facilities";

import styles from "./facilities-page.module.css";

type IconComponent = ComponentType<{
  size?: number;
  strokeWidth?: number;
}>;

const facilityIcons: Record<FacilityIconName, IconComponent> = {
  activity: Activity,
  bed: BedDouble,
  building: Building2,
  coffee: Coffee,
  cross: Cross,
  flask: FlaskConical,
  pill: Pill,
  scan: ScanLine,
  stethoscope: Stethoscope,
};

const easing = [0.22, 1, 0.36, 1] as const;

export function FacilityExplorer({
  spaces = facilitySpaces,
}: {
  spaces?: readonly FacilitySpace[];
}) {
  const [activeCategory, setActiveCategory] =
    useState<FacilityCategoryId>("all");

  const [activeSpaceId, setActiveSpaceId] = useState(facilitySpaces[0].id);
  const isUserClickRef = useRef(false);

  const explorerGridRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const spaceButtonRefs = useRef(new Map<string, HTMLButtonElement>());

  const visibleSpaces = useMemo(() => {
    if (activeCategory === "all") {
      return spaces;
    }

    return spaces.filter((space) => space.category === activeCategory);
  }, [activeCategory, spaces]);

  const activeSpace =
    visibleSpaces.find((space) => space.id === activeSpaceId) ??
    visibleSpaces[0];

  const ActiveIcon = facilityIcons[activeSpace.icon];

  const registerSpaceButton = useCallback(
    (spaceId: string, node: HTMLButtonElement | null) => {
      if (node) {
        spaceButtonRefs.current.set(spaceId, node);
        return;
      }

      spaceButtonRefs.current.delete(spaceId);
    },
    [],
  );

  const updateActiveSpaceFromScroll = useCallback(() => {
    if (isUserClickRef.current) return;

    const explorerGrid = explorerGridRef.current;
    if (!explorerGrid || visibleSpaces.length === 0) {
      return;
    }

    const explorerRect = explorerGrid.getBoundingClientRect();
    const explorerIsVisible =
      explorerRect.bottom > 0 && explorerRect.top < window.innerHeight;

    if (!explorerIsVisible) {
      return;
    }

    const isMobile = window.matchMedia("(max-width: 699px)").matches;
    const stageBottom = stageRef.current?.getBoundingClientRect().bottom ?? 0;

    const activationLine = isMobile
      ? Math.min(
          window.innerHeight - 70,
          Math.max(stageBottom + 62, window.innerHeight * 0.72),
        )
      : window.innerHeight * 0.52;

    let closestSpaceId = activeSpaceId;
    let closestDistance = Number.POSITIVE_INFINITY;

    visibleSpaces.forEach((space) => {
      const button = spaceButtonRefs.current.get(space.id);
      if (!button) {
        return;
      }

      const buttonRect = button.getBoundingClientRect();
      const buttonCenter = buttonRect.top + buttonRect.height / 2;
      const distance = Math.abs(buttonCenter - activationLine);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestSpaceId = space.id;
      }
    });

    setActiveSpaceId((currentSpaceId) =>
      currentSpaceId === closestSpaceId ? currentSpaceId : closestSpaceId,
    );
  }, [activeSpaceId, visibleSpaces]);

  useEffect(() => {
    let animationFrameId: number | null = null;

    const scheduleUpdate = () => {
      if (animationFrameId !== null) {
        return;
      }

      animationFrameId = window.requestAnimationFrame(() => {
        animationFrameId = null;
        updateActiveSpaceFromScroll();
      });
    };

    scheduleUpdate();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      if (animationFrameId !== null) {
        window.cancelAnimationFrame(animationFrameId);
      }
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, [updateActiveSpaceFromScroll]);

  // Handle clicking on an item: select immediately & smoothly adjust window scroll to the active position
  const handleSpaceClick = (spaceId: string) => {
    setActiveSpaceId(spaceId);
    isUserClickRef.current = true;

    const button = spaceButtonRefs.current.get(spaceId);
    if (button) {
      const isMobile = window.matchMedia("(max-width: 699px)").matches;
      const stageBottom = stageRef.current?.getBoundingClientRect().bottom ?? 0;

      const targetActivationLine = isMobile
        ? Math.min(
            window.innerHeight - 70,
            Math.max(stageBottom + 62, window.innerHeight * 0.72),
          )
        : window.innerHeight * 0.52;

      const buttonRect = button.getBoundingClientRect();
      const buttonCenter = buttonRect.top + buttonRect.height / 2;
      const scrollDelta = buttonCenter - targetActivationLine;

      window.scrollBy({ top: scrollDelta, behavior: "smooth" });
    }

    setTimeout(() => {
      isUserClickRef.current = false;
    }, 600);
  };

  const selectCategory = (categoryId: FacilityCategoryId) => {
    const nextSpaces =
      categoryId === "all"
        ? spaces
        : spaces.filter((space) => space.category === categoryId);

    setActiveCategory(categoryId);

    if (nextSpaces[0]) {
      setActiveSpaceId(nextSpaces[0].id);
    }
  };

  return (
    <section
      className={styles.explorerSection}
      id="facility-explorer"
      aria-labelledby="facility-explorer-title"
    >
      <div className={`shell ${styles.explorerShell}`}>
        <div className={styles.explorerHeading}>
          <div>
            <p className={styles.eyebrow}>
              {facilitiesPageContent.explorer.eyebrow}
            </p>

            <h2 id="facility-explorer-title">
              {facilitiesPageContent.explorer.title}
            </h2>

            <p>{facilitiesPageContent.explorer.text}</p>
          </div>

          <div className={styles.explorerNote}>
            <MapPin size={18} strokeWidth={1.7} />
            <p>
              Scroll through the directory or select a hospital area to explore
              it.
            </p>
          </div>
        </div>

        <div
          className={styles.categoryTabs}
          role="tablist"
          aria-label="Facility categories"
        >
          {facilityCategories.map((category) => {
            const isActive = category.id === activeCategory;

            return (
              <button
                type="button"
                role="tab"
                aria-selected={isActive}
                className={
                  isActive
                    ? `${styles.categoryTab} ${styles.categoryTabActive}`
                    : styles.categoryTab
                }
                key={category.id}
                onClick={() => selectCategory(category.id)}
              >
                {category.label}
              </button>
            );
          })}
        </div>

        <div className={styles.explorerGrid} ref={explorerGridRef}>
          <div
            className={styles.spaceList}
            aria-label="Hospital facility directory"
          >
            {visibleSpaces.map((space, index) => {
              const Icon = facilityIcons[space.icon];
              const isActive = space.id === activeSpace.id;

              return (
                <button
                  type="button"
                  ref={(node) => registerSpaceButton(space.id, node)}
                  className={
                    isActive
                      ? `${styles.spaceButton} ${styles.spaceButtonActive}`
                      : styles.spaceButton
                  }
                  aria-pressed={isActive}
                  aria-controls="active-facility-preview"
                  key={space.id}
                  onClick={() => handleSpaceClick(space.id)}
                >
                  <span className={styles.spaceNumber}>
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className={styles.spaceIcon}>
                    <Icon size={18} strokeWidth={1.6} />
                  </span>

                  <span>
                    <strong>{space.title}</strong>
                    <small>{space.shortText}</small>
                  </span>
                </button>
              );
            })}
          </div>

          <div
            className={styles.spaceStage}
            id="active-facility-preview"
            ref={stageRef}
          >
            <AnimatePresence mode="wait">
              <motion.article
                key={activeSpace.id}
                initial={{
                  opacity: 0,
                  scale: 0.985,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.985,
                }}
                transition={{
                  duration: 0.36,
                  ease: easing,
                }}
                className={styles.spaceStageInner}
              >
                <Image
                  src={activeSpace.image}
                  alt={activeSpace.imageAlt}
                  fill
                  sizes="(max-width: 699px) 100vw, (max-width: 980px) 62vw, 58vw"
                  className={styles.spaceStageImage}
                />

                <div className={styles.spaceStageOverlay} />

                <span className={styles.spaceStageIcon}>
                  <ActiveIcon size={24} strokeWidth={1.5} />
                </span>

                <div className={styles.spaceStageContent}>
                  <span className={styles.spaceStageLabel}>
                    Ubuntu Hospital facility
                  </span>

                  <h3>{activeSpace.title}</h3>

                  <p>{activeSpace.description}</p>

                  <div className={styles.spaceFeatures}>
                    {activeSpace.features.map((feature) => (
                      <div key={feature}>
                        <span>
                          <Check size={13} strokeWidth={2.1} />
                        </span>
                        <p>{feature}</p>
                      </div>
                    ))}
                  </div>

                  <div className={styles.spaceStageActions}>
                    <Link href={routes.booking}>
                      <CalendarDays size={16} />
                      Book appointment
                    </Link>

                    <Link href={routes.contact}>
                      <MapPin size={16} />
                      Plan your visit
                    </Link>
                  </div>
                </div>
              </motion.article>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
