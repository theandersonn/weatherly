import { IconButton, Tooltip, useColorMode } from '@chakra-ui/react';
import { FaSun, FaMoon } from 'react-icons/fa';

export function ThemeToggle() {
  const { colorMode, toggleColorMode } = useColorMode();

  const handleToggle = (event: React.MouseEvent) => {
    event.stopPropagation();
    toggleColorMode();
  };

  const tooltipLabel =
    colorMode === 'light'
      ? 'Trocar para modo escuro'
      : 'Trocar para modo claro';

  return (
    <Tooltip label={tooltipLabel} hasArrow placement="top">
      <IconButton
        aria-label="Alternar tema"
        icon={colorMode === 'light' ? <FaSun /> : <FaMoon />}
        onClick={handleToggle}
        size="md"
        minW="50px"
        variant="outline"
        border="2px solid"
        borderColor={colorMode === 'light' ? 'white' : 'black'}
        color={colorMode === 'light' ? 'white' : 'black'}
        _hover={{
          bg: colorMode === 'light' ? 'whiteAlpha.300' : 'blackAlpha.300',
        }}
      />
    </Tooltip>
  );
}
