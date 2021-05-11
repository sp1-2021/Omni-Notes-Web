import { getSession } from 'next-auth/client';
import { IncomingMessage } from 'http';

export const getGoogleAccessToken = async (req: IncomingMessage) => {
  const session = await getSession({ req });
  return (session?.accessToken as string) ?? null;
};
