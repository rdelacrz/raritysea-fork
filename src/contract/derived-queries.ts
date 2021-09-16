/**
 * Functions using the basic fetchers to perform specific asynchronous functionalities.
 */

import { useQuery } from 'react-query';
import { summonersContractFetcher } from '@contract';
import { Summoner } from '@models';

export const useGetAllSummoners = () => (
  useQuery('getAllSummoners', async () => summonersContractFetcher<Summoner[]>('getAllSummoners'))
);
