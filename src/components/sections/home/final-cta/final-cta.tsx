"use client";

import { hospitalConfig } from "@/config/hospital";
import Button from "@/components/ui/button/button";

export default function FinalCta() {
  const primaryPhone = hospitalConfig.contact.phoneNumbers[0];

  return (
    <section className="final-cta texture-dark">
      <div className="final-cta-ring final-cta-ring-one" />
      <div className="final-cta-ring final-cta-ring-two" />

      <div className="shell final-cta-layout">
        <div>
          <p className="eyebrow eyebrow-inverse">Your next step</p>
          <h2>Begin with a clear plan.</h2>
        </div>

        <div className="final-cta-actions">
          <Button href={hospitalConfig.contact.appointmentHref} light>
            Book appointment
          </Button>

          <Button href={primaryPhone.href} ghost>
            Call hospital
          </Button>
        </div>
      </div>
    </section>
  );
}
