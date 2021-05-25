import { getGoogleDriveClient } from '@/utils/google/getGoogleDriveClient';
import { NOTE_FILE_MIME_TYPE } from '@/const/drive.const';
import { getTimestamp } from '@/utils/getTimestamp';
import { ListFilesResponse } from '@/types/list-files-response';
import { createRequestHandler } from '@/utils/createRequestHandler';
import { extractModificationTimestampFromFileName } from '@/utils/note/extractModificationTimestampFromFileName';
import { createNote } from '@/utils/note/createNote';
import { NoteListRecord } from '@/types/note/note-list-record';

const handler = createRequestHandler();

/**
 * Note list request handler
 */
handler.get(async (req, res) => {
  const drive = await getGoogleDriveClient(req);

  try {
    const files = await drive.files.list({
      q: "mimeType='text/plain' and name contains 'omni_'",
      fields: 'files/id,files/name,files/properties',
    });
    const fileList = files.data.files as ListFilesResponse[];

    const notes = fileList
      .filter((file) => file.properties.trashed !== 'true')
      .map<NoteListRecord>(({ id, properties, name }) => ({
        id,
        title: properties.title,
        excerpt: properties.excerpt,
        fileName: name,
        modifiedTime: extractModificationTimestampFromFileName(name),
      }));

    res.json(notes);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

/**
 * Create note request handler
 * Upon successful creation returns created file's id
 */
handler.post(async (req, res) => {
  const drive = await getGoogleDriveClient(req);
  const title = (req.body?.title as string) ?? '';
  const timestamp = getTimestamp();

  const requestBody = {
    name: `omni_${timestamp}_${timestamp}`,
    mimeType: NOTE_FILE_MIME_TYPE,
    properties: {
      title,
      excerpt: '',
    },
  };
  const media = {
    body: JSON.stringify(createNote(title), null, 2),
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
    console.error(error);
    res.status(500).json(error);
  }
});

export default handler;
