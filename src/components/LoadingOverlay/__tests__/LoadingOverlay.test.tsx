import React from 'react';
import { render, screen } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import { LoadingOverlay } from '..';

describe('LoadingOverlay', () => {
  it('renders the spinner', () => {
    render(
      <ChakraProvider>
        <LoadingOverlay />
      </ChakraProvider>,
    );
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});
