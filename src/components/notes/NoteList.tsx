import { Note } from '@/components/notes/Note';
import { NoteCreateModal } from '@/components/notes/NoteCreateModal';
import { NOTE_SELECTED_EVENT } from '@/const/event.const';
import { useNoteList } from '@/hooks/notes/useNoteList';
import { useNoteManager } from '@/hooks/notes/useNoteManager';
import {
  Button,
  HStack,
  Input,
  Stack,
  Text,
  useDisclosure,
  IconButton,
  Tooltip,
} from '@chakra-ui/react';
import { useMemo, useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { dispatch } from 'use-bus';
import { NoteListRecord } from '@/types/note/note-list-record';
import { useToast } from '@/hooks/utils/useToast';
import { NoteListFilter, useNoteStore } from '@/hooks/notes/useNoteStore';
import { BiRefresh } from 'react-icons/bi';

const noteSkeletons = Array(4)
  .fill(0)
  .map((_, i) => <Note key={i} isLoading />);

const emptyMessages = {
  [NoteListFilter.DEFAULT]: 'You have not added any notes yet',
  [NoteListFilter.ARCHIVED]: 'You have not archived any notes',
  [NoteListFilter.TRASHED]: 'The trashbin is empty',
};

export const NoteList: React.FC = () => {
  const [isRefreshing, setRefreshing] = useState(false);
  const { data: notes, mutate } = useNoteList();
  const {
    isLoading,
    setLoading,
    filter: noteListFilter,
    setSelectedNoteId,
    selectedNoteId,
  } = useNoteStore();
  const noteManager = useNoteManager();
  const [filter, setFilter] = useState<string | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const sorted = useMemo(() => {
    return (notes ?? []).sort(
      (a, b) => parseInt(b.modifiedTime, 10) - parseInt(a.modifiedTime, 10)
    );
  }, [notes]);
  const filtered = useMemo(() => {
    if (!sorted.length || filter === null) {
      return sorted;
    }
    return sorted.filter(
      (note) => note.title.toLowerCase().indexOf(filter) !== -1
    );
  }, [filter, sorted]);

  const onNoteClick = async (record: NoteListRecord) => {
    setSelectedNoteId(record.id);
    setLoading(true);
    const { note, attachmentUrls } = await noteManager.fetch(record);
    dispatch({
      type: NOTE_SELECTED_EVENT,
      note,
      attachmentUrls,
      noteId: record.id,
    });
    setLoading(false);
  };

  const onRefreshClick = async () => {
    setRefreshing(true);
    await mutate();
    setRefreshing(false);
  };

  const onTrashClick = async (id: string) => {
    if (selectedNoteId === id) {
      setSelectedNoteId(null);
    }
    await noteManager.trash(id);
    await mutate();
  };

  const onRestoreClick = async (id: string) => {
    await noteManager.restore(id);
    await mutate();
  };

  const onUnarchiveClick = async (id: string) => {
    await noteManager.unarchive(id);
    await mutate();
  };

  const onDeleteClick = async (id: string) => {
    if (selectedNoteId === id) {
      setSelectedNoteId(null);
    }
    await noteManager.remove(id);
    await mutate();
  };

  const onArchiveNoteClick = async (id: string) => {
    if (selectedNoteId === id) {
      setSelectedNoteId(null);
    }
    await noteManager.archive(id);
    await mutate();
    toast({
      title: 'Hooray!',
      description: 'The note has been successfully archived',
      status: 'success',
    });
  };

  return (
    <>
      <Stack height="100vh" p={4} backgroundColor="gray.800" overflow="hidden">
        <HStack pt={2} pb={4} bgColor="gray.800">
          <Input
            placeholder="Search"
            onChange={(event) =>
              setFilter(event.target.value.length ? event.target.value : null)
            }
          />
          <Tooltip label="Refresh note list">
            <IconButton
              isDisabled={isRefreshing}
              isLoading={isRefreshing}
              aria-label="Refresh note list"
              icon={<BiRefresh />}
              onClick={onRefreshClick}
            />
          </Tooltip>
          <Tooltip label="New note">
            <IconButton
              aria-label="Create new note"
              icon={<AiOutlinePlus />}
              onClick={onOpen}
            />
          </Tooltip>
        </HStack>
        <Stack
          spacing={4}
          maxHeight="full"
          overflowY="scroll"
          css={{
            '&::-webkit-scrollbar': {
              display: 'none',
            },
          }}
        >
          {!notes ? (
            noteSkeletons
          ) : filtered.length ? (
            filtered.map((note) => (
              <Note
                key={note.id}
                title={note.title}
                date={note.modifiedTime}
                desc={note.excerpt}
                isTrashed={note.trashed}
                isArchived={note.archived}
                isFetching={isLoading && selectedNoteId === note.id}
                onClick={() => onNoteClick(note)}
                onTrashClick={() => onTrashClick(note.id)}
                onArchiveClick={() => onArchiveNoteClick(note.id)}
                onDeleteClick={() => onDeleteClick(note.id)}
                onRestoreClick={() => onRestoreClick(note.id)}
                onUnarchiveClick={() => onUnarchiveClick(note.id)}
              />
            ))
          ) : (
            <Text textAlign="center" color="rgba(255, 255, 255, 0.5)">
              {emptyMessages[noteListFilter]}
            </Text>
          )}
        </Stack>
      </Stack>
      <NoteCreateModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};
