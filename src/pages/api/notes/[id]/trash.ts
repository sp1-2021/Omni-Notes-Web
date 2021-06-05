import { createRequestHandler } from '@/utils/createRequestHandler';
import { getGoogleDriveClient } from '@/utils/google/getGoogleDriveClient';
import { getTimestamp } from '@/utils/getTimestamp';
import { NextApiRequest, NextApiResponse } from 'next';

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
    const note = response.data;
    const trashedNote = {
      ...note,
      lastModification: getTimestamp(),
      trashed: isTrashed,
    };
    const media = {
      body: JSON.stringify(trashedNote, null, 2),
    };
    await drive.files.update({
      fileId: id as string,
      media,
      requestBody: {
        properties: {
          trashed: JSON.stringify(isTrashed),
        },
      },
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
