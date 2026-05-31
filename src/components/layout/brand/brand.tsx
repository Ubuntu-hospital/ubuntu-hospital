import "./brand.module.css";
import { hospitalConfig } from "@/config/hospital";
import { BrandMark } from "@/components/ui/icons/Icons";

export default function Brand({ inverse = false }: { inverse?: boolean }) {
  if (inverse) {
    return (
      <a
        href="#home"
        className="brand-inverse-card"
        aria-label={`${hospitalConfig.name} homepage`}
      >
        <span className="brand-inverse-mark-panel">
          <BrandMark className="brand-inverse-mark" />
        </span>

        <span className="brand-inverse-copy-panel">
          <span className="brand-inverse-name">
            <strong className="brand-inverse-primary">
              {hospitalConfig.brandName.primary}
            </strong>

            <span className="brand-inverse-specialty">
              {hospitalConfig.brandName.specialty}
            </span>

            <strong className="brand-inverse-facility">
              {hospitalConfig.brandName.facility}
            </strong>
          </span>

          <small className="brand-inverse-tagline">
            {hospitalConfig.tagline}
          </small>
        </span>
      </a>
    );
  }

  return (
    <a
      href="#home"
      className="brand"
      aria-label={`${hospitalConfig.name} homepage`}
    >
      <BrandMark className="brand-mark" />

      <span className="brand-copy">
        <span className="brand-name">
          <strong className="brand-primary">
            {hospitalConfig.brandName.primary}
          </strong>

          <span className="brand-specialty">
            {hospitalConfig.brandName.specialty}
          </span>

          <strong className="brand-facility">
            {hospitalConfig.brandName.facility}
          </strong>
        </span>

        <small className="brand-tagline">{hospitalConfig.tagline}</small>
      </span>
    </a>
  );
}
