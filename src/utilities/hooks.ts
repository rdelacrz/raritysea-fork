/**
 * Hooks to access various data.
 */

import PQueue from 'p-queue/dist';
import { useQuery } from 'react-query';
import { attributesContractFetcher, summonersContractFetcher } from '@contract';
import { AbilityScore, Summoner } from '@models';

export const useGetAllSummoners = () => {
  return useQuery('getAllSummoners', async () =>
    summonersContractFetcher<Summoner[]>('getAllSummoners')
  );
}

export const useAbilityScores = (chunkSize = 5) => {
  const query = new PQueue({ concurrency: chunkSize });
  return useQuery('useAbilityScores', async () => (
    summonersContractFetcher<Summoner[]>('getAllSummoners')
      .then(summoners => summoners.filter(s => s.status === 0))
      .then(summoners => {
        const abilityScorePromiseFuncs = summoners
          .filter(s => s.tokenID !== undefined)
          .map(s => () => attributesContractFetcher<AbilityScore>('ability_scores', s.tokenID.toBigInt()));
        return query.addAll(abilityScorePromiseFuncs);
      })
  ));
}
