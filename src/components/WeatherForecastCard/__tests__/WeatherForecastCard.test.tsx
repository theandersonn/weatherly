import { render, screen } from '@testing-library/react';
import { WeatherForecastCard } from '..';
import { ChakraProvider } from '@chakra-ui/react';

jest.mock('react-animated-weather', () => {
  const MockAnimatedWeatherIcon = ({ icon }: { icon: string }) => (
    <div data-testid="weather-icon" data-icon={icon} />
  );
  MockAnimatedWeatherIcon.displayName = 'MockAnimatedWeatherIcon';
  return MockAnimatedWeatherIcon;
});

describe('WeatherForecastCard', () => {
  const renderComponent = (props: {
    day: string;
    icon: string;
    maxTemp: string;
    minTemp: string;
  }) => {
    return render(
      <ChakraProvider>
        <WeatherForecastCard {...props} />
      </ChakraProvider>,
    );
  };

  it('renderiza o dia e temperaturas corretamente', () => {
    renderComponent({
      day: 'Dom',
      icon: '01d',
      maxTemp: '30°C',
      minTemp: '20°C',
    });

    expect(screen.getByText('Dom')).toBeInTheDocument();
    expect(screen.getByText('30°C')).toBeInTheDocument();
    expect(screen.getByText('20°C')).toBeInTheDocument();
  });

  it('renderiza o ícone correto baseado no código de ícone', () => {
    renderComponent({
      day: 'Seg',
      icon: '09n',
      maxTemp: '25°C',
      minTemp: '18°C',
    });

    const icon = screen.getByTestId('weather-icon');
    expect(icon).toHaveAttribute('data-icon', 'RAIN');
  });

  it('usa "CLEAR_DAY" como fallback se ícone for desconhecido', () => {
    renderComponent({
      day: 'Ter',
      icon: '999x',
      maxTemp: '28°C',
      minTemp: '19°C',
    });

    const icon = screen.getByTestId('weather-icon');
    expect(icon).toHaveAttribute('data-icon', 'CLEAR_DAY');
  });
});
