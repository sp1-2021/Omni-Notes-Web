import {
  Circle,
  Skeleton,
  SkeletonText,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

interface NoteProps {
  title?: string;
  desc?: string;
  date?: string;
  isLoading?: boolean;
}

export const Note: React.FC<NoteProps> = ({ title, desc, date, isLoading }) => {
  return (
    <Stack
      cursor="pointer"
      direction="row"
      spacing={3}
      px={4}
      pt={2}
      width="full"
      transition="all 0.2s ease-in"
      borderRadius={8}
      _hover={{
        backgroundColor: 'gray.700',
        '&>.note-content': {
          borderBottomColor: 'transparent',
        },
      }}
      _last={{
        '&>.note-content': {
          borderBottom: 'none',
        },
      }}
    >
      <Circle size={2} bgColor={isLoading ? 'transparent' : 'red.500'} mt={2} />
      <Stack
        flex={1}
        transition="all 0.2s ease-in"
        className="note-content"
        borderBottomWidth={1}
        borderBottomColor={useColorModeValue(
          'rgba(0, 0, 0, 0.2)',
          'rgba(255, 255, 255, 0.1)'
        )}
        pb={4}
      >
        <Skeleton isLoaded={!isLoading} height={4} width={isLoading && 36}>
          <Text mb={1} fontWeight="bold">
            {title}
          </Text>
        </Skeleton>
        <SkeletonText isLoaded={!isLoading} noOfLines={3}>
          <Text color={useColorModeValue('gray.900', 'gray.400')} noOfLines={3}>
            {desc}
          </Text>
        </SkeletonText>
        <Skeleton isLoaded={!isLoading} height={4} width={isLoading && 20}>
          <Text color={useColorModeValue('gray.800', 'gray.500')}>{date}</Text>
        </Skeleton>
      </Stack>
    </Stack>
  );
};
