import type { ReactNode } from 'react';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useWeather } from '../useWeather';
import { fetchWeather } from '../../services/fetchWeather';

jest.mock('../../services/fetchWeather');

const mockWeatherData = {
  temperature: 25,
  condition: 'Sunny',
};

describe('useWeather', () => {
  const createWrapper = () => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });

    return function Wrapper({ children }: { children: ReactNode }) {
      return (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      );
    };
  };

  it('deve retornar os dados do clima ao buscar com sucesso', async () => {
    (fetchWeather as jest.Mock).mockResolvedValue(mockWeatherData);

    const { result } = renderHook(() => useWeather('São Paulo', 'metric'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual(mockWeatherData);
  });

  it('deve retornar erro quando a requisição falhar', async () => {
    (fetchWeather as jest.Mock).mockRejectedValue(new Error('Erro na API'));

    const { result } = renderHook(() => useWeather('São Paulo', 'metric'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.error).toEqual(new Error('Erro na API'));
  });
});
