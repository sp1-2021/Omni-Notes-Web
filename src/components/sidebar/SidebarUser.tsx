import { Avatar, HStack, Stack, Text } from '@chakra-ui/react';
import { useSession } from 'next-auth/client';

export const SidebarUser: React.FC = () => {
  const [session, isLoading] = useSession();

  return (
    <HStack>
      <Avatar src={session.user.image} size="sm" />
      <Stack>
        <Text as="span">{session.user.name}</Text>
        <Text as="span">{session.user.email}</Text>
      </Stack>
    </HStack>
  );
};
