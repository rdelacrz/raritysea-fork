/**
 * Hooks to access various data.
 */

import { useQuery } from 'react-query';
import { getSummonerDataList } from '@contract';

export const useSummonerDataList = (promiseConcurrency = 100) => {
  return useQuery('useSummonerDataList', async () => getSummonerDataList(promiseConcurrency));
}
