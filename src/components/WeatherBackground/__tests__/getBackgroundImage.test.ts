import { getBackgroundImage } from '../getBackgroundImage';

describe('getBackgroundImage', () => {
  it('returns the correct day image for "clear"', () => {
    expect(getBackgroundImage('clear', true)).toBe('/images/clear-day.jpg');
  });

  it('returns the correct night image for "rain"', () => {
    expect(getBackgroundImage('rain', false)).toBe('/images/rainy-night.jpg');
  });

  it('returns default images if condition is unknown', () => {
    expect(getBackgroundImage('foo', true)).toBe('/images/default-day.jpg');
    expect(getBackgroundImage('bar', false)).toBe('/images/default-night.jpg');
  });
});
