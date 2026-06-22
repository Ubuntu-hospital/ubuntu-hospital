"use client";

import { useState } from "react";

import Reveal from "@/components/ui/reveal/reveal.client";
import { hospitalConfig } from "@/config/hospital";
import {
  hospitalServices,
  serviceCategories,
  servicesPageContent,
} from "@/content/services";

import styles from "./services-page.module.css";

const serviceGroups = serviceCategories.map((category) => ({
  ...category,
  services: hospitalServices.filter((service) => service.category === category.id),
}));

const initialCategory = serviceGroups[0];

export default function ServiceBrowser() {
  const primaryPhone = hospitalConfig.contact.phoneNumbers[0];
  const [activeCategoryId, setActiveCategoryId] = useState(initialCategory.id);
  const [activeServiceId, setActiveServiceId] = useState(
    initialCategory.services[0]?.id ?? "",
  );

  const activeGroup =
    serviceGroups.find((group) => group.id === activeCategoryId) ?? initialCategory;
  const activeService =
    activeGroup.services.find((service) => service.id === activeServiceId) ??
    activeGroup.services[0];

  return (
    <section className={`${styles.browserSection} section`}>
      <div className={`shell ${styles.browserShell}`}>
        <Reveal className={styles.browserHeading}>
          <p className={styles.eyebrow}>{servicesPageContent.browser.eyebrow}</p>
          <h2>{servicesPageContent.browser.title}</h2>
        </Reveal>

        <div className={styles.categoryTabs} role="tablist" aria-label="Service categories">
          {serviceGroups.map((group) => {
            const isActive = group.id === activeGroup.id;

            return (
              <button
                key={group.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={
                  isActive
                    ? `${styles.categoryTab} ${styles.categoryTabActive}`
                    : styles.categoryTab
                }
                onClick={() => {
                  setActiveCategoryId(group.id);
                  setActiveServiceId(group.services[0]?.id ?? "");
                }}
              >
                {group.label}
              </button>
            );
          })}
        </div>

        <div className={styles.desktopBrowser}>
          <div className={styles.browserGrid}>
            <div className={styles.serviceList}>
              {activeGroup.services.map((service, index) => {
                const isActive = service.id === activeService?.id;

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

                    <span>
                      <strong>{service.title}</strong>
                      <p>{service.shortText}</p>
                    </span>
                  </button>
                );
              })}
            </div>

            {activeService ? (
              <Reveal className={styles.serviceStage} key={activeService.id}>
                <div className={styles.serviceStageContent}>
                  <div className={styles.serviceStageTopline}>
                    <span className={styles.serviceStageKicker}>Selected service</span>
                    <span className={styles.serviceStageLabel}>
                      {activeGroup.label}
                    </span>
                  </div>

                  <div>
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

                    <a className={styles.secondaryAction} href={primaryPhone.href}>
                      Call hospital
                    </a>
                  </div>
                </div>
              </Reveal>
            ) : null}
          </div>
        </div>

        <div className={styles.mobileServices}>
          {serviceGroups.map((group) => (
            <Reveal className={styles.mobileServiceGroup} key={group.id}>
              <div className={styles.mobileServiceGroupHead}>
                <span>{String(group.services.length).padStart(2, "0")}</span>
                <h3>{group.label}</h3>
              </div>

              <div className={styles.mobileServiceCards}>
                {group.services.map((service, index) => (
                  <article className={styles.mobileServiceCard} key={service.id}>
                    <div className={styles.mobileServiceTopline}>
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <strong>{service.title}</strong>
                    </div>

                    <p className={styles.mobileServiceShort}>{service.shortText}</p>
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

                      <a className={styles.secondaryAction} href={primaryPhone.href}>
                        Call hospital
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
