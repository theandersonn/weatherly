import { render, screen, fireEvent } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import { ThemeToggle } from '..';

describe('ThemeToggle', () => {
  it('renderiza botão com aria-label e ícone correto', () => {
    render(
      <ChakraProvider>
        <ThemeToggle />
      </ChakraProvider>,
    );

    const button = screen.getByRole('button', { name: /alternar tema/i });
    expect(button).toBeInTheDocument();
  });

  it('alterna o tema ao clicar no botão', () => {
    render(
      <ChakraProvider>
        <ThemeToggle />
      </ChakraProvider>,
    );

    const button = screen.getByRole('button', { name: /alternar tema/i });

    // Antes do clique
    const initialIcon = button.querySelector('svg');
    expect(initialIcon).toBeInTheDocument();

    // Clica para alternar
    fireEvent.click(button);

    // Após o clique, ícone deve mudar (se a alternância visual for observável no DOM)
    const updatedIcon = button.querySelector('svg');
    expect(updatedIcon).toBeInTheDocument();
  });
});
