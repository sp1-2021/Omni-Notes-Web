import { IncomingMessage } from 'http';
import { google } from 'googleapis';
import { getAccessToken } from '@/utils/getAccessToken';

const oAuth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  'http://localhost:3000/auth/'
);

export const getGoogleAuthClient = async (req: IncomingMessage) => {
  const token = await getAccessToken(req);
  oAuth2Client.setCredentials({
    access_token: token,
  });
  return oAuth2Client;
};
