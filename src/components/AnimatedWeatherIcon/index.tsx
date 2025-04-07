import AnimatedWeather from 'react-animated-weather';

export interface AnimatedWeatherIconProps {
  icon?: string;
  size?: number;
}

type WeatherIconKey =
  | '01d'
  | '01n'
  | '02d'
  | '02n'
  | '03d'
  | '03n'
  | '04d'
  | '04n'
  | '09d'
  | '09n'
  | '10d'
  | '10n'
  | '11d'
  | '11n'
  | '13d'
  | '13n'
  | '50d'
  | '50n';

interface AnimationConfig {
  icon: string;
  color: string;
}

const iconMapping: Record<WeatherIconKey, AnimationConfig> = {
  '01d': { icon: 'CLEAR_DAY', color: '#f9d71c' },
  '01n': { icon: 'CLEAR_NIGHT', color: '#2c3e50' },
  '02d': { icon: 'PARTLY_CLOUDY_DAY', color: '#f1c40f' },
  '02n': { icon: 'PARTLY_CLOUDY_NIGHT', color: '#34495e' },
  '03d': { icon: 'CLOUDY', color: '#bdc3c7' },
  '03n': { icon: 'CLOUDY', color: '#95a5a6' },
  '04d': { icon: 'CLOUDY', color: '#7f8c8d' },
  '04n': { icon: 'CLOUDY', color: '#7f8c8d' },
  '09d': { icon: 'RAIN', color: '#3498db' },
  '09n': { icon: 'RAIN', color: '#2980b9' },
  '10d': { icon: 'RAIN', color: '#3498db' },
  '10n': { icon: 'RAIN', color: '#2980b9' },
  '11d': { icon: 'WIND', color: '#e67e22' },
  '11n': { icon: 'WIND', color: '#d35400' },
  '13d': { icon: 'SNOW', color: '#ecf0f1' },
  '13n': { icon: 'SNOW', color: '#bdc3c7' },
  '50d': { icon: 'FOG', color: '#95a5a6' },
  '50n': { icon: 'FOG', color: '#7f8c8d' },
};

export function AnimatedWeatherIcon({ icon, size }: AnimatedWeatherIconProps) {
  const animation =
    icon && icon in iconMapping
      ? iconMapping[icon as WeatherIconKey]
      : { icon: 'CLOUDY', color: '#ccc' };

  return (
    <AnimatedWeather
      icon={animation.icon}
      color={animation.color}
      size={size}
      animate
    />
  );
}
