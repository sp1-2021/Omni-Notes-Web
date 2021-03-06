import { getTimestamp } from '@/utils/getTimestamp';
import { Note } from '@/types/note/note';

export const createNote = (
  title: string,
  timestamp: number
): Omit<Note, 'fileName'> => {
  return {
    title: title ?? '',
    creation: timestamp,
    lastModification: timestamp,
    passwordChecked: false,
    archived: false,
    attachmentsList: [],
    checklist: false,
    locked: false,
    reminderFired: false,
    trashed: false,
    content: '',
  };
};
