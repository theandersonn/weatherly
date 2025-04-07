import {
  VStack,
  Text,
  useColorModeValue,
  HStack,
  Stack,
} from '@chakra-ui/react';
import { FaMapMarkerAlt } from 'react-icons/fa';

export interface WeatherLocationProps {
  city: string;
  country: string;
  currentMonth: string;
  currentTime: string;
  weatherCondition: string;
}

export function WeatherLocation({
  city,
  country,
  currentMonth,
  currentTime,
  weatherCondition,
}: WeatherLocationProps) {
  const textColor = useColorModeValue('white', 'black');

  return (
    <VStack
      spacing={0.5}
      align={{ base: 'center', md: 'flex-start' }}
      textAlign={{ base: 'center', md: 'left' }}
    >
      <HStack spacing={2}>
        <FaMapMarkerAlt color={textColor} />
        <Text
          fontSize="2xl"
          color={textColor}
          textTransform="uppercase"
          lineHeight="short"
        >
          {city}, {country}
        </Text>
      </HStack>

      <Stack
        direction={{ base: 'row', md: 'column' }}
        spacing={2}
        align="center"
        justify="center"
      >
        <Text
          fontSize={{ base: '4xl', md: '6xl' }}
          color={textColor}
          textTransform="uppercase"
          lineHeight="shorter"
        >
          {currentMonth}
        </Text>
        <Text
          fontSize={{ base: '4xl', md: '8xl' }}
          color={textColor}
          textTransform="uppercase"
          lineHeight="none"
        >
          {currentTime}
        </Text>
      </Stack>

      <Text
        fontSize="2xl"
        color={textColor}
        textTransform="uppercase"
        lineHeight="short"
      >
        {weatherCondition}
      </Text>
    </VStack>
  );
}
