import { SWRConfiguration } from 'swr';
import { fetcher as axiosFetcher } from '@/lib/axios/fetcher';

export const config: SWRConfiguration = {
  fetcher: axiosFetcher,
};
