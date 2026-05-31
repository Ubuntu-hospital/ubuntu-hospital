"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";

import useDismiss from "@/components/ui/useDismiss";

const easing = [0.22, 1, 0.36, 1] as const;

export default function CustomSelect({
  name,
  value,
  options,
  placeholder,
  onChange,
}: {
  name: string;
  value: string;
  options: string[];
  placeholder: string;
  onChange: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useDismiss(rootRef, () => setOpen(false));

  return (
    <div className="custom-control" ref={rootRef}>
      <input type="hidden" name={name} value={value} />

      <button
        type="button"
        className="custom-trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
      >
        <span className={!value ? "custom-placeholder" : ""}>
          {value || placeholder}
        </span>

        <span
          className={
            open ? "custom-chevron custom-chevron-open" : "custom-chevron"
          }
        >
          ▼
        </span>
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.985 }}
            transition={{ duration: 0.2, ease: easing }}
            className="custom-popover custom-select-menu"
            role="listbox"
          >
            {options.map((option) => (
              <button
                type="button"
                role="option"
                aria-selected={option === value}
                className={
                  option === value ? "custom-option active" : "custom-option"
                }
                key={option}
                onClick={() => {
                  onChange(option);
                  setOpen(false);
                }}
              >
                {option}
                {option === value ? (
                  <span className="custom-option-tick">✓</span>
                ) : null}
              </button>
            ))}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
