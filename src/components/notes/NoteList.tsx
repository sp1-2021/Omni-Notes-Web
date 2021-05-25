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

const noteSkeletons = Array(4)
  .fill(0)
  .map((_, i) => <Note key={i} isLoading />);

export const NoteList: React.FC = () => {
  const { data: notes } = useNoteList();
  const noteManager = useNoteManager();
  const [isDeleting, setDeleting] = useState<Record<string, boolean>>({});
  const [filter, setFilter] = useState<string | null>(null);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const filtered = useMemo(() => {
    if (!notes || filter === null) {
      return notes;
    }
    return notes.filter(
      (note) => note.title.toLowerCase().indexOf(filter) !== -1
    );
  }, [filter, notes]);

  const onNoteClick = async (id: string) => {
    const note = await noteManager.fetch(id);
    dispatch({
      type: NOTE_SELECTED_EVENT,
      note,
    });
  };

  const onDeleteNoteClick = async (id: string) => {
    setDeleting({ ...isDeleting, [id]: true });
    await noteManager.remove(id);
    setDeleting({ ...isDeleting, [id]: false });
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
                isDeleting={isDeleting[note.id]}
                onClick={() => onNoteClick(note.id)}
                onDeleteClick={() => onDeleteNoteClick(note.id)}
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
