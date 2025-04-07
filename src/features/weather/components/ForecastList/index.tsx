import { Box, SimpleGrid } from '@chakra-ui/react';
import { WeatherForecastCard } from '@/components';

interface ForecastItem {
  day: string;
  icon: string;
  minTemp: number;
  maxTemp: number;
}

interface ForecastListProps {
  forecast: ForecastItem[];
  unit: 'metric' | 'imperial';
}

export function ForecastList({ forecast, unit }: ForecastListProps) {
  return (
    <SimpleGrid
      columns={{ base: 1, sm: 2, md: 3, lg: 5 }}
      spacing={4}
      w="100%"
      mt={{ base: 2, lg: 12 }}
    >
      {forecast.map((item, index) => (
        <Box key={index} w="100%">
          <WeatherForecastCard
            day={item.day}
            icon={item.icon}
            maxTemp={`${item.maxTemp}°${unit === 'metric' ? 'C' : 'F'}`}
            minTemp={`${item.minTemp}°${unit === 'metric' ? 'C' : 'F'}`}
          />
        </Box>
      ))}
    </SimpleGrid>
  );
}
