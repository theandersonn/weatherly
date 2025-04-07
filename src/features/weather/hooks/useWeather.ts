import { useQuery } from '@tanstack/react-query';
import { fetchWeather } from '../services/fetchWeather';

export function useWeather(city: string, unit: 'metric' | 'imperial') {
  return useQuery({
    queryKey: ['weather', city, unit],
    queryFn: () => fetchWeather(city, unit),
    staleTime: 1000 * 60 * 10,
  });
}
