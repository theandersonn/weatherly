import { render, waitFor } from '@testing-library/react';
import { useToast } from '@chakra-ui/react';
import { fetchCityFromCoordinates } from '../../services/geolocation';
import { useUserLocation } from '../useUserLocation';

jest.mock('../../services/geolocation');
jest.mock('@chakra-ui/react', () => ({
  ...jest.requireActual('@chakra-ui/react'),
  useToast: jest.fn(),
}));

describe('useUserLocation', () => {
  const mockSetCity = jest.fn();
  const mockToast = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useToast as jest.Mock).mockReturnValue(mockToast);
  });

  const TestComponent = () => {
    useUserLocation(mockSetCity);
    return null;
  };

  it('deve definir a cidade com base nas coordenadas do usuário', async () => {
    const mockCoords = { latitude: -23.55, longitude: -46.63 };

    Object.defineProperty(navigator, 'geolocation', {
      value: {
        getCurrentPosition: jest.fn((success: PositionCallback) =>
          success({
            coords: {
              ...mockCoords,
              accuracy: 10,
              altitude: null,
              altitudeAccuracy: null,
              heading: null,
              speed: null,
              toJSON: function () {
                throw new Error('Function not implemented.');
              },
            },
            timestamp: Date.now(),
            toJSON: function () {
              throw new Error('Function not implemented.');
            },
          }),
        ),
      },
      configurable: true,
    });

    (fetchCityFromCoordinates as jest.Mock).mockResolvedValue('São Paulo');

    render(<TestComponent />);

    await waitFor(() => {
      expect(fetchCityFromCoordinates).toHaveBeenCalledWith(
        mockCoords.latitude,
        mockCoords.longitude,
      );
      expect(mockSetCity).toHaveBeenCalledWith('São Paulo');
    });
  });

  it('deve definir Brasília e exibe toast se geolocalização falhar', async () => {
    Object.defineProperty(navigator, 'geolocation', {
      value: {
        getCurrentPosition: jest.fn(
          (_success: PositionCallback, error: PositionErrorCallback) => {
            error({
              code: 1,
              message: 'User denied Geolocation',
              PERMISSION_DENIED: 1,
              POSITION_UNAVAILABLE: 2,
              TIMEOUT: 3,
            } as GeolocationPositionError);
          },
        ),
      },
      configurable: true,
    });

    render(<TestComponent />);

    await waitFor(() => {
      expect(mockSetCity).toHaveBeenCalledWith('Brasília');
      expect(mockToast).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'Aviso',
          description:
            'Não foi possível obter sua localização, usando Brasília como padrão.',
        }),
      );
    });
  });

  it('deve definir Brasília e exibir toast se geolocalização não for suportada', async () => {
    const originalGeo = navigator.geolocation;

    Object.defineProperty(navigator, 'geolocation', {
      value: undefined,
      configurable: true,
    });

    render(<TestComponent />);

    await waitFor(() => {
      expect(mockSetCity).toHaveBeenCalledWith('Brasília');
      expect(mockToast).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'Aviso',
          description:
            'Geolocalização não é suportada, usando Brasília como padrão.',
        }),
      );
    });

    Object.defineProperty(navigator, 'geolocation', {
      value: originalGeo,
    });
  });
});
