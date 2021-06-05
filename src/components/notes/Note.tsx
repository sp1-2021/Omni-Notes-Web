import {
  Circle,
  Spinner,
  HStack,
  IconButton,
  Skeleton,
  SkeletonText,
  Stack,
  Text,
  Tooltip,
  useColorModeValue,
} from '@chakra-ui/react';
import { AiOutlineDelete } from 'react-icons/ai';
import { format } from 'date-fns';
import { useMemo } from 'react';
import { FiArchive } from 'react-icons/fi';

interface NoteProps {
  title?: string;
  desc?: string;
  date?: string;
  isLoading?: boolean;
  isFetching?: boolean;
  isArchived?: boolean;
  isDeleting?: boolean;
  isArchiving?: boolean;
  onClick?(): void;
  onDeleteClick?(): void;
  onArchiveClick?(): void;
}

export const Note: React.FC<NoteProps> = ({
  title,
  desc,
  date,
  isLoading,
  isFetching,
  isArchived,
  isDeleting,
  isArchiving,
  onClick,
  onDeleteClick,
  onArchiveClick,
}) => {
  const formattedDate = useMemo(
    () =>
      date ? format(new Date(parseInt(date, 10)), 'dd/MM/yyyy, HH:mm:ss') : '-',
    [date]
  );

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
      onClick={() => {
        if (!isDeleting) {
          onClick?.();
        }
      }}
    >
      <Circle
        size="10px"
        bgColor={
          isLoading || isFetching || isDeleting
            ? 'transparent'
            : isArchived
            ? 'green.500'
            : 'red.500'
        }
        mt="6px"
      >
        {(isFetching || isDeleting) && <Spinner color="red.500" size="xs" />}
      </Circle>

      <HStack
        role="group"
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
        <Stack flex={1}>
          <Skeleton isLoaded={!isLoading} height={4} width={isLoading && 36}>
            <Text mb={1} fontWeight="bold">
              {title}
            </Text>
          </Skeleton>
          <SkeletonText isLoaded={!isLoading} noOfLines={2}>
            <Text
              color={useColorModeValue('gray.900', 'gray.400')}
              noOfLines={2}
            >
              {desc}
            </Text>
          </SkeletonText>
          <Skeleton isLoaded={!isLoading} height={4} width={isLoading && 20}>
            <Text color={useColorModeValue('gray.800', 'gray.500')}>
              {formattedDate}
            </Text>
          </Skeleton>
        </Stack>
        <HStack
          opacity={0}
          _groupHover={{
            opacity: 1,
          }}
          transition="all 0.1s ease-in"
        >
          <Tooltip label="Archive note">
            <IconButton
              isLoading={isArchiving}
              isDisabled={isArchiving || isDeleting}
              aria-label="Archive note"
              icon={<FiArchive />}
              variant="ghost"
              onClick={(event) => {
                event.stopPropagation();
                onArchiveClick?.();
              }}
            />
          </Tooltip>
          <Tooltip label="Delete note">
            <IconButton
              isLoading={isDeleting}
              isDisabled={isDeleting || isArchiving}
              aria-label="Delete note"
              icon={<AiOutlineDelete />}
              variant="ghost"
              onClick={(event) => {
                event.stopPropagation();
                onDeleteClick?.();
              }}
            />
          </Tooltip>
        </HStack>
      </HStack>
    </Stack>
  );
};
