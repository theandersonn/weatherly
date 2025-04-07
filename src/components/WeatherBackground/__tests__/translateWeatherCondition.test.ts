import { translateWeatherCondition } from '../translateWeatherCondition';

describe('translateWeatherCondition', () => {
  it('should translate known Portuguese conditions', () => {
    expect(translateWeatherCondition('céu limpo')).toBe('clear');
    expect(translateWeatherCondition('garoa')).toBe('drizzle');
  });

  it('should fallback to original if not in map', () => {
    expect(translateWeatherCondition('desconhecido')).toBe('desconhecido');
  });

  it('should be case insensitive', () => {
    expect(translateWeatherCondition('NUBLADO')).toBe('cloud');
  });
});
