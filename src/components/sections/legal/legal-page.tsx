import type { LegalDocument } from "@/content/legal";

import styles from "./legal-page.module.css";

export default function LegalPage({ document }: { document: LegalDocument }) {
  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <div className={`shell ${styles.heroInner}`}>
          <p className={styles.eyebrow}>{document.eyebrow}</p>
          <h1>{document.title}</h1>
          <p className={styles.introduction}>{document.introduction}</p>
          <p className={styles.effectiveDate}>
            Effective date <strong>{document.effectiveDate}</strong>
          </p>
        </div>
      </header>

      <div className={`shell ${styles.layout}`}>
        <aside className={styles.navigation} aria-label={`${document.title} sections`}>
          <span>On this page</span>
          <nav>
            {document.sections.map((section) => (
              <a href={`#${section.id}`} key={section.id}>
                {section.title}
              </a>
            ))}
          </nav>
        </aside>

        <article className={styles.document}>
          {document.sections.map((section, index) => (
            <section className={styles.section} id={section.id} key={section.id}>
              <span className={styles.sectionNumber}>
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h2>{section.title}</h2>

                {section.paragraphs?.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}

                {section.bullets ? (
                  <ul>
                    {section.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </section>
          ))}
        </article>
      </div>
    </main>
  );
}
