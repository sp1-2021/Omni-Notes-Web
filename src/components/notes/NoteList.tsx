import { Box, Button, HStack, Input, Stack } from '@chakra-ui/react';
import { Note } from '@/components/notes/Note';
import { AiOutlinePlus } from 'react-icons/ai';
import { useNoteList } from '@/hooks/notes/useNoteList';

const noteSkeletons = Array(4)
  .fill(0)
  .map((_, i) => <Note key={i} isLoading={true} />);

export const NoteList: React.FC = () => {
  const { data: notes, error } = useNoteList();
  const isLoading = !notes && !error;

  return (
    <Stack height="100vh" p={4} backgroundColor="gray.800" overflow="hidden">
      <HStack pt={2} pb={4} bgColor="gray.800">
        <Input placeholder="Search" />
        <Button leftIcon={<AiOutlinePlus />} minWidth="120px">
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
        {isLoading
          ? noteSkeletons
          : notes.map((note) => (
              <Note
                key={note.id}
                title={note.title}
                date={note.modifiedTime}
                desc="Todo"
              />
            ))}
      </Stack>
    </Stack>
  );
};
