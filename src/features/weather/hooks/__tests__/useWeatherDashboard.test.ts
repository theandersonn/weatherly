import { renderHook, act } from '@testing-library/react';
import { useWeatherDashboard } from '../useWeatherDashboard';
import { useToast } from '@chakra-ui/react';
import { useUserLocation } from '../useUserLocation';
import { useWeather } from '../useWeather';
import { validateSearchInput } from 'lib/validateSearchInput';
import { defaultWeatherData } from '../../constants/defaultWeatherData';

jest.mock('@chakra-ui/react', () => ({
  ...jest.requireActual('@chakra-ui/react'),
  useToast: jest.fn(),
}));
jest.mock('../useUserLocation');
jest.mock('../useWeather');
jest.mock('lib/validateSearchInput');

describe('useWeatherDashboard', () => {
  const mockToast = jest.fn();
  const mockShowToast = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useToast as jest.Mock).mockReturnValue(mockToast);
    (mockToast as jest.Mock).mockImplementation(mockShowToast);
    (useUserLocation as jest.Mock).mockImplementation((cb) => {
      setTimeout(() => {
        cb('São Paulo');
      }, 0);
    });
  });

  it('deve inicializar com os dados padrões e atualizas após carregamento bem-sucedido', () => {
    const mockWeather = { temperature: 30, condition: 'Sunny' };
    (useWeather as jest.Mock).mockReturnValue({
      data: mockWeather,
      isLoading: false,
      isFetching: false,
      error: null,
    });

    const { result } = renderHook(() => useWeatherDashboard());

    expect(result.current.weatherData).toEqual(mockWeather);
    expect(result.current.isFetching).toBe(false);
  });

  it('deve manter os últimos dados válidos quando dados novos ainda não estão disponíveis', () => {
    (useWeather as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      isFetching: true,
      error: null,
    });

    const { result } = renderHook(() => useWeatherDashboard());

    expect(result.current.weatherData).toEqual(defaultWeatherData);
  });

  it('deve exibir  toast de erro quando a cidade não for encontrada', () => {
    (useWeather as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      isFetching: false,
      error: new Error('404 - city not found'),
    });

    renderHook(() => useWeatherDashboard());

    expect(mockShowToast).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Aviso',
        description: 'Cidade não encontrada',
        status: 'warning',
      }),
    );
  });

  it('deve exibir toast de erro quando o erro for de outro tipo', () => {
    (useWeather as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      isFetching: false,
      error: new Error('API quebrada'),
    });

    renderHook(() => useWeatherDashboard());

    expect(mockShowToast).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Aviso',
        description: 'Erro ao carregar os dados',
        status: 'error',
      }),
    );
  });

  it('deve exibir toast quabndo  o input de busca estiver vazio', () => {
    (useWeather as jest.Mock).mockReturnValue({
      data: defaultWeatherData,
      isLoading: false,
      isFetching: false,
      error: null,
    });

    (validateSearchInput as jest.Mock).mockImplementation((_input, onFail) => {
      onFail();
      return '';
    });

    const { result } = renderHook(() => useWeatherDashboard());

    act(() => {
      result.current.setSearch('');
      result.current.handleSearchSubmit();
    });

    expect(mockShowToast).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Atenção',
        description: 'Digite o nome da cidade',
      }),
    );
  });
});
