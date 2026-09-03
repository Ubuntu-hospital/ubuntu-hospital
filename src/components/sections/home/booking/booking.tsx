import { MessageCircle, Phone } from "lucide-react";

import { homeContent } from "@/content/home";
import { hospitalConfig } from "@/config/hospital";
import BookingForm from "@/components/sections/home/booking/booking-form.client";
import SectionIntro from "@/components/ui/section-intro/section-intro";

export default function Booking() {
  return (
    <section className="section booking-section texture-dark" id="booking">
      <div className="shell booking-layout">
        <div className="booking-copy">
          <SectionIntro
            eyebrow={homeContent.booking.eyebrow}
            title={homeContent.booking.title}
            text={homeContent.booking.text}
            inverse
          />

          <div className="booking-note">
            <Phone size={17} />
            <p>{homeContent.booking.urgentNote}</p>
          </div>

          <div className="booking-contact-lines">
            {hospitalConfig.contact.phoneNumbers.map((phone) => (
              <a href={phone.href} key={phone.label}>
                <span>{phone.label}</span>
                <strong>{phone.display}</strong>
              </a>
            ))}

            <a
              className="booking-whatsapp-line"
              href={hospitalConfig.contact.whatsapp.href}
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle size={18} />

              <div>
                <span>{hospitalConfig.contact.whatsapp.label}</span>
                <strong>{hospitalConfig.contact.whatsapp.display}</strong>
              </div>
            </a>
          </div>
        </div>

        <BookingForm
          services={homeContent.services.map((item) => item.title)}
        />
      </div>
    </section>
  );
}
