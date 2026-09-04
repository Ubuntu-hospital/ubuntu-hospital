import type { Metadata } from "next";
import { Sparkles } from "lucide-react";

import { saveFacilityImageAction } from "@/actions/content-management";
import { facilitySpaces } from "@/content/facilities";
import { listFacilityImageOverrides } from "@/lib/facility-images";
import { requireAdminSession } from "@/lib/admin-auth";
import { requireSuperAdminSession } from "@/lib/admin-auth";
import { hospitalConfig } from "@/config/hospital";
import FacilityCard from "./facility-card.client";

import styles from "../admin.module.css";

export const metadata: Metadata = {
  title: `Facility Photos | ${hospitalConfig.name}`,
};

export const dynamic = "force-dynamic";

export default async function AdminFacilitiesPage() {
  await requireAdminSession();
  await requireSuperAdminSession();
  const overrides = await listFacilityImageOverrides();
  const overrideMap = new Map(overrides.map((item) => [item.facilityId, item]));

  return (
    <div className={styles.adminPageContainer}>
      <section className={styles.pageHeaderCard}>
        <div className={styles.pageHeaderLeft}>
          <div className={styles.headerTagRow}>
            <span className={styles.eyebrow}>
              <Sparkles size={13} className={styles.eyebrowIcon} />
              Hospital Spaces
            </span>
            <span className={styles.countBadge}>
              {facilitySpaces.length} Spaces
            </span>
          </div>
          <h1>Facility Photos</h1>
        </div>
      </section>

      <section className={styles.contentSection}>
        <div className={styles.facilityCardGrid}>
          {facilitySpaces.map((space) => {
            const current = overrideMap.get(space.id);
            const isOverridden = Boolean(current);

            return (
              <FacilityCard
                key={space.id}
                action={saveFacilityImageAction}
                facilityId={space.id}
                title={space.title}
                imageAlt={space.imageAlt}
                currentImage={current?.image ?? space.image}
                isOverridden={isOverridden}
                folder={`ubuntu-hospital/facilities/${space.id}`}
              />
            );
          })}
        </div>
      </section>
    </div>
  );
}
