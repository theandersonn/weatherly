import { VStack, Text, Flex, useColorModeValue } from '@chakra-ui/react';
import AnimatedWeatherIcon from 'react-animated-weather';

export interface WeatherForecastCardProps {
  day: string;
  icon: string;
  maxTemp: string;
  minTemp: string;
}

const iconMap: Record<string, string> = {
  '01d': 'CLEAR_DAY',
  '01n': 'CLEAR_NIGHT',
  '02d': 'PARTLY_CLOUDY_DAY',
  '02n': 'PARTLY_CLOUDY_NIGHT',
  '03d': 'CLOUDY',
  '03n': 'CLOUDY',
  '04d': 'CLOUDY',
  '04n': 'CLOUDY',
  '09d': 'RAIN',
  '09n': 'RAIN',
  '10d': 'RAIN',
  '10n': 'RAIN',
  '11d': 'SLEET',
  '11n': 'SLEET',
  '13d': 'SNOW',
  '13n': 'SNOW',
  '50d': 'FOG',
  '50n': 'FOG',
};

export function WeatherForecastCard({
  day,
  icon,
  maxTemp,
  minTemp,
}: WeatherForecastCardProps) {
  const bgColor = useColorModeValue('rgba(255, 255, 255, 0.1)', 'gray.200');
  const textColor = useColorModeValue('white', 'black');
  const weatherIcon = iconMap[icon] || 'CLEAR_DAY';

  return (
    <Flex
      borderRadius="md"
      align="center"
      justify="space-between"
      direction={{ base: 'row', lg: 'column' }}
      bg={bgColor}
      w="100%"
      p="3"
      gap={{ base: 3, lg: 14 }}
    >
      <Text
        color={textColor}
        fontSize={{ base: 'lg', md: '2xl', lg: '4xl' }}
        textAlign="center"
        minW="60px"
      >
        {day}
      </Text>

      <AnimatedWeatherIcon
        icon={weatherIcon}
        color={textColor}
        size={58}
        animate
      />

      <VStack spacing={0} align={{ base: 'flex-end', md: 'center' }}>
        <Text color={textColor} fontSize={{ base: 'lg', md: '2xl', lg: '4xl' }}>
          {maxTemp}
        </Text>
        <Text color={textColor} fontSize={{ base: 'lg', md: '2xl', lg: '4xl' }}>
          {minTemp}
        </Text>
      </VStack>
    </Flex>
  );
}
