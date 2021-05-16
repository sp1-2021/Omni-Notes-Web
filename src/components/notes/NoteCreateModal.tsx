import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useNoteManager } from '@/hooks/notes/useNoteManager';

const lorem =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis tempor, nulla ultricies hendrerit finibus, massa mi mattis lorem, quis fermentum urna neque vitae elit. Nulla ac consectetur ex. Integer tincidunt lorem augue, vel aliquet tellus sagittis a. Donec sed venenatis nisl. Nullam mattis vulputate mattis. Maecenas tellus dolor, tristique vel pharetra eu, aliquam sed sapien. Nulla pretium auctor nunc, a porttitor mauris ultrices blandit. Maecenas viverra cursus ultrices. Sed sagittis nisi vitae diam fringilla, sit amet faucibus odio commodo. Sed nec semper nisl, eu pharetra massa. Curabitur elementum nisi accumsan arcu ornare vestibulum. Sed a velit imperdiet, bibendum libero nec, feugiat mi. Duis eget maximus velit, eu condimentum purus.';
const defaultTitle = 'New Rules';

interface INoteCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
};

export const NoteCreateModal: React.FC<INoteCreateModalProps> = ({
  isOpen,
  onClose,
}) => {
  const noteManager = useNoteManager();
  const [isCreating, setCreating] = useState(false);
  const [title, setTitle] = useState(defaultTitle);

  const onNewNoteClick = async () => {
    onClose();
    setCreating(true);
    await noteManager.create({
      title,
      content: lorem,
    });
    setCreating(false);
  };

  return (
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
  )
};
