import {
  HStack,
  Text,
  useColorModeValue,
  ResponsiveValue,
} from '@chakra-ui/react';

export interface WeatherDetailsProps {
  label?: string;
  value: string;
  fontSize: ResponsiveValue<string>;
}

export function WeatherDetails({
  label,
  value,
  fontSize,
}: WeatherDetailsProps) {
  const textColor = useColorModeValue('white', 'black');

  return (
    <HStack spacing={2} align="center">
      {label && (
        <Text
          fontSize={fontSize}
          textTransform="uppercase"
          color={textColor}
          lineHeight="short"
        >
          {label}:
        </Text>
      )}
      <Text
        fontSize={fontSize}
        textTransform="uppercase"
        color={textColor}
        lineHeight="short"
      >
        {value}
      </Text>
    </HStack>
  );
}
