import { useState, useEffect, useRef } from 'react';
import { useToast } from '@chakra-ui/react';
import { useUserLocation } from './useUserLocation';
import { validateSearchInput } from 'lib/validateSearchInput';
import { defaultWeatherData } from '../constants/defaultWeatherData';
import { WeatherData } from '../types/weather';
import { useWeather } from './useWeather';

export function useWeatherDashboard() {
  const [city, setCity] = useState('Brasília');
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [search, setSearch] = useState('');
  const [lastValidData, setLastValidData] =
    useState<WeatherData>(defaultWeatherData);
  const isInitialLoad = useRef(true);
  const toast = useToast();

  useUserLocation(setCity);
  const { data, error, isLoading, isFetching } = useWeather(city, unit);

  useEffect(() => {
    if (data) setLastValidData(data);
  }, [data]);

  useEffect(() => {
    if (!isLoading && !isFetching) {
      isInitialLoad.current = false;
    }
  }, [isLoading, isFetching]);

  useEffect(() => {
    if (error) {
      const isNotFound =
        error.message.includes('404') ||
        error.message.includes('city not found');
      toast({
        title: 'Aviso',
        description: isNotFound
          ? 'Cidade não encontrada'
          : 'Erro ao carregar os dados',
        status: isNotFound ? 'warning' : 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    }
  }, [error, toast]);

  const handleSearchSubmit = () => {
    const trimmed = validateSearchInput(search, () => {
      toast({
        title: 'Atenção',
        description: 'Digite o nome da cidade',
        status: 'warning',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
    });

    if (!trimmed) return;
    setCity(trimmed);
    setSearch('');
  };

  return {
    search,
    setSearch,
    unit,
    setUnit,
    handleSearchSubmit,
    isInitialLoad: isInitialLoad.current,
    isFetching,
    weatherData: lastValidData,
  };
}
