import { fetchCityFromCoordinates } from '../geolocation';

describe('fetchCityFromCoordinates', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  it('deve retornar o nome da cidade quando a resposta é válida', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({
        address: { municipality: 'São Paulo' },
      }),
    });

    const city = await fetchCityFromCoordinates(-23.55, -46.63);
    expect(city).toBe('São Paulo');
  });

  it('deve retornar "Brasília" se não houver address na resposta', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({}),
    });

    const city = await fetchCityFromCoordinates(-23.55, -46.63);
    expect(city).toBe('Brasília');
  });

  it('deve retornar "Brasília" se ocorrer erro na requisição', async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error('Erro de rede'));

    const city = await fetchCityFromCoordinates(-23.55, -46.63);
    expect(city).toBe('Brasília');
  });
});
