import tzLookup from 'tz-lookup';

export function isCurrentlyDaytime(
  sunrise?: string,
  sunset?: string,
  lat?: number,
  lon?: number,
): boolean {
  if (!sunrise || !sunset || lat === undefined || lon === undefined)
    return true;

  try {
    const timezone = tzLookup(lat, lon);

    const now = new Date();
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: timezone,
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });

    const parts = formatter.formatToParts(now);
    const hour = Number(parts.find((p) => p.type === 'hour')?.value ?? '0');
    const minute = Number(parts.find((p) => p.type === 'minute')?.value ?? '0');

    const nowInCity = new Date();
    nowInCity.setHours(hour, minute, 0, 0);

    const [sunriseHour, sunriseMinute] = sunrise.split(':').map(Number);
    const [sunsetHour, sunsetMinute] = sunset.split(':').map(Number);

    const sunriseTime = new Date(nowInCity);
    sunriseTime.setHours(sunriseHour, sunriseMinute, 0, 0);

    const sunsetTime = new Date(nowInCity);
    sunsetTime.setHours(sunsetHour, sunsetMinute, 0, 0);

    return nowInCity >= sunriseTime && nowInCity < sunsetTime;
  } catch (error) {
    console.error('Erro ao calcular fuso horário:', error);
    return true;
  }
}
