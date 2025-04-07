import React from 'react';
import { render } from '@testing-library/react';
import AnimatedWeather from 'react-animated-weather';
import { AnimatedWeatherIcon } from '..';

jest.mock('react-animated-weather', () =>
  jest.fn(() => React.createElement('div', { 'data-testid': 'animated-icon' })),
);

describe('AnimatedWeatherIcon', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correct icon and color for known weather code', () => {
    render(<AnimatedWeatherIcon icon="01d" size={64} />);

    const props = (AnimatedWeather as jest.Mock).mock.calls[0][0];
    expect(props).toMatchObject({
      icon: 'CLEAR_DAY',
      color: '#f9d71c',
      size: 64,
      animate: true,
    });
  });
});
