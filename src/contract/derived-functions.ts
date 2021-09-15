/**
 * Functions using the basic fetchers to perform specific asynchronous functionalities.
 */

import PQueue from 'p-queue/dist';
import { attributesContractFetcher, rarityContractFetcher, summonersContractFetcher } from '@contract';
import { AbilityScore, Summoner, SummonerData } from '@models';
import { Status } from '@utilities';
import { BigNumber } from '@ethersproject/bignumber';

export const getSummonerDataList = async (promiseConcurrency = 100) => {
  const promiseQuery = new PQueue({ concurrency: promiseConcurrency });

  // Gets summoners first, which will then be filtered and used to acquire other attributes
  const summoners = await summonersContractFetcher<Summoner[]>('getAllSummoners');
  const filteredSummoners = summoners.filter(s => s.status === Status.LISTED);

  // Ability scores
  const abilityScorePromiseFuncs = filteredSummoners.map(
    s => () => attributesContractFetcher<AbilityScore>('ability_scores', s.tokenID.toBigInt())
  );
  const abilityScores = await promiseQuery.addAll(abilityScorePromiseFuncs);
  promiseQuery.clear();

  // Classes
  const classPromiseFuncs = filteredSummoners.map(
    s => () => rarityContractFetcher<BigNumber>('class', s.tokenID.toBigInt())
  );
  const classes = await promiseQuery.addAll(classPromiseFuncs);
  promiseQuery.clear();

  // Levels
  const levelPromiseFuncs = filteredSummoners.map(
    s => () => rarityContractFetcher<BigNumber>('level', s.tokenID.toBigInt())
  );
  const levels = await promiseQuery.addAll(levelPromiseFuncs);
  promiseQuery.clear();

  // Experience
  const xpPromiseFuncs = filteredSummoners.map(
    s => () => rarityContractFetcher<BigNumber>('xp', s.tokenID.toBigInt())
  );
  const xpList = await promiseQuery.addAll(xpPromiseFuncs);
  promiseQuery.clear();

  // Combines summoners with associated ability scores and other attributes
  return abilityScores.map<SummonerData>((abilityScore, index) => ({
    summoner: filteredSummoners[index],
    abilityScore,
    class: classes[index],
    level: levels[index],
    xp: xpList[index],
  }));
}
