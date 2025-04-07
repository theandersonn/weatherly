'use client';
import { WeatherBackground, LoadingOverlay } from 'components';
import { AppContainer } from 'components/AppContainer';
import { CurrentWeather, ForecastList, WeatherHeader } from './components';
import { useWeatherDashboard } from './hooks/useWeatherDashboard';

export function WeatherDashboard() {
  const {
    search,
    setSearch,
    unit,
    setUnit,
    handleSearchSubmit,
    isInitialLoad,
    isFetching,
    weatherData,
  } = useWeatherDashboard();

  const {
    weatherCondition,
    temp,
    icon,
    pressure,
    sunrise,
    sunset,
    name,
    country,
    currentMonth,
    currentTime,
    forecast,
    lat,
    lon,
  } = weatherData;

  if (isInitialLoad) {
    return <LoadingOverlay />;
  }

  return (
    <WeatherBackground
      sunrise={sunrise}
      sunset={sunset}
      weatherCondition={weatherCondition}
      lat={lat}
      lon={lon}
    >
      {!isInitialLoad && isFetching && <LoadingOverlay />}
      <AppContainer>
        <WeatherHeader
          search={search}
          setSearch={setSearch}
          onSearchSubmit={handleSearchSubmit}
          unit={unit}
          setUnit={setUnit}
        />
        <CurrentWeather
          temperature={temp}
          icon={icon}
          pressure={pressure}
          sunrise={sunrise}
          sunset={sunset}
          city={name}
          country={country}
          currentMonth={currentMonth}
          currentTime={currentTime}
          weatherCondition={weatherCondition}
        />
        <ForecastList forecast={forecast} unit={unit} />
      </AppContainer>
    </WeatherBackground>
  );
}
