import { useEffect } from 'react';
import { useToast } from '@chakra-ui/react';
import { fetchCityFromCoordinates } from '../services/geolocation';

export function useUserLocation(setCity: (city: string) => void) {
  const toast = useToast();

  useEffect(() => {
    const getUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            const cityName = await fetchCityFromCoordinates(
              latitude,
              longitude,
            );
            setCity(cityName);
          },
          () => {
            showToast(
              'Não foi possível obter sua localização, usando Brasília como padrão.',
            );
            setCity('Brasília');
          },
        );
      } else {
        showToast(
          'Geolocalização não é suportada, usando Brasília como padrão.',
        );
        setCity('Brasília');
      }
    };

    const showToast = (description: string) => {
      toast({
        title: 'Aviso',
        description,
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    };
    getUserLocation();
  }, [setCity, toast]);
}
