import { Flex, Spinner } from '@chakra-ui/react';

export function LoadingOverlay() {
  return (
    <Flex
      position="absolute"
      top="0"
      left="0"
      w="100%"
      h="100vh"
      align="center"
      justify="center"
      zIndex="999"
    >
      <Spinner size="xl" color="orange" />
    </Flex>
  );
}
