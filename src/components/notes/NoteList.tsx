import { Note } from '@/components/notes/Note';
import { NOTE_SELECTED_EVENT } from '@/const/event.const';
import { useNoteList } from '@/hooks/notes/useNoteList';
import { useNoteManager } from '@/hooks/notes/useNoteManager';
import {
  Button,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  FormControl,
  FormLabel,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useMemo, useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { dispatch } from 'use-bus';

const noteSkeletons = Array(4)
  .fill(0)
  .map((_, i) => <Note key={i} isLoading />);

const lorem =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis tempor, nulla ultricies hendrerit finibus, massa mi mattis lorem, quis fermentum urna neque vitae elit. Nulla ac consectetur ex. Integer tincidunt lorem augue, vel aliquet tellus sagittis a. Donec sed venenatis nisl. Nullam mattis vulputate mattis. Maecenas tellus dolor, tristique vel pharetra eu, aliquam sed sapien. Nulla pretium auctor nunc, a porttitor mauris ultrices blandit. Maecenas viverra cursus ultrices. Sed sagittis nisi vitae diam fringilla, sit amet faucibus odio commodo. Sed nec semper nisl, eu pharetra massa. Curabitur elementum nisi accumsan arcu ornare vestibulum. Sed a velit imperdiet, bibendum libero nec, feugiat mi. Duis eget maximus velit, eu condimentum purus.';
const defaultTitle = 'New rules';

export const NoteList: React.FC = () => {
  const { data: notes, error } = useNoteList();
  const noteManager = useNoteManager();
  const [isCreating, setCreating] = useState(false);
  const [isDeleting, setDeleting] = useState<Record<string, boolean>>({});
  const [filter, setFilter] = useState<string | null>(null);

  const [title, setTitle] = useState(defaultTitle);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const filtered = useMemo(() => {
    if (!notes || filter === null) {
      return notes;
    }
    return notes.filter(
      (note) => note.title.toLowerCase().indexOf(filter) !== -1
    );
  }, [filter, notes]);

  const onNewNoteClick = async () => {
    onClose();
    setCreating(true);
    await noteManager.create({
      title,
      content: lorem,
    });
    setCreating(false);
  };

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
            isLoading={isCreating}
            isDisabled={isCreating}
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

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>New note</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isRequired>
              <FormLabel>Title</FormLabel>
              <Input
                isRequired
                initialValues={defaultTitle}
                placeholder={defaultTitle}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onNewNoteClick}>
              Create
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
