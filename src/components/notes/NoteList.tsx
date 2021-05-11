import { Box, Input, Stack } from '@chakra-ui/react';
import { Note } from '@/components/notes/Note';

export const NoteList: React.FC = () => {
  return (
    <Stack height="100vh" p={4} backgroundColor="gray.800" overflow="hidden">
      <Box pt={2} pb={4} bgColor="gray.800">
        <Input placeholder="Search" />
      </Box>
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
        {Array(20)
          .fill(0)
          .map((i) => (
            <Note
              title="Example note"
              desc="Lorem ipsum dolorem est"
              date="02.05.2021"
            />
          ))}
      </Stack>
    </Stack>
  );
};
