import { drive_v3 } from 'googleapis';

export const fetchNoteFileName = async (
  drive: drive_v3.Drive,
  fileId: string
) => {
  const response = await drive.files.get({
    fileId,
    fields: 'name',
  });
  return response.data.name;
};
