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
import { useEffect, useMemo, useState } from 'react';
import { FiArchive } from 'react-icons/fi';
import { FaTrashRestoreAlt } from 'react-icons/fa';
import { RiDeleteBin2Line, RiInboxUnarchiveLine } from 'react-icons/ri';

interface NoteProps {
  title?: string;
  desc?: string;
  date?: string;
  isLoading?: boolean;
  isFetching?: boolean;
  isArchived?: boolean;
  isTrashed?: boolean;
  onClick?(): void;
  onTrashClick?(): void;
  onArchiveClick?(): void;
  onUnarchiveClick?(): void;
  onRestoreClick?(): void;
  onDeleteClick?(): void;
}

export const Note: React.FC<NoteProps> = ({
  title,
  desc,
  date,
  isLoading,
  isFetching,
  isArchived,
  isTrashed,
  onClick,
  onTrashClick,
  onArchiveClick,
  onUnarchiveClick,
  onRestoreClick,
  onDeleteClick,
}) => {
  const [isArchiving, setArchiving] = useState(false);
  const [isUnarchiving, setUnarchiving] = useState(false);
  const [isTrashing, setTrashing] = useState(false);
  const [isRestoring, setRestoring] = useState(false);
  const [isDeleting, setDeleting] = useState(false);
  const isPending =
    isLoading ||
    isFetching ||
    isTrashing ||
    isArchiving ||
    isRestoring ||
    isDeleting ||
    isUnarchiving;
  const formattedDate = useMemo(
    () =>
      date ? format(new Date(parseInt(date, 10)), 'dd/MM/yyyy, HH:mm:ss') : '-',
    [date]
  );
  const color = useMemo(() => {
    if (isTrashed) return 'red.500';
    if (isArchived) return 'orange.500';
    return 'blue.500';
  }, [isArchived, isTrashed]);

  useEffect(() => {
    setArchiving(false);
    setUnarchiving(false);
  }, [isArchived]);

  useEffect(() => {
    setTrashing(false);
    setRestoring(false);
  }, [isTrashed]);

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
        if (!isTrashing) {
          onClick?.();
        }
      }}
    >
      <Circle size="10px" bgColor={isPending ? 'transparent' : color} mt="6px">
        {!isLoading && isPending && <Spinner color={color} size="xs" />}
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
          {!isTrashed && !isArchived && (
            <Tooltip label="Archive note">
              <IconButton
                isLoading={isArchiving}
                isDisabled={isPending}
                aria-label="Archive note"
                icon={<FiArchive />}
                variant="ghost"
                onClick={(event) => {
                  event.stopPropagation();
                  onArchiveClick?.();
                  setArchiving(true);
                }}
              />
            </Tooltip>
          )}
          {!isTrashed && isArchived && (
            <Tooltip label="Unarchive note">
              <IconButton
                isLoading={isUnarchiving}
                isDisabled={isPending}
                aria-label="Unarchive note"
                icon={<RiInboxUnarchiveLine />}
                variant="ghost"
                onClick={(event) => {
                  event.stopPropagation();
                  onUnarchiveClick?.();
                  setUnarchiving(true);
                }}
              />
            </Tooltip>
          )}

          {!isTrashed && (
            <Tooltip label="Trash note">
              <IconButton
                isLoading={isTrashing}
                isDisabled={isPending}
                aria-label="Delete note"
                icon={<AiOutlineDelete />}
                variant="ghost"
                onClick={(event) => {
                  event.stopPropagation();
                  onTrashClick?.();
                  setTrashing(true);
                }}
              />
            </Tooltip>
          )}

          {isTrashed && (
            <>
              <Tooltip label="Restore note">
                <IconButton
                  isLoading={isRestoring}
                  isDisabled={isPending}
                  aria-label="Restore note"
                  icon={<FaTrashRestoreAlt />}
                  variant="ghost"
                  onClick={(event) => {
                    event.stopPropagation();
                    onRestoreClick?.();
                    setRestoring(true);
                  }}
                />
              </Tooltip>
              <Tooltip label="Delete note">
                <IconButton
                  isLoading={isDeleting}
                  isDisabled={isPending}
                  aria-label="Delete note"
                  icon={<RiDeleteBin2Line />}
                  variant="ghost"
                  onClick={(event) => {
                    event.stopPropagation();
                    onDeleteClick?.();
                    setDeleting(true);
                  }}
                />
              </Tooltip>
            </>
          )}
        </HStack>
      </HStack>
    </Stack>
  );
};
