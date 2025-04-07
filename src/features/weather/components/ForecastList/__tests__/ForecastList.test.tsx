import { render, screen } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import { ForecastList } from '..';
import { WeatherForecastCardProps } from '@/components/WeatherForecastCard';

jest.mock('@/components', () => ({
  WeatherForecastCard: ({
    day,
    maxTemp,
    minTemp,
  }: WeatherForecastCardProps) => (
    <div>
      <div>{day}</div>
      <div>{maxTemp}</div>
      <div>{minTemp}</div>
    </div>
  ),
}));

const mockForecast = [
  { day: 'Seg', icon: '01d', minTemp: 17, maxTemp: 28 },
  { day: 'Ter', icon: '02d', minTemp: 18, maxTemp: 29 },
];

const customRender = (ui: React.ReactElement) =>
  render(<ChakraProvider>{ui}</ChakraProvider>);

describe('ForecastList', () => {
  it('deve renderizar um card para cada item da previsão', () => {
    customRender(<ForecastList forecast={mockForecast} unit="metric" />);
    expect(screen.getByText('Seg')).toBeInTheDocument();
    expect(screen.getByText('Ter')).toBeInTheDocument();
    expect(screen.getByText('28°C')).toBeInTheDocument();
    expect(screen.getByText('17°C')).toBeInTheDocument();
  });

  it('deve utilizar °F quando a unidade for imperial', () => {
    customRender(<ForecastList forecast={mockForecast} unit="imperial" />);
    expect(screen.getByText('28°F')).toBeInTheDocument();
    expect(screen.getByText('17°F')).toBeInTheDocument();
  });
});
