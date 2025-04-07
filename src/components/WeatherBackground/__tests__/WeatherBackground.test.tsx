import { render, screen } from '@testing-library/react';
import { WeatherBackground } from '..';

jest.mock('../isCurrentlyDaytime', () => ({
  isCurrentlyDaytime: jest.fn(() => true),
}));

jest.mock('../translateWeatherCondition', () => ({
  translateWeatherCondition: jest.fn(() => 'clear'),
}));

jest.mock('../getBackgroundImage', () => ({
  getBackgroundImage: jest.fn(() => '/images/clear-day.jpg'),
}));

describe('WeatherBackground', () => {
  it('renders children', () => {
    render(
      <WeatherBackground
        weatherCondition="céu limpo"
        sunrise="123"
        sunset="456"
      >
        <div>Conteúdo</div>
      </WeatherBackground>,
    );
    expect(screen.getByText('Conteúdo')).toBeInTheDocument();
  });
});
