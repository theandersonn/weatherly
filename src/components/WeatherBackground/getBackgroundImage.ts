const backgroundMap: Record<string, { day: string; night: string }> = {
  rain: {
    day: '/images/rainy-day.jpg',
    night: '/images/rainy-night.jpg',
  },
  drizzle: {
    day: '/images/rainy-day.jpg',
    night: '/images/rainy-night.jpg',
  },
  clear: {
    day: '/images/clear-day.jpg',
    night: '/images/clear-night.jpg',
  },
  cloud: {
    day: '/images/cloudy-day.jpg',
    night: '/images/cloudy-night.jpg',
  },
  overcast: {
    day: '/images/cloudy-day.jpg',
    night: '/images/cloudy-night.jpg',
  },
  snow: {
    day: '/images/snow-day.jpg',
    night: '/images/snow-night.jpg',
  },
  storm: {
    day: '/images/storm-day.jpg',
    night: '/images/storm-night.jpg',
  },
  thunder: {
    day: '/images/storm-day.jpg',
    night: '/images/storm-night.jpg',
  },
};

export function getBackgroundImage(
  condition: string,
  isDaytime: boolean,
): string {
  const match = backgroundMap[condition];
  if (match) {
    return isDaytime ? match.day : match.night;
  }
  return isDaytime ? '/images/default-day.jpg' : '/images/default-night.jpg';
}
