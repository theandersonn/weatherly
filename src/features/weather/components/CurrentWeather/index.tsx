import { Box, Flex, HStack, Show, VStack } from '@chakra-ui/react';
import {
  AnimatedWeatherIcon,
  WeatherDetails,
  WeatherLocation,
} from '@/components';

type CurrentWeatherProps = {
  city: string;
  country: string;
  currentMonth: string;
  currentTime: string;
  weatherCondition: string;
  temperature: string;
  icon: string;
  pressure: string;
  sunrise: string;
  sunset: string;
};

export function CurrentWeather({
  city,
  country,
  weatherCondition,
  currentMonth,
  currentTime,
  temperature,
  icon,
  pressure,
  sunrise,
  sunset,
}: CurrentWeatherProps) {
  return (
    <Flex
      direction={{ base: 'column', md: 'row' }}
      justify="space-between"
      align="top"
      gap={6}
      p={6}
      mt={{ base: 2, lg: 12 }}
      w="100%"
    >
      <VStack
        align={{ base: 'center', md: 'flex-start' }}
        w={{ base: '100%', lg: '50%' }}
      >
        <WeatherLocation
          city={city}
          country={country}
          weatherCondition={weatherCondition}
          currentMonth={currentMonth}
          currentTime={currentTime}
        />
      </VStack>

      <VStack
        align={{ base: 'center', md: 'flex-end' }}
        spacing={2}
        w={{ base: '100%', lg: '50%' }}
      >
        {/* Versão Mobile */}
        <Show breakpoint="(max-width: 767px)">
          <HStack justify="space-between" w="100%">
            <VStack align="flex-start">
              <WeatherDetails label="Pressão" value={pressure} fontSize="md" />
              <WeatherDetails
                label="Nascer do sol"
                value={sunrise}
                fontSize="md"
              />
              <WeatherDetails label="Pôr do sol" value={sunset} fontSize="md" />
            </VStack>
            <Box>
              <WeatherDetails value={temperature} fontSize="4xl" />
            </Box>
          </HStack>
        </Show>

        {/* Versão Desktop */}
        <Show breakpoint="(min-width: 768px)">
          <VStack align="flex-end" textAlign="right" spacing={2}>
            <WeatherDetails
              label="Pressão"
              value={pressure}
              fontSize={{ base: 'lg', lg: '2xl' }}
            />
            <WeatherDetails
              label="Nascer do sol"
              value={sunrise}
              fontSize={{ base: 'lg', lg: '2xl' }}
            />
            <WeatherDetails
              label="Pôr do sol"
              value={sunset}
              fontSize={{ base: 'lg', lg: '2xl' }}
            />
            <HStack spacing={4}>
              <Show above="md">
                <AnimatedWeatherIcon icon={icon} size={76} />
              </Show>
              <WeatherDetails value={temperature} fontSize="7xl" />
            </HStack>
          </VStack>
        </Show>
      </VStack>
    </Flex>
  );
}
