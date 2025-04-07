import { WeatherApiResponse } from '../../types/weather';
import { fetchWeather } from '../fetchWeather';

jest.mock('tz-lookup', () => jest.fn(() => 'America/Sao_Paulo'));
global.fetch = jest.fn();

const mockApiResponse: WeatherApiResponse = {
  city: {
    name: 'São Paulo',
    country: 'BR',
    coord: { lat: -23.55, lon: -46.63 },
    sunrise: 1712394000,
    sunset: 1712437200,
    timezone: -10800,
  },
  list: [
    {
      dt: 1712448000,
      main: {
        temp: 25,
        temp_min: 20,
        temp_max: 28,
        pressure: 1013,
      },
      weather: [{ icon: '01d', description: 'céu limpo' }],
    },
  ],
};

describe('fetchWeather', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve retornar os dados de previsão formatados corretamente', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockApiResponse,
    });

    const result = await fetchWeather('São Paulo', 'metric');

    expect(result).toEqual(
      expect.objectContaining({
        name: 'São Paulo',
        country: 'BR',
        icon: '01d',
        weatherCondition: 'céu limpo',
        pressure: '1013 hPa',
        temp: expect.stringMatching(/°C$/),
        forecast: expect.any(Array),
      }),
    );
  });

  it('deve lançar erro se a cidade não for encontrada (404)', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 404,
      json: async () => ({ message: 'Cidade não encontrada' }),
    });

    await expect(fetchWeather('CidadeInvalida', 'metric')).rejects.toThrow(
      'Cidade não encontrada',
    );
  });

  it('deve lançar erro genérico se response não estiver ok', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
    });

    await expect(fetchWeather('Erro', 'metric')).rejects.toThrow(
      'Erro ao buscar os dados',
    );
  });

  it('deve lançar erro se lista estiver vazia', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        ...mockApiResponse,
        list: [],
      }),
    });

    await expect(fetchWeather('Vazio', 'metric')).rejects.toThrow(
      'Nenhuma previsão encontrada.',
    );
  });
});
