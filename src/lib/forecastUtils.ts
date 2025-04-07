import { ForecastData, ForecastItem } from 'features/weather/types/weather';

export function groupForecastByDay(
  list: ForecastItem[],
): Record<string, ForecastItem[]> {
  return list.reduce(
    (acc, item) => {
      const dateKey = new Date(item.dt * 1000).toISOString().split('T')[0];
      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(item);
      return acc;
    },
    {} as Record<string, ForecastItem[]>,
  );
}

export function transformGroupedForecast(
  grouped: Record<string, ForecastItem[]>,
): ForecastData[] {
  return Object.entries(grouped)
    .slice(1, 6)
    .map(([, items]) => {
      const tempsMax = items.map((i) => i.main.temp_max);
      const tempsMin = items.map((i) => i.main.temp_min);
      const icons = items.map((i) => i.weather[0]?.icon).filter(Boolean);

      return {
        day: new Date(items[0].dt * 1000).toLocaleDateString('pt-BR', {
          weekday: 'short',
          day: 'numeric',
          month: 'short',
        }),
        icon: icons[0] || '01d',
        maxTemp: Math.round(Math.max(...tempsMax)),
        minTemp: Math.round(Math.min(...tempsMin)),
        timestamp: items[0].dt * 1000,
      };
    });
}
