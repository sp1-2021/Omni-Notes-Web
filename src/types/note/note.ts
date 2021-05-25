import { Attachment } from '@/types/note/attachment';

export interface Note {
  title: string;
  creation: number;
  lastModification: number;
  passwordChecked: false;
  archived: false;
  attachmentsList: Attachment[];
  checklist: boolean;
  locked: boolean;
  reminderFired: false;
  trashed: false;
  content: string;
}
