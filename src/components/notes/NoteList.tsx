import { Button, HStack, Input, Stack } from '@chakra-ui/react';
import { Note } from '@/components/notes/Note';
import { AiOutlinePlus } from 'react-icons/ai';
import { useNoteList } from '@/hooks/notes/useNoteList';
import { useNoteManager } from '@/hooks/notes/useNoteManager';
import { useState } from 'react';

const noteSkeletons = Array(4)
  .fill(0)
  .map((_, i) => <Note key={i} isLoading={true} />);

export const NoteList: React.FC = () => {
  const { data: notes, error } = useNoteList();
  const noteManager = useNoteManager();
  const [isCreating, setCreating] = useState(false);
  const [isDeleting, setDeleting] = useState<Record<string, boolean>>({});

  const onNewNoteClick = async () => {
    setCreating(true);
    await noteManager.create({
      title: 'Another one',
      content: 'Example content',
    });
    setCreating(false);
  };

  const onDeleteNoteClick = async (id: string) => {
    setDeleting({ ...isDeleting, [id]: true });
    await noteManager.remove(id);
    setDeleting({ ...isDeleting, [id]: false });
  };

  return (
    <Stack height="100vh" p={4} backgroundColor="gray.800" overflow="hidden">
      <HStack pt={2} pb={4} bgColor="gray.800">
        <Input placeholder="Search" />
        <Button
          isLoading={isCreating}
          isDisabled={isCreating}
          leftIcon={<AiOutlinePlus />}
          minWidth="120px"
          onClick={onNewNoteClick}
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
        {!notes
          ? noteSkeletons
          : notes.map((note) => (
              <Note
                key={note.id}
                title={note.title}
                date={note.modifiedTime}
                desc="Todo"
                isDeleting={isDeleting[note.id]}
                onDeleteClick={() => onDeleteNoteClick(note.id)}
              />
            ))}
      </Stack>
    </Stack>
  );
};
