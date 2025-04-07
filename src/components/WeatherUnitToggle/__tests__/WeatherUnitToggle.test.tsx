import { render, screen, fireEvent } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import { WeatherUnitToggle } from '..';

describe('WeatherUnitToggle', () => {
  const mockSetUnit = jest.fn();

  const renderComponent = (unit: 'metric' | 'imperial' = 'metric') =>
    render(
      <ChakraProvider>
        <WeatherUnitToggle unit={unit} setUnit={mockSetUnit} />
      </ChakraProvider>,
    );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renderiza com °C quando unidade é metric', () => {
    renderComponent('metric');
    expect(screen.getByText('°C')).toBeInTheDocument();
  });

  it('renderiza com °F quando unidade é imperial', () => {
    renderComponent('imperial');
    expect(screen.getByText('°F')).toBeInTheDocument();
  });

  it('chama setUnit corretamente ao clicar', () => {
    renderComponent('metric');
    fireEvent.click(screen.getByRole('button'));
    expect(mockSetUnit).toHaveBeenCalledWith('imperial');
  });

  it('mostra tooltip correto para metric ao focar', async () => {
    renderComponent('metric');
    const button = screen.getByRole('button');
    fireEvent.focus(button);
    const tooltip = await screen.findByRole('tooltip');
    expect(tooltip).toHaveTextContent(/trocar para fahrenheit/i);
  });

  it('mostra tooltip correto para imperial ao focar', async () => {
    renderComponent('imperial');
    const button = screen.getByRole('button');
    fireEvent.focus(button);
    const tooltip = await screen.findByRole('tooltip');
    expect(tooltip).toHaveTextContent(/trocar para celsius/i);
  });
});
