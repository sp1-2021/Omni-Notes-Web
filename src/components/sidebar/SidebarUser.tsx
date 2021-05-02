import { Avatar, HStack, Stack, Text } from '@chakra-ui/react';
import { useSession } from 'next-auth/client';

export const SidebarUser: React.FC = () => {
  const [session, isLoading] = useSession();

  return (
    <HStack spacing={4}>
      <Avatar src={session.user.image} size="sm" />
      <Stack spacing={0} fontSize={14} color="rgba(255, 255, 255, 0.7)">
        <Text as="span" noOfLines={1}>
          {session.user.name}
        </Text>
        <Text as="span" noOfLines={1}>
          {session.user.email}
        </Text>
      </Stack>
    </HStack>
  );
};
