import Image from "next/image";
import Link from "next/link";

import "./brand.module.css";
import { hospitalConfig } from "@/config/hospital";
import { routes } from "@/config/routes";

export default function Brand({
  inverse = false,
  mobileLogomark = false,
}: {
  inverse?: boolean;
  mobileLogomark?: boolean;
}) {
  if (inverse) {
    return (
      <Link
        href={routes.home}
        className="brand-inverse-card"
        aria-label={`${hospitalConfig.name} homepage`}
      >
        <Image
          src={hospitalConfig.branding.logoSrc}
          alt={hospitalConfig.branding.logoAlt}
          className="brand-inverse-logo"
          width={604}
          height={248}
          sizes="(max-width: 699px) 268px, 302px"
        />
      </Link>
    );
  }

  return (
    <Link
      href={routes.home}
      className={mobileLogomark ? "brand brand-mobile-logomark" : "brand"}
      aria-label={`${hospitalConfig.name} homepage`}
    >
      <Image
        src={hospitalConfig.branding.logoSrc}
        alt={hospitalConfig.branding.logoAlt}
        className={
          mobileLogomark ? "brand-logo brand-logo-desktop" : "brand-logo"
        }
        width={604}
        height={248}
        sizes="(max-width: 979px) 154px, 172px"
      />

      {mobileLogomark ? (
        <Image
          src={hospitalConfig.branding.logomarkSrc}
          alt={hospitalConfig.branding.logomarkAlt}
          className="brand-logomark"
          width={248}
          height={248}
          sizes="56px"
        />
      ) : null}
    </Link>
  );
}
