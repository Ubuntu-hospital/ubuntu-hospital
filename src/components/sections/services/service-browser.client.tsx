"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CalendarDays, Check, Phone, ShieldCheck } from "lucide-react";
import { useState } from "react";

import { icons } from "@/components/ui/icons/Icons";
import { hospitalConfig } from "@/config/hospital";
import {
  hospitalServices,
  serviceCategories,
  type ServiceCategoryId,
  servicesPageContent,
} from "@/content/services";

import styles from "./services-page.module.css";

const easing = [0.22, 1, 0.36, 1] as const;

export default function ServiceBrowser() {
  const [activeCategory, setActiveCategory] =
    useState<ServiceCategoryId>("access");
  const initialService = hospitalServices.find(
    (service) => service.category === "access",
  );
  const [activeServiceId, setActiveServiceId] = useState(
    initialService?.id ?? hospitalServices[0].id,
  );

  const visibleServices = hospitalServices.filter(
    (service) => service.category === activeCategory,
  );
  const activeService =
    visibleServices.find((service) => service.id === activeServiceId) ??
    visibleServices[0];
  const ActiveIcon = icons[activeService.icon];
  const primaryPhone = hospitalConfig.contact.phoneNumbers[0];

  return (
    <section className={`${styles.browserSection} section`} id="services">
      <div className="shell">
        <div className={styles.browserShell}>
          <div className={styles.browserHeading}>
            <div>
              <p className={styles.eyebrow}>
                {servicesPageContent.browser.eyebrow}
              </p>
              <h2>{servicesPageContent.browser.title}</h2>
            </div>

            <p>{servicesPageContent.browser.text}</p>
          </div>

          <div className={styles.browserSupport}>
            <ShieldCheck size={18} strokeWidth={1.7} />
            <span>
              Need help choosing a service? Call {primaryPhone.display} for
              guidance.
            </span>
          </div>

          <div className={styles.categoryTabs} role="tablist">
            {serviceCategories.map((category) => {
              const isActive = category.id === activeCategory;

              return (
                <button
                  key={category.id}
                  type="button"
                  className={
                    isActive
                      ? `${styles.categoryTab} ${styles.categoryTabActive}`
                      : styles.categoryTab
                  }
                  onClick={() => {
                    setActiveCategory(category.id);
                    const nextService = hospitalServices.find(
                      (service) => service.category === category.id,
                    );

                    if (nextService) {
                      setActiveServiceId(nextService.id);
                    }
                  }}
                  role="tab"
                  aria-selected={isActive}
                >
                  {category.label}
                </button>
              );
            })}
          </div>

          <div className={styles.browserGrid}>
            <div className={styles.serviceList}>
              {visibleServices.map((service, index) => {
                const Icon = icons[service.icon];
                const isActive = service.id === activeService.id;

                return (
                  <button
                    key={service.id}
                    type="button"
                    className={
                      isActive
                        ? `${styles.serviceListButton} ${styles.serviceListButtonActive}`
                        : styles.serviceListButton
                    }
                    onClick={() => setActiveServiceId(service.id)}
                  >
                    <span className={styles.serviceListIndex}>
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <div>
                      <strong>{service.title}</strong>
                      <p>{service.shortText}</p>
                    </div>

                    <span className={styles.serviceListIcon}>
                      {Icon ? <Icon size={18} strokeWidth={1.6} /> : null}
                    </span>
                  </button>
                );
              })}
            </div>

            <motion.div
              layout
              className={styles.serviceStage}
              transition={{
                duration: 0.45,
                ease: easing,
              }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeService.id}
                  initial={{
                    opacity: 0,
                    y: 18,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: -14,
                  }}
                  transition={{
                    duration: 0.38,
                    ease: easing,
                  }}
                  className={styles.serviceStageContent}
                >
                  <div className={styles.serviceStageTopline}>
                    <span className={styles.eyebrow}>Selected service</span>
                    <span className={styles.serviceStageLabel}>
                      {activeCategory.replace("-", " ")}
                    </span>
                  </div>

                  <span className={styles.serviceStageIcon}>
                    {ActiveIcon ? (
                      <ActiveIcon size={34} strokeWidth={1.35} />
                    ) : null}
                  </span>

                  <h3>{activeService.title}</h3>
                  <p className={styles.serviceStageDescription}>
                    {activeService.description}
                  </p>

                  <div className={styles.serviceHighlights}>
                    {activeService.highlights.map((highlight) => (
                      <span key={highlight}>
                        <Check size={15} strokeWidth={2} />
                        {highlight}
                      </span>
                    ))}
                  </div>

                  <div className={styles.serviceStageActions}>
                    <a
                      className={styles.primaryAction}
                      href={hospitalConfig.contact.appointmentHref}
                    >
                      <CalendarDays size={17} strokeWidth={1.8} />
                      Request appointment
                    </a>

                    <a
                      className={styles.secondaryAction}
                      href={primaryPhone.href}
                    >
                      <Phone size={17} strokeWidth={1.8} />
                      Call hospital
                    </a>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className={styles.stageOrbitLarge} />
              <div className={styles.stageOrbitSmall} />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
