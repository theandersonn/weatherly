import { render, screen, fireEvent } from '@testing-library/react';
import { WeatherSearchBar } from '..';
import { ChakraProvider } from '@chakra-ui/react';

describe('WeatherSearchBar', () => {
  const mockSetSearch = jest.fn();
  const mockOnSearchSubmit = jest.fn();

  const renderComponent = (value = '') =>
    render(
      <ChakraProvider>
        <WeatherSearchBar
          search={value}
          setSearch={mockSetSearch}
          onSearchSubmit={mockOnSearchSubmit}
        />
      </ChakraProvider>,
    );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renderiza o input com o valor inicial', () => {
    renderComponent('São Paulo');
    expect(screen.getByPlaceholderText(/digite uma cidade/i)).toHaveValue(
      'São Paulo',
    );
  });

  it('chama setSearch ao digitar no input', () => {
    renderComponent();
    fireEvent.change(screen.getByPlaceholderText(/digite uma cidade/i), {
      target: { value: 'Rio' },
    });
    expect(mockSetSearch).toHaveBeenCalledWith('Rio');
  });

  it('chama onSearchSubmit ao pressionar Enter', () => {
    renderComponent('Campinas');
    fireEvent.keyPress(screen.getByPlaceholderText(/digite uma cidade/i), {
      key: 'Enter',
      code: 'Enter',
      charCode: 13,
    });
    expect(mockOnSearchSubmit).toHaveBeenCalled();
  });

  it('chama onSearchSubmit ao clicar no botão de busca', () => {
    renderComponent('Curitiba');
    fireEvent.click(screen.getByRole('button', { name: /buscar cidade/i }));
    expect(mockOnSearchSubmit).toHaveBeenCalled();
  });
});
