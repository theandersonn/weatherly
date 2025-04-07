import { getWeatherBackground } from '../getWeatherBackground';

describe('getWeatherBackground', () => {
  it('deve exibir uma imagem de chuva durante o dia', () => {
    expect(getWeatherBackground('rain', true)).toBe('/images/rainy-day.jpg');
  });

  it('deve exibir uma imagem de chuva à noite', () => {
    expect(getWeatherBackground('rain', false)).toBe('/images/rainy-night.jpg');
  });

  it('deve exibir uma imagem nublada durante o dia', () => {
    expect(getWeatherBackground('clouds', true)).toBe('/images/cloudy-day.jpg');
  });

  it('deve exibir uma imagem nublada à noite', () => {
    expect(getWeatherBackground('clouds', false)).toBe(
      '/images/cloudy-night.jpg',
    );
  });

  it('deve exibir uma imagem de neve durante o dia', () => {
    expect(getWeatherBackground('snow', true)).toBe('/images/snow-day.jpg');
  });

  it('deve exibir uma imagem de neve à noite', () => {
    expect(getWeatherBackground('snow', false)).toBe('/images/snow-night.jpg');
  });

  it('deve exibir uma imagem de céu limpo durante o dia', () => {
    expect(getWeatherBackground('clear', true)).toBe('/images/sunny.jpg');
  });

  it('deve exibir uma imagem de céu limpo à noite', () => {
    expect(getWeatherBackground('clear', false)).toBe(
      '/images/clear-night.jpg',
    );
  });

  it('deve exibir uma imagem padrão durante o dia para condição desconhecida', () => {
    expect(getWeatherBackground('unknown', true)).toBe(
      '/images/default-day.jpg',
    );
  });

  it('deve exibir imagem padrão à noite para condição desconhecida', () => {
    expect(getWeatherBackground('unknown', false)).toBe(
      '/images/default-night.jpg',
    );
  });
});
