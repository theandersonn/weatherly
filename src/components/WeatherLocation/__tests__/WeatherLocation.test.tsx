import { render, screen } from '@testing-library/react';
import { WeatherLocation } from '..';
import { ChakraProvider } from '@chakra-ui/react';

describe('WeatherLocation', () => {
  const defaultProps = {
    city: 'São Paulo',
    country: 'BR',
    currentMonth: 'ABRIL',
    currentTime: '14:00',
    weatherCondition: 'CÉU LIMPO',
  };

  const renderComponent = (props = defaultProps) =>
    render(
      <ChakraProvider>
        <WeatherLocation {...props} />
      </ChakraProvider>,
    );

  it('renderiza o nome da cidade e do país', () => {
    renderComponent();
    expect(screen.getByText(/são paulo, br/i)).toBeInTheDocument();
  });

  it('renderiza o mês e a hora atual', () => {
    renderComponent();
    expect(screen.getByText(/abril/i)).toBeInTheDocument();
    expect(screen.getByText(/14:00/i)).toBeInTheDocument();
  });

  it('renderiza a condição do tempo', () => {
    renderComponent();
    expect(screen.getByText(/céu limpo/i)).toBeInTheDocument();
  });
});
