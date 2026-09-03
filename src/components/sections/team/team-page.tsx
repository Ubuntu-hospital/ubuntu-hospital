import Image from "next/image";
import { CalendarDays, Phone } from "lucide-react";

import { hospitalConfig } from "@/config/hospital";
import { teamPageContent } from "@/content/team";
import type { ManagedTeamMember } from "@/lib/team-members";
import Reveal from "@/components/ui/reveal/reveal.client";
import Booking from "@/components/sections/home/booking/booking";

import styles from "./team-page.module.css";

export function TeamPage({
  managedMembers = [],
}: {
  managedMembers?: ManagedTeamMember[];
}) {
  const primaryPhone = hospitalConfig.contact.phoneNumbers[0];
  const groups = managedMembers.length
    ? Array.from(new Set(managedMembers.map((member) => member.group))).map(
        (group) => ({
          title: group,
          members: managedMembers.filter((member) => member.group === group),
        }),
      )
    : teamPageContent.directory.groups;
  const getMemberAlt = (member: (typeof groups)[number]["members"][number]) =>
    "imageAlt" in member && member.imageAlt
      ? member.imageAlt
      : `${member.name}, ${member.role}`;
  const getMemberUnit = (member: (typeof groups)[number]["members"][number]) =>
    "unit" in member ? member.unit : null;

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroTexture} />
        <div className={styles.heroGlow} />
        <div className={styles.heroOrbitLarge} />
        <div className={styles.heroOrbitSmall} />

        <div className={`shell ${styles.heroGrid}`}>
          <Reveal className={styles.heroCopy}>
            <p className={styles.eyebrow}>{teamPageContent.hero.eyebrow}</p>

            <h1>{teamPageContent.hero.title}</h1>

            <p className={styles.heroText}>{teamPageContent.hero.text}</p>

            <div className={styles.heroActions}>
              <a className={styles.primaryAction} href="#team-directory">
                Meet the team
              </a>

              <a className={styles.secondaryAction} href={primaryPhone.href}>
                <Phone size={16} strokeWidth={1.9} />
                Call hospital
              </a>
            </div>
          </Reveal>

          <Reveal className={styles.heroMedia} delay={0.1}>
            <Image
              src={teamPageContent.hero.image}
              alt={teamPageContent.hero.imageAlt}
              fill
              priority
              sizes="(max-width: 980px) 100vw, 54vw"
            />

            <div className={styles.heroMediaOverlay} />

            <div className={styles.heroMediaCard}>
              <span>Ubuntu team</span>
              <strong>
                Specialist care backed by coordinated hospital support.
              </strong>
            </div>
          </Reveal>
        </div>
      </section>

      <section className={styles.teamSection} id="team-directory">
        <div className="shell">
          <Reveal className={styles.teamIntro}>
            <p className={styles.eyebrow}>
              {teamPageContent.directory.eyebrow}
            </p>
            <h2>{teamPageContent.directory.title}</h2>
            <p>{teamPageContent.directory.text}</p>
          </Reveal>

          <div className={styles.teamGroups}>
            {groups.map((group, groupIndex) => {
              const isLeadership = groupIndex === 0;

              return (
                <Reveal
                  className={
                    isLeadership
                      ? `${styles.teamGroup} ${styles.leadershipGroup}`
                      : styles.teamGroup
                  }
                  delay={groupIndex * 0.06}
                  key={group.title}
                >
                  <div className={styles.teamGroupHead}>
                    <span>{String(groupIndex + 1).padStart(2, "0")}</span>
                    <h3>{group.title}</h3>
                  </div>

                  {isLeadership ? (
                    <div className={styles.leadershipGrid}>
                      {group.members.map((member) => (
                        <article
                          className={styles.leadershipCard}
                          key={member.name}
                        >
                          <div className={styles.leadershipPhoto}>
                            <Image
                              src={member.image}
                              alt={getMemberAlt(member)}
                              fill
                              unoptimized
                              sizes="(max-width: 699px) 100vw, (max-width: 980px) 45vw, 33vw"
                              style={{ objectFit: "cover" }}
                            />
                          </div>

                          <div className={styles.leadershipInfo}>
                            <h4>{member.name}</h4>
                            <p>
                              {member.role}
                              {getMemberUnit(member)
                                ? ` · ${getMemberUnit(member)}`
                                : ""}
                            </p>
                          </div>
                        </article>
                      ))}
                    </div>
                  ) : (
                    <div className={styles.staffGrid}>
                      {group.members.map((member) => (
                        <article className={styles.staffCard} key={member.name}>
                          <div className={styles.staffPhoto}>
                            <Image
                              src={member.image}
                              alt={getMemberAlt(member)}
                              fill
                              unoptimized
                              sizes="(max-width: 699px) 100vw, (max-width: 980px) 45vw, 25vw"
                              style={{ objectFit: "cover" }}
                            />
                          </div>

                          <div className={styles.staffInfo}>
                            <h4>{member.name}</h4>
                            <p>
                              {member.role}
                              {getMemberUnit(member)
                                ? ` · ${getMemberUnit(member)}`
                                : ""}
                            </p>
                          </div>
                        </article>
                      ))}
                    </div>
                  )}
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className={styles.standardSection}>
        <div className={`shell ${styles.standardGrid}`}>
          <Reveal>
            <p className={styles.eyebrow}>
              {teamPageContent.standards.eyebrow}
            </p>

            <h2>{teamPageContent.standards.title}</h2>

            <p className={styles.standardText}>
              {teamPageContent.standards.text}
            </p>
          </Reveal>

          <div className={styles.standardPoints}>
            {teamPageContent.standards.points.map((point, index) => (
              <Reveal
                className={styles.standardPoint}
                delay={index * 0.08}
                key={point.number}
              >
                <span>{point.number}</span>

                <div>
                  <h3>{point.title}</h3>
                  <p>{point.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.supportSection}>
        <div className={`shell ${styles.supportGrid}`}>
          <Reveal>
            <p className={styles.supportEyebrow}>
              {teamPageContent.support.eyebrow}
            </p>

            <h2>{teamPageContent.support.title}</h2>

            <p>{teamPageContent.support.text}</p>
          </Reveal>

          <Reveal className={styles.supportActions} delay={0.08}>
            <a
              className={styles.primaryAction}
              href={hospitalConfig.contact.appointmentHref}
            >
              <CalendarDays size={16} strokeWidth={1.9} />
              Book appointment
            </a>

            <a className={styles.secondaryAction} href={primaryPhone.href}>
              <Phone size={16} strokeWidth={1.9} />
              Call hospital
            </a>
          </Reveal>
        </div>
      </section>

      <Booking />
    </>
  );
}
