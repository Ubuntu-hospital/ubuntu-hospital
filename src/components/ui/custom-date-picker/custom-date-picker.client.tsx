"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";

import {
  formatDisplayDate,
  formatMonthLabel,
  getCalendarCells,
  startOfToday,
  toDateValue,
  weekdayLabels,
} from "@/lib/dates";
import useDismiss from "@/components/ui/useDismiss";

const easing = [0.22, 1, 0.36, 1] as const;

export default function CustomDatePicker({
  name,
  value,
  onChange,
}: {
  name: string;
  value: string;
  onChange: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [cursor, setCursor] = useState(() => new Date());
  const rootRef = useRef<HTMLDivElement>(null);

  useDismiss(rootRef, () => setOpen(false));

  const today = startOfToday();
  const monthLabel = formatMonthLabel(cursor);
  const cells = getCalendarCells(cursor);

  return (
    <div className="custom-control" ref={rootRef}>
      <input type="hidden" name={name} value={value} />

      <button
        type="button"
        className="custom-trigger"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
      >
        <span className={!value ? "custom-placeholder" : ""}>
          {value ? formatDisplayDate(value) : "Select preferred date"}
        </span>

        <span className="custom-chevron">▼</span>
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.985 }}
            transition={{ duration: 0.2, ease: easing }}
            className="custom-popover custom-calendar"
            role="dialog"
            aria-label="Select preferred appointment date"
          >
            <div className="custom-calendar-header">
              <button
                type="button"
                aria-label="Previous month"
                onClick={() =>
                  setCursor(
                    (current) =>
                      new Date(
                        current.getFullYear(),
                        current.getMonth() - 1,
                        1,
                      ),
                  )
                }
              >
                ◀
              </button>

              <strong>{monthLabel}</strong>

              <button
                type="button"
                aria-label="Next month"
                onClick={() =>
                  setCursor(
                    (current) =>
                      new Date(
                        current.getFullYear(),
                        current.getMonth() + 1,
                        1,
                      ),
                  )
                }
              >
                ▶
              </button>
            </div>

            <div className="custom-calendar-grid custom-calendar-weekdays">
              {weekdayLabels.map((label) => (
                <span key={label}>{label}</span>
              ))}
            </div>

            <div className="custom-calendar-grid">
              {cells.map((date, index) => {
                if (!date) {
                  return <span key={`empty-${index}`} />;
                }

                const dateValue = toDateValue(date);
                const isSelected = dateValue === value;
                const isPast = date < today;

                return (
                  <button
                    type="button"
                    disabled={isPast}
                    className={
                      isSelected ? "custom-date active" : "custom-date"
                    }
                    key={dateValue}
                    onClick={() => {
                      onChange(dateValue);
                      setOpen(false);
                    }}
                  >
                    {date.getDate()}
                  </button>
                );
              })}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
