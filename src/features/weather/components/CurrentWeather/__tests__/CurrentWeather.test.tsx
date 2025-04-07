import { render, screen } from '@testing-library/react';
import { WeatherLocationProps } from '@/components/WeatherLocation';
import { WeatherDetailsProps } from '@/components/WeatherDetails';
import { AnimatedWeatherIconProps } from '@/components/AnimatedWeatherIcon';
import { CurrentWeather } from '..';

jest.mock('@/components', () => ({
  WeatherLocation: ({ city, country }: WeatherLocationProps) => (
    <div>{`${city}, ${country}`}</div>
  ),
  WeatherDetails: ({ label, value }: WeatherDetailsProps) => (
    <div>{label ? `${label}: ${value}` : value}</div>
  ),
  AnimatedWeatherIcon: ({ icon }: AnimatedWeatherIconProps) => (
    <div>Icon: {icon}</div>
  ),
}));

beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: query.includes('min-width: 768px'),
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
});

describe('CurrentWeather', () => {
  const defaultProps = {
    city: 'São Paulo',
    country: 'Brasil',
    weatherCondition: 'Ensolarado',
    currentMonth: 'Abril',
    currentTime: '14:00',
    temperature: '28°C',
    icon: 'sunny',
    pressure: '1015 hPa',
    sunrise: '06:30',
    sunset: '18:00',
  };

  it('deve renderizar WeatherLocation com cidade e país', () => {
    render(<CurrentWeather {...defaultProps} />);
    expect(screen.getByText('São Paulo, Brasil')).toBeInTheDocument();
  });

  it('deve renderizar WeatherDetails com pressão, nascer e pôr do sol', () => {
    render(<CurrentWeather {...defaultProps} />);
    expect(screen.getByText(/Pressão: 1015 hPa/i)).toBeInTheDocument();
    expect(screen.getByText(/Nascer do sol: 06:30/i)).toBeInTheDocument();
    expect(screen.getByText(/Pôr do sol: 18:00/i)).toBeInTheDocument();
  });

  it('deve renderizar temperatura atual', () => {
    render(<CurrentWeather {...defaultProps} />);
    expect(screen.getByText('28°C')).toBeInTheDocument();
  });
});
