import { ForecastItem } from '@/features/weather/types/weather';
import { groupForecastByDay, transformGroupedForecast } from '../forecastUtils';

const mockForecastList: ForecastItem[] = [
  {
    dt: 1712448000,
    main: {
      temp_max: 28,
      temp_min: 18,
      temp: 0,
      pressure: 0,
    },
    weather: [
      {
        icon: '04d',
        description: '',
      },
    ],
  },
  {
    dt: 1712458800,
    main: {
      temp_max: 30,
      temp_min: 20,
      temp: 0,
      pressure: 0,
    },
    weather: [
      {
        icon: '10d',
        description: '',
      },
    ],
  },
  {
    dt: 1712534400,
    main: {
      temp_max: 26,
      temp_min: 17,
      temp: 0,
      pressure: 0,
    },
    weather: [
      {
        icon: '01d',
        description: '',
      },
    ],
  },
];

describe('transformGroupedForecast', () => {
  it('deve transformar dados agrupados em formato simplificado de previsão', () => {
    const grouped = groupForecastByDay(mockForecastList);
    const result = transformGroupedForecast(grouped);

    expect(result).toHaveLength(1);
    expect(result[0]).toEqual(
      expect.objectContaining({
        day: expect.any(String),
        icon: '01d',
        maxTemp: 26,
        minTemp: 17,
        timestamp: 1712534400 * 1000,
      }),
    );
  });
});
