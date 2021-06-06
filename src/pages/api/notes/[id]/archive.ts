import { createRequestHandler } from '@/utils/createRequestHandler';
import { getGoogleDriveClient } from '@/utils/google/getGoogleDriveClient';
import { Note } from '@/types/note/note';
import { NextApiRequest, NextApiResponse } from 'next';
import { fetchNoteFileName } from '@/utils/note/fetchNoteFileName';
import { getTimestamp } from '@/utils/getTimestamp';
import { generateUpdatedNoteFileName } from '@/utils/note/generateUpdatedNoteFileName';

const handler = createRequestHandler();

const updateArchivedProperty = async (
  req: NextApiRequest,
  res: NextApiResponse,
  isArchived: boolean
) => {
  const { id } = req.query;
  const drive = await getGoogleDriveClient(req);

  try {
    const response = await drive.files.get({
      fileId: id as string,
      alt: 'media',
    });

    const fileName = await fetchNoteFileName(drive, id as string);
    const timestamp = getTimestamp();

    const note = (response.data as any) as Note;
    const archivedNote: Note = {
      ...note,
      lastModification: timestamp,
      archived: isArchived,
    };

    const requestBody = {
      name: generateUpdatedNoteFileName(fileName, timestamp),
      properties: {
        archived: JSON.stringify(isArchived),
      },
    };
    const media = {
      body: JSON.stringify(archivedNote, null, 2),
    };

    await drive.files.update({
      media,
      requestBody,
      fileId: id as string,
    });

    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

/**
 * Handle archiving note with given id
 */
handler.post(async (req, res) => {
  return updateArchivedProperty(req, res, true);
});

/**
 * Handle unarchiving note with given id
 */
handler.delete(async (req, res) => {
  return updateArchivedProperty(req, res, false);
});

export default handler;
