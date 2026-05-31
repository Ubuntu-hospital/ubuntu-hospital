"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState, type FormEvent } from "react";
import { Send, X } from "lucide-react";

import { whatsappInquiries } from "@/content/whatsapp-inquiries";
import { hospitalConfig } from "@/config/hospital";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/ui/icons/whatsapp-icon";

const easing = [0.22, 1, 0.36, 1] as const;

export default function WhatsAppFab() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const openWhatsApp = (content: string) => {
    const targetUrl = buildWhatsAppUrl(
      hospitalConfig.contact.whatsapp.href,
      content,
    );

    if (!targetUrl) {
      return;
    }

    window.open(targetUrl, "_blank", "noopener,noreferrer");
    setOpen(false);
    setMessage("");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    openWhatsApp(message);
  };

  return (
    <>
      <AnimatePresence>
        {open ? (
          <motion.button
            type="button"
            className="whatsapp-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            aria-label="Close WhatsApp support"
            onClick={() => setOpen(false)}
          />
        ) : null}
      </AnimatePresence>

      <div className="whatsapp-fab-root">
        <AnimatePresence>
          {open ? (
            <motion.section
              role="dialog"
              aria-modal="true"
              aria-labelledby="whatsapp-support-title"
              className="whatsapp-support-modal"
              initial={{
                opacity: 0,
                y: 22,
                scale: 0.96,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: 18,
                scale: 0.97,
              }}
              transition={{
                duration: 0.28,
                ease: easing,
              }}
            >
              <div className="whatsapp-modal-header">
                <div className="whatsapp-modal-brand">
                  <span className="whatsapp-modal-icon">
                    <WhatsAppIcon size={24} />
                  </span>

                  <div>
                    <small>Ubuntu Hospital</small>

                    <h2 id="whatsapp-support-title">
                      {hospitalConfig.whatsappSupport.title}
                    </h2>

                    <p>
                      <i />
                      Available for enquiries
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  className="whatsapp-modal-close"
                  onClick={() => setOpen(false)}
                  aria-label="Close WhatsApp support"
                >
                  <X size={17} />
                </button>
              </div>

              <div className="whatsapp-modal-body">
                <p className="whatsapp-modal-copy">
                  {hospitalConfig.whatsappSupport.text}
                </p>

                <div className="whatsapp-enquiry-list">
                  {whatsappInquiries.map((inquiry, index) => (
                    <motion.button
                      type="button"
                      key={inquiry}
                      initial={{
                        opacity: 0,
                        x: 10,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      transition={{
                        delay: 0.06 + index * 0.045,
                        duration: 0.24,
                      }}
                      onClick={() => openWhatsApp(inquiry)}
                    >
                      <span>0{index + 1}</span>
                      <p>{inquiry}</p>
                      <Send size={14} />
                    </motion.button>
                  ))}
                </div>

                <form className="whatsapp-message-form" onSubmit={handleSubmit}>
                  <label htmlFor="whatsapp-message">Type your message</label>

                  <div>
                    <input
                      id="whatsapp-message"
                      type="text"
                      value={message}
                      onChange={(event) => setMessage(event.target.value)}
                      placeholder="How can we help?"
                    />

                    <button
                      type="submit"
                      aria-label="Send WhatsApp message"
                      disabled={!message.trim()}
                    >
                      <Send size={16} />
                    </button>
                  </div>
                </form>
              </div>
            </motion.section>
          ) : null}
        </AnimatePresence>

        <motion.button
          type="button"
          className="whatsapp-fab"
          onClick={() => setOpen((current) => !current)}
          aria-label={open ? "Close WhatsApp support" : "Open WhatsApp support"}
          aria-expanded={open}
          whileHover={{
            scale: 1.06,
          }}
          whileTap={{
            scale: 0.94,
          }}
          animate={
            open
              ? {
                  rotate: 0,
                  scale: 1,
                }
              : {
                  y: [0, -5, 0],
                }
          }
          transition={
            open
              ? {
                  duration: 0.22,
                }
              : {
                  duration: 3.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }
          }
        >
          <span className="whatsapp-fab-pulse" />

          {open ? <X size={23} /> : <WhatsAppIcon size={26} />}
        </motion.button>
      </div>
    </>
  );
}
