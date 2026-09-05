import { HelpCircle } from "lucide-react";

import { faqContent } from "@/content/faqs";
import { hospitalConfig } from "@/config/hospital";
import FaqList from "@/components/sections/home/faqs/faq-list.client";
import Reveal from "@/components/ui/reveal/reveal.client";
import SectionIntro from "@/components/ui/section-intro/section-intro";
import { WhatsAppIcon } from "@/components/ui/icons/whatsapp-icon";

export default function Faqs() {
  return (
    <section className="faq-section texture-warm" id="faqs">
      <div className="faq-orbit faq-orbit-one" />
      <div className="faq-orbit faq-orbit-two" />

      <div className="shell faq-layout">
        <div className="faq-intro">
          <SectionIntro
            eyebrow={faqContent.eyebrow}
            title={faqContent.title}
            text={faqContent.text}
          />

          <Reveal className="faq-support-card" delay={0.08}>
            <span className="faq-support-icon">
              <HelpCircle size={21} />
            </span>

            <div>
              <small>Need more help?</small>

              <h3>Ask the hospital team.</h3>

              <p>
                Send a message through WhatsApp for directions, appointment
                support, or general enquiries.
              </p>

              <a
                href={hospitalConfig.contact.whatsapp.href}
                target="_blank"
                rel="noreferrer"
              >
                <WhatsAppIcon size={17} />
                Ask on WhatsApp
              </a>
            </div>
          </Reveal>
        </div>

        <FaqList />
      </div>
    </section>
  );
}
