import { createRequestHandler } from '@/utils/createRequestHandler';
import { getGoogleDriveClient } from '@/utils/google/getGoogleDriveClient';
import { Note } from '@/types/note/note';
import { getTimestamp } from '@/utils/getTimestamp';
import { generateUpdatedNoteFileName } from '@/utils/note/generateUpdatedNoteFileName';
import { getNoteExcerpt } from '@/utils/note/getNoteExcerpt';

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
    let attachmentUrls = [];
    const note = response.data as Note;

    if (note.attachmentsList.length) {
      const attachmentFileNames = note.attachmentsList.map(
        (attachment) => attachment.uriPath
      );
      const queries = attachmentFileNames.map(
        (fileName) => `name = '${fileName}'`
      );
      const query = queries.join(' or ').trim();
      const attachmentsResponse = await drive.files.list({
        q: query,
        fields: 'files/webViewLink',
      });
      attachmentUrls = attachmentsResponse.data.files.map(
        (file) => file.webViewLink
      );
    }

    res.json({
      note,
      attachmentUrls,
    });
  } catch (error) {
    console.error(error);
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
    await drive.files.delete({
      fileId: id as string,
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
  const drive = await getGoogleDriveClient(req);
  const timestamp = getTimestamp();
  const { id } = req.query;
  const { fileName, ...note }: Note = {
    ...req.body.note,
    lastModification: timestamp,
  };

  const requestBody = {
    name: generateUpdatedNoteFileName(fileName, timestamp),
    properties: {
      title: note.title,
      excerpt: getNoteExcerpt(note.content),
    },
  };
  const media = {
    body: JSON.stringify(note, null, 2),
  };

  try {
    await drive.files.update({
      media,
      requestBody,
      fileId: id as string,
    });
    res.json({ success: 'Note has been succesfully updated' });
  } catch (error) {
    res.status(500).json(error);
  }
});

export default handler;
