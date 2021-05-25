import React, { useRef, useState } from 'react';
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
import { useDebouncedCallback } from 'use-debounce';
import { useNoteManager } from '@/hooks/notes/useNoteManager';
import { useNoteList } from '@/hooks/notes/useNoteList';
import { getNoteExcerpt } from '@/utils/note/getNoteExcerpt';
import { getTimestamp } from '@/utils/getTimestamp';

const Home: React.FC = () => {
  const [note, setNote] = useState<Note | null>(null);
  const [noteId, setNoteId] = useState<string | null>(null);
  const { t, lang } = useTranslation();
  const [_, loading] = useSession();
  const editorRef = useRef<toastui.Editor | null>(null);
  const { update } = useNoteManager();
  const { mutate } = useNoteList();

  useBus(
    NOTE_SELECTED_EVENT,
    (event) => {
      const note: Note = event.note;
      const noteId: string = event.noteId;

      if (editorRef.current) {
        setNote(note);
        setNoteId(noteId);
        editorRef.current.setMarkdown(note.content);
      }
    },
    []
  );

  const onContentChange = () => {
    updateContent();
    updateNoteListRecord();
  };

  const updateNoteListRecord = useDebouncedCallback(() => {
    mutate(
      (noteList) =>
        noteList?.map((cached) =>
          cached.id !== noteId
            ? cached
            : {
                ...cached,
                excerpt: getNoteExcerpt(editorRef.current.getMarkdown()),
                modifiedTime: getTimestamp().toString(),
              }
        ),
      false
    );
  }, 100);

  const updateContent = useDebouncedCallback(() => {
    if (noteId) {
      const content = editorRef.current.getMarkdown();
      update(noteId, note, { content });
    }
  }, 1000);

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
            events={{
              load: (editor) => (editorRef.current = editor),
              change: onContentChange,
            }}
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
