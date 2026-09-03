"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

import Reveal from "@/components/ui/reveal/reveal.client";
import { hospitalConfig } from "@/config/hospital";
import {
  hospitalServices,
  serviceCategories,
  servicesPageContent,
} from "@/content/services";

import styles from "./services-page.module.css";

const initialService = hospitalServices[0];

type DesktopServiceListLayout = "compact" | "detailed";

// Change this value to "detailed" to restore the single-column list with descriptions.
export const serviceBrowserOptions: {
  desktopListLayout: DesktopServiceListLayout;
} = {
  desktopListLayout: "compact",
};

export default function ServiceBrowser() {
  const primaryPhone = hospitalConfig.contact.phoneNumbers[0];
  const serviceButtonRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [activeServiceId, setActiveServiceId] = useState(
    initialService?.id ?? "",
  );
  const [expandedMobileServiceId, setExpandedMobileServiceId] = useState("");

  useEffect(() => {
    const buttons = serviceButtonRefs.current.filter(
      (button): button is HTMLButtonElement => button !== null,
    );

    if (
      !buttons.length ||
      serviceBrowserOptions.desktopListLayout === "compact" ||
      window.matchMedia("(max-width: 699px)").matches
    ) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        const serviceId = visibleEntry?.target.getAttribute("data-service-id");

        if (serviceId) {
          setActiveServiceId(serviceId);
        }
      },
      {
        rootMargin: "-30% 0px -52% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    buttons.forEach((button) => observer.observe(button));

    return () => observer.disconnect();
  }, []);

  const activeService =
    hospitalServices.find((service) => service.id === activeServiceId) ??
    initialService;
  const activeServiceCategory =
    serviceCategories.find(
      (category) => category.id === activeService?.category,
    )?.label ?? "Service";

  return (
    <section className={`${styles.browserSection} section`}>
      <div className={`shell ${styles.browserShell}`}>
        <Reveal className={styles.browserHeading}>
          <p className={styles.eyebrow}>
            {servicesPageContent.browser.eyebrow}
          </p>
          <h2>{servicesPageContent.browser.title}</h2>
        </Reveal>

        <div className={styles.desktopBrowser}>
          <div className={styles.browserGrid}>
            <div
              className={`${styles.serviceList} ${
                serviceBrowserOptions.desktopListLayout === "compact"
                  ? styles.serviceListCompact
                  : styles.serviceListDetailed
              }`}
            >
              {hospitalServices.map((service, index) => {
                const isActive = service.id === activeService?.id;

                return (
                  <button
                    key={service.id}
                    ref={(button) => {
                      serviceButtonRefs.current[index] = button;
                    }}
                    type="button"
                    data-service-id={service.id}
                    aria-pressed={isActive}
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

                    <span>
                      <strong>{service.title}</strong>
                      <p>{service.shortText}</p>
                    </span>
                  </button>
                );
              })}
            </div>

            {activeService ? (
              <div className={styles.serviceStage}>
                <div className={styles.serviceStageContent}>
                  <div className={styles.serviceStageTopline}>
                    <span className={styles.serviceStageKicker}>
                      Selected service
                    </span>
                    <span className={styles.serviceStageLabel}>
                      {activeServiceCategory}
                    </span>
                  </div>

                  <div aria-live="polite">
                    <h3>{activeService.title}</h3>
                    <p className={styles.serviceStageDescription}>
                      {activeService.description}
                    </p>
                  </div>

                  <div className={styles.serviceHighlights}>
                    {activeService.highlights.map((highlight) => (
                      <span key={highlight}>{highlight}</span>
                    ))}
                  </div>

                  <div className={styles.serviceStageActions}>
                    <a
                      className={styles.primaryAction}
                      href={hospitalConfig.contact.appointmentHref}
                    >
                      Request appointment
                    </a>

                    <a
                      className={styles.secondaryAction}
                      href={primaryPhone.href}
                    >
                      Call hospital
                    </a>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>

        <div className={styles.mobileServices}>
          <div className={styles.mobileServiceCards}>
            {hospitalServices.map((service, index) => {
              const isExpanded = expandedMobileServiceId === service.id;
              const detailsId = `mobile-service-details-${service.id}`;

              return (
                <Reveal className={styles.mobileServiceCard} key={service.id}>
                  <button
                    type="button"
                    className={styles.mobileServiceTrigger}
                    aria-expanded={isExpanded}
                    aria-controls={detailsId}
                    onClick={() =>
                      setExpandedMobileServiceId(isExpanded ? "" : service.id)
                    }
                  >
                    <span className={styles.mobileServiceTopline}>
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <strong>{service.title}</strong>
                    </span>

                    <span className={styles.mobileServiceCta}>
                      {isExpanded ? "Show less" : "Learn more"}
                      <ChevronDown
                        aria-hidden="true"
                        className={
                          isExpanded ? styles.mobileServiceChevronOpen : ""
                        }
                        size={18}
                        strokeWidth={2}
                      />
                    </span>
                  </button>

                  {isExpanded ? (
                    <div className={styles.mobileServiceDetails} id={detailsId}>
                      <p className={styles.mobileServiceShort}>
                        {service.shortText}
                      </p>
                      <p className={styles.mobileServiceDescription}>
                        {service.description}
                      </p>

                      <div className={styles.mobileServiceHighlights}>
                        {service.highlights.map((highlight) => (
                          <span key={highlight}>{highlight}</span>
                        ))}
                      </div>

                      <div className={styles.mobileServiceActions}>
                        <a
                          className={styles.primaryAction}
                          href={hospitalConfig.contact.appointmentHref}
                        >
                          Request appointment
                        </a>

                        <a
                          className={styles.secondaryAction}
                          href={primaryPhone.href}
                        >
                          Call hospital
                        </a>
                      </div>
                    </div>
                  ) : null}
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
