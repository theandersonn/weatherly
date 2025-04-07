import { render, screen } from '@testing-library/react';
import { AppContainer } from '..';

describe('AppContainer', () => {
  it('renders children correctly', () => {
    render(
      <AppContainer>
        <div>Conteúdo de teste</div>
      </AppContainer>,
    );

    expect(screen.getByText('Conteúdo de teste')).toBeInTheDocument();
  });
});
