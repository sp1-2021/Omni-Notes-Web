import { client } from '@/lib/axios/client';

export const fetcher = async (url: string) => {
  try {
    const response = await client.get(url);
    return response.data;
  } catch (error) {
    throw error?.response ?? error;
  }
};
