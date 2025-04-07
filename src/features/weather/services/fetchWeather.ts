import tzLookup from 'tz-lookup';
import { ErrorResponse, WeatherApiResponse } from '../types/weather';
import {
  groupForecastByDay,
  transformGroupedForecast,
} from 'lib/forecastUtils';
import {
  formatToLocalTime,
  getFormattedDayAndMonth,
  getShortWeekdayName,
} from 'lib/dateFormat';

export async function fetchWeather(city: string, unit: 'metric' | 'imperial') {
  const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
  const BASE_URL = process.env.NEXT_PUBLIC_WEATHER_BASE_URL;
  const url = `${BASE_URL}/forecast?q=${city}&units=${unit}&appid=${API_KEY}&lang=pt_br`;
  const response = await fetch(url);

  if (response.status === 404) {
    const errorData: ErrorResponse = await response.json();
    throw new Error(errorData.message || 'Cidade não encontrada');
  }

  if (!response.ok) throw new Error('Erro ao buscar os dados');

  const data: WeatherApiResponse = await response.json();

  if (!data.list || data.list.length === 0) {
    throw new Error('Nenhuma previsão encontrada.');
  }

  const groupedForecast = groupForecastByDay(data.list);
  const forecastEntries = transformGroupedForecast(groupedForecast);

  const { lat, lon } = data.city.coord;
  const timeZone = tzLookup(lat, lon);

  const formattedForecast = forecastEntries.map((entry) => ({
    ...entry,
    day: getShortWeekdayName(entry.timestamp, timeZone),
  }));

  const now = new Date();

  return {
    name: data.city.name,
    country: data.city.country,
    main: data.list[0].main,
    icon: data.list[0].weather[0].icon,
    forecast: formattedForecast,
    weatherCondition: data.list[0].weather[0]?.description,
    sunrise: formatToLocalTime(data.city.sunrise, timeZone),
    sunset: formatToLocalTime(data.city.sunset, timeZone),
    pressure: `${data.list[0].main.pressure} hPa`,
    temp: `${Math.round(data.list[0].main.temp)}°${unit === 'metric' ? 'C' : 'F'}`,
    timezone: data.city.timezone,
    currentMonth: getFormattedDayAndMonth(now, timeZone),
    currentTime: formatToLocalTime(now, timeZone),
    lat,
    lon,
  };
}
