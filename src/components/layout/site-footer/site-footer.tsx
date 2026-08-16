import "./site-footer.module.css";
import { navigation } from "@/config/navigation";
import { hospitalConfig } from "@/config/hospital";
import { legalSiteContent } from "@/content/legal";
import Brand from "@/components/layout/brand/brand";

export default function SiteFooter() {
  const patientLinks =
    navigation.find((item) => item.label === "Patients")?.children ?? [];

  return (
    <footer className="footer texture-dark">
      <div className="shell footer-layout">
        <div className="footer-brand">
          <Brand inverse />
          <p>{hospitalConfig.description}</p>
        </div>

        <div>
          <h3>Explore</h3>

          {navigation
            .filter((item) => item.label !== "Patients")
            .slice(1)
            .map((item) => (
              <a href={item.href} key={item.href}>
                {item.label}
              </a>
            ))}
        </div>

        <div>
          <h3>Patients</h3>

          {patientLinks.map((item) => (
            <a href={item.href} key={item.href}>
              {item.label}
            </a>
          ))}
        </div>

        <div>
          <h3>Contact</h3>

          {hospitalConfig.contact.phoneNumbers.map((phone) => (
            <a href={phone.href} key={phone.label}>
              {phone.display}
            </a>
          ))}

          <a href={`mailto:${hospitalConfig.contact.email}`}>
            {hospitalConfig.contact.email}
          </a>

          <p>{hospitalConfig.contact.address}</p>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="shell footer-bottom-layout">
          <p>
            {legalSiteContent.footer.copyright}
          </p>

          <nav className="footer-legal-links" aria-label="Legal information">
            {legalSiteContent.footer.links.map((link) => (
              <a href={link.href} key={link.href}>
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
