import { useToast as useChakraToast } from '@chakra-ui/react';

export const useToast = () => {
  return useChakraToast({
    variant: 'solid',
    position: 'top-right',
  });
};
