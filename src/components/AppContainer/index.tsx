import { Flex } from '@chakra-ui/react';
import { ReactNode } from 'react';

export interface AppContainerProps {
  children: ReactNode;
}

export function AppContainer({ children }: AppContainerProps) {
  return (
    <Flex
      direction="column"
      align="center"
      minH="100vh"
      w="100%"
      maxW="1200px"
      mx="auto"
      px={{ base: 0, md: 6 }}
      py={{ base: 1, md: 4 }}
    >
      {children}
    </Flex>
  );
}
