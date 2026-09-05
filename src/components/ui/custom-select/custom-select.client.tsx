"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";
import useDismiss from "@/components/ui/useDismiss";

const easing = [0.22, 1, 0.36, 1] as const;

export type SelectOption =
  | string
  | {
      value: string;
      label: string;
    };

function formatLabel(option: SelectOption): { value: string; label: string } {
  if (typeof option === "object" && option !== null) {
    return option;
  }
  const str = String(option || "").trim();
  if (!str) return { value: "", label: "" };

  // Convert kebab-case or underscore or lowercase into Title Case / User friendly
  const formatted = str
    .split(/[-_]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return { value: str, label: formatted };
}

export default function CustomSelect({
  name,
  value,
  options,
  placeholder = "Select an option",
  onChange,
}: {
  name: string;
  value: string;
  options: (string | { value: string; label: string })[];
  placeholder?: string;
  onChange?: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useDismiss(rootRef, () => setOpen(false));

  const normalizedOptions = options.map(formatLabel);
  const currentSelected = normalizedOptions.find((opt) => opt.value === value);
  const displayLabel = currentSelected
    ? currentSelected.label
    : formatLabel(value).label;

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
          {displayLabel || placeholder}
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
            {normalizedOptions.map((option) => (
              <button
                type="button"
                role="option"
                aria-selected={option.value === value}
                className={
                  option.value === value
                    ? "custom-option active"
                    : "custom-option"
                }
                key={option.value}
                onClick={() => {
                  onChange?.(option.value);
                  setOpen(false);
                }}
              >
                <span>{option.label}</span>
                {option.value === value ? (
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
