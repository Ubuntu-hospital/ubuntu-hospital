"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { ChevronDown, Menu, Phone, X } from "lucide-react";

import { navigation } from "@/config/navigation";
import { hospitalConfig } from "@/config/hospital";
import Brand from "@/components/layout/brand/brand";
import Button from "@/components/ui/button/button";

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null);
  const primaryPhone = hospitalConfig.contact.phoneNumbers[0];

  return (
    <header className="site-header">
      <div className="shell nav-shell">
        <Brand mobileLogomark />

        <nav className="desktop-nav" aria-label="Primary navigation">
          {navigation.map((item) =>
            item.children?.length ? (
              <div
                className="desktop-nav-item desktop-nav-item-with-children"
                key={item.href}
              >
                <a className="desktop-nav-link" href={item.href}>
                  <span>{item.label}</span>
                  <ChevronDown size={14} strokeWidth={1.9} />
                </a>

                <div
                  className="desktop-subnav"
                  role="menu"
                  aria-label={`${item.label} submenu`}
                >
                  {item.children.map((child) => (
                    <a href={child.href} key={child.href} role="menuitem">
                      {child.label}
                    </a>
                  ))}
                </div>
              </div>
            ) : (
              <a className="desktop-nav-link" key={item.href} href={item.href}>
                {item.label}
              </a>
            ),
          )}
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
          onClick={() =>
            setOpen((value) => {
              const nextValue = !value;

              if (!nextValue) {
                setExpandedGroup(null);
              }

              return nextValue;
            })
          }
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
              {navigation.map((item) =>
                item.children?.length ? (
                  <div className="mobile-nav-group" key={item.href}>
                    <div className="mobile-nav-group-header">
                      <a
                        href={item.href}
                        onClick={() => {
                          setExpandedGroup(null);
                          setOpen(false);
                        }}
                      >
                        {item.label}
                      </a>

                      <button
                        type="button"
                        className="mobile-nav-group-toggle"
                        aria-expanded={expandedGroup === item.label}
                        aria-label={`Toggle ${item.label} links`}
                        onClick={() =>
                          setExpandedGroup((value) =>
                            value === item.label ? null : item.label,
                          )
                        }
                      >
                        <ChevronDown
                          size={16}
                          strokeWidth={1.9}
                          className={
                            expandedGroup === item.label
                              ? "mobile-nav-chevron mobile-nav-chevron-open"
                              : "mobile-nav-chevron"
                          }
                        />
                      </button>
                    </div>

                    <AnimatePresence initial={false}>
                      {expandedGroup === item.label ? (
                        <motion.div
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
                          className="mobile-subnav"
                        >
                          {item.children.map((child) => (
                            <a
                              href={child.href}
                              key={child.href}
                              onClick={() => {
                                setExpandedGroup(null);
                                setOpen(false);
                              }}
                            >
                              {child.label}
                            </a>
                          ))}
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </div>
                ) : (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => {
                      setExpandedGroup(null);
                      setOpen(false);
                    }}
                  >
                    {item.label}
                  </a>
                ),
              )}

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
