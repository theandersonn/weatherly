import {
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
  useColorModeValue,
} from '@chakra-ui/react';
import { MdSearch } from 'react-icons/md';

interface WeatherSearchBarProps {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  onSearchSubmit: () => void;
}

export function WeatherSearchBar({
  search,
  setSearch,
  onSearchSubmit,
}: WeatherSearchBarProps) {
  const textColor = useColorModeValue('white', 'black');
  const borderColor = useColorModeValue('white', 'black');
  const placeholderColor = useColorModeValue('white', 'black');
  const buttonHoverBg = useColorModeValue('whiteAlpha.300', 'gray.300');

  return (
    <InputGroup>
      <Input
        placeholder="Digite uma cidade..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && onSearchSubmit()}
        textAlign="left"
        border="2px solid"
        borderColor={borderColor}
        color={textColor}
        _placeholder={{ color: placeholderColor }}
        bg="transparent"
      />
      <InputRightElement>
        <IconButton
          aria-label="Buscar cidade"
          icon={<MdSearch size={20} />}
          onClick={onSearchSubmit}
          bg="transparent"
          color={textColor}
          _hover={{ bg: buttonHoverBg }}
        />
      </InputRightElement>
    </InputGroup>
  );
}
