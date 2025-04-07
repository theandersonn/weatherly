export interface ForecastData {
  day: string;
  icon: string;
  maxTemp: number;
  minTemp: number;
  timestamp: number;
}

export interface ForecastItem {
  dt: number;
  main: {
    temp_max: number;
    temp_min: number;
    temp: number;
    pressure: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
}

export type WeatherData = {
  name: string;
  country: string;
  main: {
    temp_max: number;
    temp_min: number;
  };
  icon: string;
  forecast: ForecastData[];
  weatherCondition: string;
  sunrise: string;
  sunset: string;
  pressure: string;
  temp: string;
  timezone: number;
  currentMonth: string;
  currentTime: string;
  lat: number;
  lon: number;
};

export interface WeatherApiResponse {
  city: {
    name: string;
    country: string;
    timezone: number;
    sunrise: number;
    sunset: number;
    coord: {
      lat: number;
      lon: number;
    };
  };
  list: ForecastItem[];
}

export interface ErrorResponse {
  message: string;
}
