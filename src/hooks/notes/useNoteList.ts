import useSWR from 'swr';
import { NoteListRecord } from '@/types/note/note-list-record';

export const useNoteList = () => {
  return useSWR<NoteListRecord[]>('notes');
};
