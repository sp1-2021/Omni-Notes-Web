import { Attachment } from '@/types/note/attachment';

export interface Note {
  title: string;
  fileName: string;
  creation: number;
  lastModification: number;
  passwordChecked: boolean;
  archived: boolean;
  attachmentsList: Attachment[];
  checklist: boolean;
  locked: boolean;
  reminderFired: boolean;
  trashed: boolean;
  content: string;
}
