import { extendTheme, ThemeConfig, StyleFunctionProps } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const styles = {
  global: (props: StyleFunctionProps) => {
    return {
      body: {
        bg: props.colorMode === 'light' ? 'white' : 'gray.900',
        color: props.colorMode === 'light' ? 'gray.900' : 'gray.100',
      },
      '*::placeholder': {
        color: props.colorMode === 'light' ? 'gray.600' : 'gray.400',
      },
      'input, textarea': {
        borderColor: props.colorMode === 'light' ? 'gray.300' : 'gray.500',
        color: props.colorMode === 'light' ? 'gray.900' : 'gray.100',
      },
      button: {
        borderColor: props.colorMode === 'light' ? 'gray.300' : 'gray.500',
        color: props.colorMode === 'light' ? 'gray.900' : 'gray.100',
      },
    };
  },
};

const fonts = {
  heading: "'Sofia Sans', sans-serif",
  body: "'Sofia Sans', sans-serif",
};

const theme = extendTheme({ config, styles, fonts });

export default theme;
