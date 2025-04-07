import { render, screen } from '@testing-library/react';
import { WeatherHeader } from '..';

describe('WeatherHeader', () => {
  const mockSetSearch = jest.fn();
  const mockOnSearchSubmit = jest.fn();
  const mockSetUnit = jest.fn();

  it('deve renderizar os subcomponentes corretamente', () => {
    render(
      <WeatherHeader
        search="Brasília"
        setSearch={mockSetSearch}
        onSearchSubmit={mockOnSearchSubmit}
        unit="metric"
        setUnit={mockSetUnit}
      />,
    );

    expect(screen.getByRole('textbox')).toHaveValue('Brasília');
    expect(screen.getByRole('button', { name: /°[CF]/ })).toBeInTheDocument();
  });
});
