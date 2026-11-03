import dayjs from "dayjs";

export function toLocaleDate(dateString: Date, locale: string) {
  const date = dayjs(dateString);
  const now = dayjs();
  const diffSeconds = now.diff(date, "seconds");
  const sameDay = now.isSame(date, "day");
  const sameYear = now.isSame(date, "year");

  if (diffSeconds < 60) return "Только что";
  if (diffSeconds < 60 * 60) {
    return dayjs.duration(-diffSeconds, "seconds").humanize(true);
  }
  return date.toDate().toLocaleString(locale, {
    year: sameYear ? undefined : "numeric",
    month: !sameDay ? "short" : undefined,
    day: !sameDay ? "numeric" : undefined,
    hour: "numeric",
    minute: "2-digit",
  });
}
