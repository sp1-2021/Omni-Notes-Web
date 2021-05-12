import useSWR from 'swr';
import { NoteEntry } from '@/types/note/note-entry';

export const useNoteList = () => {
  return useSWR<NoteEntry[]>('notes');
};
