import useSWR from 'swr';
import { NoteListRecord } from '@/types/note/note-list-record';
import { selectNoteListFilter, useNoteStore } from '@/hooks/notes/useNoteStore';

export const useNoteList = () => {
  const filter = useNoteStore(selectNoteListFilter);
  return useSWR<NoteListRecord[]>(`notes${filter}`);
};
