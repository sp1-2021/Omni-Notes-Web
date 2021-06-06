import { createRequestHandler } from '@/utils/createRequestHandler';
import { getGoogleDriveClient } from '@/utils/google/getGoogleDriveClient';
import { getTimestamp } from '@/utils/getTimestamp';
import { NextApiRequest, NextApiResponse } from 'next';
import { fetchNoteFileName } from '@/utils/note/fetchNoteFileName';
import { generateUpdatedNoteFileName } from '@/utils/note/generateUpdatedNoteFileName';

const handler = createRequestHandler();

const updateTrashedProperty = async (
  req: NextApiRequest,
  res: NextApiResponse,
  isTrashed: boolean
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

    const note = response.data;
    const trashedNote = {
      ...note,
      lastModification: timestamp,
      trashed: isTrashed,
    };

    const media = {
      body: JSON.stringify(trashedNote, null, 2),
    };
    const requestBody = {
      name: generateUpdatedNoteFileName(fileName, timestamp),

      properties: {
        trashed: JSON.stringify(isTrashed),
      },
    };

    await drive.files.update({
      fileId: id as string,
      media,
      requestBody,
    });
    res.json({ success: 'Successfully updated the trashed property' });
  } catch (error) {
    res.status(500).json(error);
  }
};

/**
 * Handle trashing note with a given ID
 */
handler.post(async (req, res) => {
  return updateTrashedProperty(req, res, true);
});

handler.delete(async (req, res) => {
  return updateTrashedProperty(req, res, false);
});

export default handler;
