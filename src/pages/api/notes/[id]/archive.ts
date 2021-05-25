import { createRequestHandler } from '@/utils/createRequestHandler';
import { getGoogleDriveClient } from '@/utils/google/getGoogleDriveClient';
import { Note } from '@/types/note/note';

const handler = createRequestHandler();

handler.post(async (req, res) => {
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
      archived: true,
    };

    const requestBody = {
      properties: {
        archived: 'true',
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
});

export default handler;
