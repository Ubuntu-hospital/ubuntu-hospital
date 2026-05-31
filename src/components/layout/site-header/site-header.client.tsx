"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Menu, Phone, X } from "lucide-react";

import { navigation } from "@/config/navigation";
import { hospitalConfig } from "@/config/hospital";
import Brand from "@/components/layout/brand/brand";
import Button from "@/components/ui/button/button";

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const primaryPhone = hospitalConfig.contact.phoneNumbers[0];

  return (
    <header className="site-header">
      <div className="shell nav-shell">
        <Brand />

        <nav className="desktop-nav" aria-label="Primary navigation">
          {navigation.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="desktop-actions">
          <a className="phone-link" href={primaryPhone.href}>
            <Phone size={15} />
            {primaryPhone.display}
          </a>

          <Button href={hospitalConfig.contact.appointmentHref}>
            Book appointment
          </Button>
        </div>

        <button
          className="menu-button"
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-label={open ? "Close navigation" : "Open navigation"}
        >
          {open ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.nav
            initial={{
              opacity: 0,
              height: 0,
            }}
            animate={{
              opacity: 1,
              height: "auto",
            }}
            exit={{
              opacity: 0,
              height: 0,
            }}
            className="mobile-nav"
            aria-label="Mobile navigation"
          >
            <div className="shell mobile-nav-inner">
              {navigation.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              ))}

              <Button href={hospitalConfig.contact.appointmentHref}>
                Book appointment
              </Button>
            </div>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
