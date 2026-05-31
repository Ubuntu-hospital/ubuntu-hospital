import "./site-footer.module.css";
import { navigation } from "@/config/navigation";
import { hospitalConfig } from "@/config/hospital";
import Brand from "@/components/layout/brand/brand";

export default function SiteFooter() {
  return (
    <footer className="footer texture-dark">
      <div className="shell footer-layout">
        <div className="footer-brand">
          <Brand inverse />
          <p>{hospitalConfig.description}</p>
        </div>

        <div>
          <h3>Explore</h3>

          {navigation.slice(1).map((item) => (
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
            © {new Date().getFullYear()} {hospitalConfig.name}. All rights
            reserved.
          </p>

          <a
            href={hospitalConfig.credits.spineHref}
            target="_blank"
            rel="noreferrer"
          >
            {hospitalConfig.credits.spineLabel}
          </a>
        </div>
      </div>
    </footer>
  );
}
