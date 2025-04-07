import { render, screen } from '@testing-library/react';
import { WeatherDashboard } from '../WeatherDashboard';

const mockUseWeatherDashboard = jest.fn();

jest.mock('../components/index.ts', () => ({
  WeatherHeader: () => <div>WeatherHeader</div>,
  CurrentWeather: () => <div>CurrentWeather</div>,
  ForecastList: () => <div>ForecastList</div>,
  LoadingOverlay: () => <div>Loading...</div>,
}));

jest.mock('../hooks/useWeatherDashboard.ts', () => ({
  useWeatherDashboard: () => mockUseWeatherDashboard(),
}));

describe('WeatherDashboard (integração)', () => {
  beforeEach(() => {
    mockUseWeatherDashboard.mockReset();
  });

  it('deve renderizar todos os subcomponentes com dados mockados', () => {
    mockUseWeatherDashboard.mockReturnValue({
      search: 'São Paulo',
      setSearch: jest.fn(),
      unit: 'metric',
      setUnit: jest.fn(),
      handleSearchSubmit: jest.fn(),
      isInitialLoad: false,
      isFetching: false,
      weatherData: {
        name: 'São Paulo',
        country: 'BR',
        temp: '28°C',
        icon: '01d',
        pressure: '1015 hPa',
        sunrise: '06:30',
        sunset: '18:00',
        weatherCondition: 'Ensolarado',
        currentMonth: 'Abril',
        currentTime: '12:00',
        forecast: [
          { date: '2025-04-08', temp: '26°C', icon: '02d' },
          { date: '2025-04-09', temp: '24°C', icon: '03d' },
        ],
      },
    });

    render(<WeatherDashboard />);
    expect(screen.getByText('WeatherHeader')).toBeInTheDocument();
    expect(screen.getByText('CurrentWeather')).toBeInTheDocument();
    expect(screen.getByText('ForecastList')).toBeInTheDocument();
  });

  it('deve exibir overlay de carregamento quando isFetching for true', () => {
    mockUseWeatherDashboard.mockReturnValue({
      search: '',
      setSearch: jest.fn(),
      unit: 'metric',
      setUnit: jest.fn(),
      handleSearchSubmit: jest.fn(),
      isInitialLoad: false,
      isFetching: true,
      weatherData: {
        name: 'São Paulo',
        country: 'BR',
        temp: '28°C',
        icon: '01d',
        pressure: '1015 hPa',
        sunrise: '06:30',
        sunset: '18:00',
        weatherCondition: 'Ensolarado',
        currentMonth: 'Abril',
        currentTime: '12:00',
        forecast: [],
      },
    });

    render(<WeatherDashboard />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});
