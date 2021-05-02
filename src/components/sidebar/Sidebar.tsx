import { Box, Img, Stack } from '@chakra-ui/react';
import { SidebarUser } from '@/components/sidebar/SidebarUser';

export const Sidebar: React.FC = () => {
  return (
    <Stack p={4} backgroundColor="gray.900" height="full">
      <Box>
        <Img height={12} src="/logo.png" />
      </Box>
      <Stack flex={1}>hello</Stack>
      <SidebarUser />
    </Stack>
  );
};
