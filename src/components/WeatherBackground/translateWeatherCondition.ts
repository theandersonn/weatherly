const weatherTranslationMap: Record<string, string> = {
  chuva: 'rain',
  garoa: 'drizzle',
  'céu limpo': 'clear',
  limpo: 'clear',
  nublado: 'cloud',
  'muitas nuvens': 'cloud',
  neve: 'snow',
  tempestade: 'storm',
  trovoada: 'thunder',
};

export function translateWeatherCondition(condition: string): string {
  const lower = condition.toLowerCase();
  return (
    (Object.keys(weatherTranslationMap).find((key) => lower.includes(key)) &&
      weatherTranslationMap[
        Object.keys(weatherTranslationMap).find((key) =>
          lower.includes(key),
        ) as string
      ]) ||
    lower
  );
}
