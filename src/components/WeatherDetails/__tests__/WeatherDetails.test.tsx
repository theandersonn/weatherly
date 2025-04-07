import { render, screen } from '@testing-library/react';
import { WeatherDetails, WeatherDetailsProps } from '..';
import { ChakraProvider } from '@chakra-ui/react';

describe('WeatherDetails', () => {
  const renderComponent = (props: WeatherDetailsProps) =>
    render(
      <ChakraProvider>
        <WeatherDetails {...props} />
      </ChakraProvider>,
    );

  it('renderiza o valor e o label corretamente', () => {
    renderComponent({
      label: 'Temperatura',
      value: '25°C',
      fontSize: 'md',
    });

    expect(screen.getByText(/Temperatura:/i)).toBeInTheDocument();
    expect(screen.getByText(/25°C/i)).toBeInTheDocument();
  });

  it('renderiza apenas o valor se o label não for fornecido', () => {
    renderComponent({
      value: '25°C',
      fontSize: 'md',
    });

    expect(screen.getByText(/25°C/i)).toBeInTheDocument();
    expect(screen.queryByText(/:/)).not.toBeInTheDocument();
  });
});
