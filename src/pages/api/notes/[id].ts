import { createRequestHandler } from '@/utils/createRequestHandler';
import { getGoogleDriveClient } from '@/utils/google/getGoogleDriveClient';
import { Note } from '@/types/note/note';
import { getTimestamp } from '@/utils/getTimestamp';
import { generateUpdatedNoteFileName } from '@/utils/note/generateUpdatedNoteFileName';

const handler = createRequestHandler();

/**
 * Handle fetching content of note with given id
 */
handler.get(async (req, res) => {
  const { id } = req.query;
  const drive = await getGoogleDriveClient(req);

  try {
    const response = await drive.files.get({
      fileId: id as string,
      alt: 'media',
    });
    const note = response.data;
    res.json(note);
  } catch (error) {
    res.status(500).json(error);
  }
});

/**
 * Handle deleting note with a given ID
 */
handler.delete(async (req, res) => {
  const { id } = req.query;
  const drive = await getGoogleDriveClient(req);

  try {
    await drive.files.update({
      fileId: id as string,
      requestBody: {
        properties: {
          trashed: 'true',
        },
      },
    });
    res.json({ success: 'Note has been succesfully deleted' });
  } catch (error) {
    res.status(500).json(error);
  }
});

/**
 * Handle updating note with a given ID
 */
handler.put(async (req, res) => {
  const { id } = req.query;
  const note: Note = req.body;
  const drive = await getGoogleDriveClient(req);
  const timestamp = await getTimestamp();

  try {
    await drive.files.update({
      fileId: id as string,
      requestBody: {
        name: generateUpdatedNoteFileName(note.fileName),
      },
    });
    res.json({ success: 'Note has been succesfully deleted' });
  } catch (error) {
    res.status(500).json(error);
  }
});

export default handler;
