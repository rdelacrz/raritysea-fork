/**
 * Functions using the basic fetchers to perform specific asynchronous functionalities.
 */

import PQueue from 'p-queue/dist';
import { attributesContractFetcher, summonersContractFetcher } from '@contract';
import { AbilityScore, Summoner, SummonerData } from '@models';
import { Status } from '@utilities';

export const getSummonerDataList = async (promiseConcurrency = 100) => {
  const abilityScoreQuery = new PQueue({ concurrency: promiseConcurrency });

  // Gets summoners first, which will be used to retrieve ability scores
  const summoners = await summonersContractFetcher<Summoner[]>('getAllSummoners');

  // Filters summoners by listed ones only, and uses those summoners to get associated ability scores
  const filteredSummoners = summoners.filter(s => s.status === Status.LISTED);
  const abilityScorePromiseFuncs = filteredSummoners.map(
    s => () => attributesContractFetcher<AbilityScore>('ability_scores', s.tokenID.toBigInt())
  );
  const abilityScores = await abilityScoreQuery.addAll(abilityScorePromiseFuncs);

  // Combines summoners with associated ability scores
  return abilityScores.map<SummonerData>((abilityScore, index) => ({
    summoner: filteredSummoners[index],
    abilityScore,
  }));
}
