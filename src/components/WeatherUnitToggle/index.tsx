import { Button, Tooltip, useColorMode } from '@chakra-ui/react';

interface WeatherUnitToggleProps {
  unit: 'metric' | 'imperial';
  setUnit: (value: 'metric' | 'imperial') => void;
}

export function WeatherUnitToggle({ unit, setUnit }: WeatherUnitToggleProps) {
  const { colorMode } = useColorMode();

  const tooltipLabel =
    unit === 'metric'
      ? 'Trocar para Fahrenheit (°F)'
      : 'Trocar para Celsius (°C)';

  return (
    <Tooltip label={tooltipLabel} hasArrow placement="top">
      <Button
        onClick={() => setUnit(unit === 'metric' ? 'imperial' : 'metric')}
        size="md"
        minW="50px"
        variant="outline"
        border="2px solid"
        borderColor={colorMode === 'light' ? 'white' : 'black'}
        color={colorMode === 'light' ? 'white' : 'black'}
        _hover={{
          bg: colorMode === 'light' ? 'whiteAlpha.300' : 'blackAlpha.300',
        }}
      >
        {unit === 'metric' ? '°C' : '°F'}
      </Button>
    </Tooltip>
  );
}
