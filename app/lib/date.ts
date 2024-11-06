export function FormatToDateIntl(date: string | Date): string {
  const parseDate = new Date(date);
  const formatedDate = new Intl.DateTimeFormat("es-EC", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(parseDate);
  return formatedDate
}

export function FormatToDateSmall(date: string | Date): string {
  const parseDate = new Date(date);
  const formatedDate = new Intl.DateTimeFormat("es-EC", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(parseDate);
  return formatedDate
}

export function FormatToDateWithHour(date: string | Date): string {
  const parseDate = new Date(date);
  const formatedDate = new Intl.DateTimeFormat("es-EC", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: 'numeric',
    minute: 'numeric'
  }).format(parseDate);
  return formatedDate
}