export function FormatToDateIntl(date: string | Date): string {
  const parseDate = new Date(date);
  const formatedDate = new Intl.DateTimeFormat("es-EC", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(parseDate);
  return formatedDate
}