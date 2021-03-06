import { IncomingMessage } from 'http';
import { google } from 'googleapis';
import { getGoogleAccessToken } from '@/utils/google/getGoogleAccessToken';

const oAuth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  'http://localhost:3000/auth/'
);

export const getGoogleAuthClient = async (req: IncomingMessage) => {
  const token = await getGoogleAccessToken(req);
  oAuth2Client.setCredentials({
    access_token: token,
  });
  return oAuth2Client;
};
