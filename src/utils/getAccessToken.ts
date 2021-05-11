import { getSession } from 'next-auth/client';
import { IncomingMessage } from 'http';

export const getAccessToken = async (req: IncomingMessage) => {
  const session = await getSession({ req });
  return (session?.accessToken as string) ?? null;
};
