import { getGoogleDriveClient } from '@/utils/google/getGoogleDriveClient';
import { v4 as uuid } from 'uuid';
import { NOTE_FILE_EXT, NOTE_FILE_MIME_TYPE } from '@/const/drive.const';
import { getTimestamp } from '@/utils/getTimestamp';
import { Note } from '@/types/note/note';
import { ListFilesResponse } from '@/types/list-files-response';
import { NoteEntry } from '@/types/note/note-entry';
import { createRequestHandler } from '@/utils/createRequestHandler';
import { getNoteExcerpt } from '@/utils/note/getNoteExcerpt';

const handler = createRequestHandler();

/**
 * Note list request handler
 */
handler.get(async (req, res) => {
  const drive = await getGoogleDriveClient(req);

  try {
    const files = await drive.files.list({
      fields: 'files/id,files/properties,files/modifiedTime',
    });
    const fileList = files.data.files as ListFilesResponse[];
    const notes = fileList.map<NoteEntry>(
      ({ id, properties, modifiedTime }) => ({
        id,
        title: properties.title,
        excerpt: properties.excerpt,
        modifiedTime,
      })
    );

    res.json(notes);
  } catch (error) {
    res.status(500).json(error);
  }
});

/**
 * Create note request handler
 * Upon successful creation returns created file's id
 */
handler.post(async (req, res) => {
  const drive = await getGoogleDriveClient(req);
  const note: Note = req.body;
  const timestamp = getTimestamp();

  const requestBody = {
    name: `omni_${uuid()}_${timestamp}.${NOTE_FILE_EXT}`,
    mimeType: NOTE_FILE_MIME_TYPE,
    properties: {
      title: note.title,
      excerpt: getNoteExcerpt(note),
    },
  };
  const media = {
    body: JSON.stringify(note, null, 2),
    mimeType: NOTE_FILE_MIME_TYPE,
  };

  try {
    const response = await drive.files.create({
      requestBody,
      media,
      fields: 'id',
    });
    const { id } = response.data;
    res.json({ id });
  } catch (error) {
    res.status(500).json(error);
  }
});

export default handler;
