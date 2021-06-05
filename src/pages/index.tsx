import React, { useEffect, useMemo, useRef, useState } from 'react';
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
import {
  selectIsLoading,
  selectSelectedNoteId,
  useNoteStore,
} from '@/hooks/notes/useNoteStore';

const Home: React.FC = () => {
  const isLoading = useNoteStore(selectIsLoading);
  const selectedNoteId = useNoteStore(selectSelectedNoteId);
  const [note, setNote] = useState<Note | null>(null);
  const [noteId, setNoteId] = useState<string | null>(null);
  const { t, lang } = useTranslation();
  const [_, loading] = useSession();
  const editorRef = useRef<toastui.Editor | null>(null);
  const [isEditorInitialized, setEditorInitialized] = useState(false);
  const { update } = useNoteManager();
  const { mutate } = useNoteList();
  const placeholder = useMemo(() => {
    if (selectedNoteId === null) {
      return 'Select a note from the list on the left to start editing';
    } else if (isLoading) {
      return 'Loading your note, please wait...';
    } else if (!note?.content.trim().length) {
      return 'Your note has been loaded, start typing to edit its content';
    }
    return null;
  }, [isLoading, note?.content, selectedNoteId]);

  useEffect(() => {
    if (editorRef.current) {
      // @ts-ignore-next-line
      editorRef.current.setPlaceholder(placeholder);
    }
  }, [placeholder]);

  useEffect(() => {
    if (isEditorInitialized) {
      const editorDiv: HTMLDivElement = document.querySelector(
        '.tui-editor-contents[data-placeholder]'
      );
      if (editorDiv) {
        editorDiv.contentEditable = JSON.stringify(
          !isLoading && selectedNoteId !== null
        );
      }
    }
  }, [isEditorInitialized, isLoading, selectedNoteId]);

  useEffect(() => {
    if (editorRef.current && selectedNoteId === null) {
      editorRef.current.setMarkdown('');
    }
  }, [selectedNoteId]);

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
            placeholder={placeholder}
            events={{
              load: (editor) => {
                editorRef.current = editor;
                setEditorInitialized(true);
              },
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
