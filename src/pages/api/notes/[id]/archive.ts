import { createRequestHandler } from '@/utils/createRequestHandler';
import { getGoogleDriveClient } from '@/utils/google/getGoogleDriveClient';
import { Note } from '@/types/note/note';
import { NextApiRequest, NextApiResponse } from 'next';

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
    const note = (response.data as any) as Note;
    const archivedNote: Note = {
      ...note,
      archived: isArchived,
    };

    const requestBody = {
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
  updateArchivedProperty(req, res, false);
});

export default handler;
