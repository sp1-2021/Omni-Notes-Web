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
} from '@chakra-ui/react';
import { useMemo, useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { dispatch } from 'use-bus';
import { NoteListRecord } from '@/types/note/note-list-record';
import { useToast } from '@/hooks/utils/useToast';
import { useNoteStore } from '@/hooks/notes/useNoteStore';

const noteSkeletons = Array(4)
  .fill(0)
  .map((_, i) => <Note key={i} isLoading />);

export const NoteList: React.FC = () => {
  const { data: notes, mutate } = useNoteList();
  const {
    isLoading,
    setLoading,
    setSelectedNoteId,
    selectedNoteId,
  } = useNoteStore();
  const noteManager = useNoteManager();
  const [isDeleting, setDeleting] = useState<Record<string, boolean>>({});
  const [isArchiving, setArchiving] = useState<Record<string, boolean>>({});
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
    const note = await noteManager.fetch(record);
    dispatch({
      type: NOTE_SELECTED_EVENT,
      note,
      noteId: record.id,
    });
    setLoading(false);
  };

  const onDeleteNoteClick = async (id: string) => {
    if (selectedNoteId === id) {
      setSelectedNoteId(null);
    }
    setDeleting({ ...isDeleting, [id]: true });
    await noteManager.remove(id);
    setDeleting({ ...isDeleting, [id]: false });
  };

  const onArchiveNoteClick = async (id: string) => {
    setArchiving({ ...isArchiving, [id]: true });
    await noteManager.archive(id);
    setArchiving({ ...isArchiving, [id]: false });

    mutate(
      (notes) =>
        notes.map((note) =>
          note.id !== id
            ? note
            : {
                ...note,
                archived: true,
              }
        ),
      false
    );

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
          <Button
            leftIcon={<AiOutlinePlus />}
            minWidth="120px"
            onClick={onOpen}
          >
            New note
          </Button>
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
                isArchived={note.archived}
                isFetching={isLoading && selectedNoteId === note.id}
                isDeleting={isDeleting[note.id]}
                isArchiving={isArchiving[note.id]}
                onClick={() => onNoteClick(note)}
                onDeleteClick={() => onDeleteNoteClick(note.id)}
                onArchiveClick={() => onArchiveNoteClick(note.id)}
              />
            ))
          ) : (
            <Text textAlign="center" color="rgba(255, 255, 255, 0.5)">
              You don't have any notes yet
            </Text>
          )}
        </Stack>
      </Stack>
      <NoteCreateModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};
