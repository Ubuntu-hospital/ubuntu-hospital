import type { Metadata } from "next";
import { Sparkles } from "lucide-react";

import { saveSectionImageAction } from "@/actions/content-management";
import { getManagedSectionImages } from "@/lib/section-images";
import { requireAdminSession } from "@/lib/admin-auth";
import { requireSuperAdminSession } from "@/lib/admin-auth";
import { hospitalConfig } from "@/config/hospital";
import SectionCard from "./section-card.client";

import styles from "../admin.module.css";

export const metadata: Metadata = {
  title: `Page Section Photos | ${hospitalConfig.name}`,
  description: "Manage hero and key page section photos across the website.",
};

export const dynamic = "force-dynamic";

export default async function AdminSectionsPage() {
  await requireAdminSession();
  await requireSuperAdminSession();
  const sections = await getManagedSectionImages();

  return (
    <div className={styles.adminPageContainer}>
      <section className={styles.pageHeaderCard}>
        <div className={styles.pageHeaderLeft}>
          <div className={styles.headerTagRow}>
            <span className={styles.eyebrow}>
              <Sparkles size={13} className={styles.eyebrowIcon} />
              Website Sections
            </span>
            <span className={styles.countBadge}>
              {sections.length} Sections
            </span>
          </div>
          <h1>Page Section Photos</h1>
        </div>
      </section>

      <section className={styles.contentSection}>
        <div className={styles.facilityCardGrid}>
          {sections.map((sec) => (
            <SectionCard
              key={sec.sectionId}
              action={saveSectionImageAction}
              sectionId={sec.sectionId}
              title={sec.title}
              page={sec.page}
              location={sec.location}
              imageAlt={sec.imageAlt}
              currentImage={sec.currentImage}
              isOverridden={sec.isOverridden}
              publicUrl={sec.publicUrl}
              folder={`ubuntu-hospital/sections/${sec.sectionId}`}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
