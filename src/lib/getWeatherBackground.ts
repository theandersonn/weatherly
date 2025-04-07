export function getWeatherBackground(
  condition: string,
  isDaytime: boolean,
): string {
  const normalized = condition.toLowerCase();

  if (normalized.includes('rain')) {
    return isDaytime ? '/images/rainy-day.jpg' : '/images/rainy-night.jpg';
  }

  if (normalized.includes('cloud')) {
    return isDaytime ? '/images/cloudy-day.jpg' : '/images/cloudy-night.jpg';
  }

  if (normalized.includes('snow')) {
    return isDaytime ? '/images/snow-day.jpg' : '/images/snow-night.jpg';
  }

  if (normalized.includes('fog') || normalized.includes('mist')) {
    return isDaytime ? '/images/fog-day.jpg' : '/images/fog-night.jpg';
  }

  if (normalized.includes('clear')) {
    return isDaytime ? '/images/sunny.jpg' : '/images/clear-night.jpg';
  }

  return isDaytime ? '/images/default-day.jpg' : '/images/default-night.jpg';
}
