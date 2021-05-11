import { IncomingMessage } from 'http';
import { google } from 'googleapis';
import { getGoogleAuthClient } from '@/utils/getGoogleAuthClient';

export const getGoogleDriveClient = async (req: IncomingMessage) => {
  const auth = await getGoogleAuthClient(req);
  return google.drive({ version: 'v3', auth });
};
