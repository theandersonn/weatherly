export function getFormattedDayAndMonth(date: Date, timeZone: string): string {
  const dateParts = new Intl.DateTimeFormat('pt-BR', {
    day: 'numeric',
    month: 'short',
    timeZone,
  }).formatToParts(date);

  const dayPart = dateParts.find((part) => part.type === 'day')?.value;
  const monthPart = dateParts
    .find((part) => part.type === 'month')
    ?.value.toUpperCase()
    .replace('.', '');

  return `${dayPart} ${monthPart}`;
}

export function formatToLocalTime(
  input: number | Date,
  timeZone: string,
): string {
  const date = typeof input === 'number' ? new Date(input * 1000) : input;
  return date.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone,
    hour12: false,
  });
}

export function getShortWeekdayName(
  timestamp: number,
  timeZone: string,
): string {
  return new Date(timestamp)
    .toLocaleDateString('pt-BR', {
      weekday: 'short',
      timeZone,
    })
    .replace('.', '')
    .toUpperCase();
}
