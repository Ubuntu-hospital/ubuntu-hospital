export const weekdayLabels = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"] as const;

export function toDateValue(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function startOfToday() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
}

export function formatMonthLabel(date: Date) {
  return new Intl.DateTimeFormat("en-GB", {
    month: "long",
    year: "numeric",
  }).format(date);
}

export function formatDisplayDate(value: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(`${value}T00:00:00`));
}

export function getCalendarCells(cursor: Date) {
  const firstWeekday = new Date(
    cursor.getFullYear(),
    cursor.getMonth(),
    1,
  ).getDay();
  const totalDays = new Date(
    cursor.getFullYear(),
    cursor.getMonth() + 1,
    0,
  ).getDate();

  return [
    ...Array.from({ length: firstWeekday }, () => null),
    ...Array.from(
      { length: totalDays },
      (_, index) =>
        new Date(cursor.getFullYear(), cursor.getMonth(), index + 1),
    ),
  ];
}
