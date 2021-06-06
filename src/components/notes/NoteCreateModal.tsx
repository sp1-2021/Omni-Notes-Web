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
import { FormEvent, useRef, useState } from 'react';
import { useNoteManager } from '@/hooks/notes/useNoteManager';
import { useToast } from '@/hooks/utils/useToast';

interface INoteCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NoteCreateModal: React.FC<INoteCreateModalProps> = ({
  isOpen,
  onClose,
}) => {
  const noteManager = useNoteManager();
  const [isCreating, setCreating] = useState(false);
  const [title, setTitle] = useState('');
  const toast = useToast();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      setCreating(true);
      await noteManager.create(title);
      onClose();
      setTitle('');
    } catch (error) {
      console.error(error);
      toast({
        title: 'Whopsss...',
        description: 'An error occurred while creating the note. Try again.',
        status: 'error',
      });
    } finally {
      setCreating(false);
    }
  };

  return (
    <Modal
      isCentered
      isOpen={isOpen}
      onClose={onClose}
      size="xl"
      closeOnEsc={!isCreating}
      closeOnOverlayClick={!isCreating}
      initialFocusRef={inputRef}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>New note</ModalHeader>
        <ModalCloseButton />
        <ModalBody as="form" onSubmit={onSubmit}>
          <FormControl>
            <FormLabel>Title</FormLabel>
            <Input
              ref={inputRef}
              isRequired
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button
            isDisabled={isCreating}
            variant="ghost"
            mr={3}
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            isDisabled={isCreating}
            isLoading={isCreating}
            colorScheme="blue"
          >
            Create
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
