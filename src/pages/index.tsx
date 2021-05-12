import React, { useRef } from 'react';
import { getSession, useSession } from 'next-auth/client';
import { Box, Stack } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import useTranslation from 'next-translate/useTranslation';
import { Editor } from '@/components/editor/Editor';
import { Navbar } from '@/components/navbar/Navbar';
import { NoteList } from '@/components/notes/NoteList';
import { Sidebar } from '@/components/sidebar/Sidebar';
import useBus from 'use-bus';
import { NOTE_SELECTED_EVENT } from '@/const/event.const';
import { Note } from '@/types/note/note';

const Home: React.FC = () => {
  const { t, lang } = useTranslation();
  const [_, loading] = useSession();
  const editorRef = useRef<toastui.Editor | null>(null);

  useBus(
    NOTE_SELECTED_EVENT,
    (event) => {
      const note: Note = event.note;
      if (editorRef.current) {
        editorRef.current.setMarkdown(note.content);
      }
    },
    []
  );

  if (loading) {
    return <div>Loading</div>;
  }

  return (
    <Stack height="full" spacing={0}>
      <Navbar />
      <Stack direction="row" spacing={0} height="full">
        <Box maxWidth="260px" width="full">
          <Sidebar />
        </Box>
        <Box maxWidth="500px" width="full">
          <NoteList />
        </Box>
        <Box flex={1}>
          <Editor
            events={{ load: (editor) => (editorRef.current = editor) }}
            initialEditType="wysiwyg"
            height="100%"
          />
        </Box>
      </Stack>
    </Stack>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      props: {},
      redirect: {
        destination: '/api/auth/signin',
      },
    };
  }

  return {
    props: { session },
  };
};

export default Home;
