import { HStack, Img, Stack, Text } from '@chakra-ui/react';
import { SidebarUser } from '@/components/sidebar/SidebarUser';
import { SidebarLink } from '@/components/sidebar/SidebarLink';
import { FaRegStickyNote } from 'react-icons/fa';
import { AiOutlineDelete, AiOutlineLogout } from 'react-icons/ai';
import { signOut } from 'next-auth/client';
import { FiArchive } from 'react-icons/fi';
import {
  NoteListFilter,
  selectNoteListFilter,
  selectNoteListFilterSetter,
  useNoteStore,
} from '@/hooks/notes/useNoteStore';

export const Sidebar: React.FC = () => {
  const noteFilter = useNoteStore(selectNoteListFilter);
  const setNoteListFilter = useNoteStore(selectNoteListFilterSetter);

  return (
    <Stack p={4} backgroundColor="gray.900" height="full">
      <HStack>
        <Img height={10} src="/logo.png" />
        <Text as="span" fontWeight="bold" fontSize={24} pl={4}>
          Omni Notes
        </Text>
      </HStack>
      <Stack py={8} flex={1} spacing={3}>
        <SidebarLink
          isActive={noteFilter === NoteListFilter.DEFAULT}
          icon={FaRegStickyNote}
          onClick={() => setNoteListFilter(NoteListFilter.DEFAULT)}
        >
          All notes
        </SidebarLink>
        <SidebarLink
          isActive={noteFilter === NoteListFilter.ARCHIVED}
          icon={FiArchive}
          onClick={() => setNoteListFilter(NoteListFilter.ARCHIVED)}
        >
          Archived notes
        </SidebarLink>
        <SidebarLink
          isActive={noteFilter === NoteListFilter.TRASHED}
          icon={AiOutlineDelete}
          onClick={() => setNoteListFilter(NoteListFilter.TRASHED)}
        >
          Trashed notes
        </SidebarLink>
        <SidebarLink icon={AiOutlineLogout} onClick={signOut}>
          Sign out
        </SidebarLink>
      </Stack>
      <SidebarUser />
    </Stack>
  );
};
