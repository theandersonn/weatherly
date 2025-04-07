import { Dispatch, SetStateAction } from 'react';
import { ThemeToggle, WeatherSearchBar, WeatherUnitToggle } from '@/components';
import { Box, Flex } from '@chakra-ui/react';

interface WeatherHeaderProps {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  onSearchSubmit: () => void;
  unit: 'metric' | 'imperial';
  setUnit: (value: 'metric' | 'imperial') => void;
}

export function WeatherHeader({
  search,
  setSearch,
  onSearchSubmit,
  unit,
  setUnit,
}: WeatherHeaderProps) {
  return (
    <Flex justify="space-between" align="center" gap={2} wrap="nowrap" w="100%">
      <ThemeToggle />
      <Box flex="1" maxW="560px" mx="auto">
        <WeatherSearchBar
          search={search}
          setSearch={setSearch}
          onSearchSubmit={onSearchSubmit}
        />
      </Box>
      <WeatherUnitToggle unit={unit} setUnit={setUnit} />
    </Flex>
  );
}
