import { isCurrentlyDaytime } from '../isCurrentlyDaytime';

describe('isCurrentlyDaytime', () => {
  const lat = -15.793889;
  const lon = -47.882778;

  it('returns true if current time is between sunrise and sunset', () => {
    const now = new Date();
    const sunrise = `${now.getHours() - 1}:${now.getMinutes()}`;
    const sunset = `${now.getHours() + 1}:${now.getMinutes()}`;

    expect(isCurrentlyDaytime(sunrise, sunset, lat, lon)).toBe(true);
  });

  it('returns false if current time is before sunrise or after sunset', () => {
    const now = new Date();
    const sunrise = `${now.getHours() + 1}:${now.getMinutes()}`;
    const sunset = `${now.getHours() + 2}:${now.getMinutes()}`;

    expect(isCurrentlyDaytime(sunrise, sunset, lat, lon)).toBe(false);
  });

  it('returns true if sunrise or sunset is missing', () => {
    const now = new Date();
    const sunset = `${now.getHours() + 1}:${now.getMinutes()}`;

    expect(isCurrentlyDaytime(undefined, sunset, lat, lon)).toBe(true);
  });
});
