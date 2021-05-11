import { createRequestHandler } from '@/utils/createRequestHandler';
import { getGoogleDriveClient } from '@/utils/getGoogleDriveClient';

const handler = createRequestHandler();

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

export default handler;
