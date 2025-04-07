'use client';

import { ReactNode, useState } from 'react';
import { ChakraProvider, CSSReset, ColorModeScript } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import theme from '@/theme';

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <CSSReset />
        {children}
      </ChakraProvider>
    </QueryClientProvider>
  );
}
