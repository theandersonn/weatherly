import { WeatherData } from '../types/weather';

export const defaultWeatherData: WeatherData = {
  name: '',
  country: '',
  main: {
    temp_max: 0,
    temp_min: 0,
  },
  icon: '',
  forecast: [],
  weatherCondition: '-',
  sunrise: '--:--',
  sunset: '--:--',
  pressure: '-',
  temp: '-',
  timezone: 0,
  currentMonth: '',
  currentTime: '',
  lat: 0,
  lon: 0,
};
