import { HStack, Img, Stack, Text } from '@chakra-ui/react';
import { SidebarUser } from '@/components/sidebar/SidebarUser';
import { SidebarLink } from '@/components/sidebar/SidebarLink';
import { FaRegStickyNote } from 'react-icons/fa';
import { AiOutlineLogout } from 'react-icons/ai';
import { signOut } from 'next-auth/client';

export const Sidebar: React.FC = () => {
  return (
    <Stack p={4} backgroundColor="gray.900" height="full">
      <HStack>
        <Img height={10} src="/logo.png" />
        <Text as="span" fontWeight="bold" fontSize={24} pl={4}>
          Omni Notes
        </Text>
      </HStack>
      <Stack py={8} flex={1} spacing={3}>
        <SidebarLink icon={FaRegStickyNote}>All notes</SidebarLink>
        <SidebarLink icon={AiOutlineLogout} onClick={signOut}>
          Sign out
        </SidebarLink>
      </Stack>
      <SidebarUser />
    </Stack>
  );
};
