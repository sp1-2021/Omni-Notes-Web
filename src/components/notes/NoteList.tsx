import { Button, HStack, Input, Stack, Text } from '@chakra-ui/react';
import { Note } from '@/components/notes/Note';
import { AiOutlinePlus } from 'react-icons/ai';
import { useNoteList } from '@/hooks/notes/useNoteList';
import { useNoteManager } from '@/hooks/notes/useNoteManager';
import { useState } from 'react';

const noteSkeletons = Array(4)
  .fill(0)
  .map((_, i) => <Note key={i} isLoading={true} />);

const lorem =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis tempor, nulla ultricies hendrerit finibus, massa mi mattis lorem, quis fermentum urna neque vitae elit. Nulla ac consectetur ex. Integer tincidunt lorem augue, vel aliquet tellus sagittis a. Donec sed venenatis nisl. Nullam mattis vulputate mattis. Maecenas tellus dolor, tristique vel pharetra eu, aliquam sed sapien. Nulla pretium auctor nunc, a porttitor mauris ultrices blandit. Maecenas viverra cursus ultrices. Sed sagittis nisi vitae diam fringilla, sit amet faucibus odio commodo. Sed nec semper nisl, eu pharetra massa. Curabitur elementum nisi accumsan arcu ornare vestibulum. Sed a velit imperdiet, bibendum libero nec, feugiat mi. Duis eget maximus velit, eu condimentum purus.';

export const NoteList: React.FC = () => {
  const { data: notes, error } = useNoteList();
  const noteManager = useNoteManager();
  const [isCreating, setCreating] = useState(false);
  const [isDeleting, setDeleting] = useState<Record<string, boolean>>({});

  const onNewNoteClick = async () => {
    setCreating(true);
    await noteManager.create({
      title: 'Another one',
      content: lorem,
    });
    setCreating(false);
  };

  const onNoteClick = async (id: string) => {
    const note = await noteManager.fetch(id);
    console.log(note);
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
        {!notes ? (
          noteSkeletons
        ) : notes.length ? (
          notes.map((note) => (
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
  );
};
