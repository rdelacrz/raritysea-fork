/**
 * Hooks to access various data.
 */

import { useEffect, useState } from 'react';
import PQueue from 'p-queue/dist';
import { BigNumber } from '@ethersproject/bignumber';
import { attributesContractFetcher, rarityContractFetcher, useGetAllSummoners } from '@contract';
import { AbilityScore, Summoner, SummonerData } from '@models';
import { Status } from '@utilities';

export const useSummonerDataList = (chunkSize = 16, promiseConcurrency = 100) => {
  const [partiallyLoaded, setPartiallyLoaded] = useState<boolean>(false);
  const [fullyLoaded, setFullyLoaded] = useState<boolean>(false);
  const [summonerDataList, setSummonerDataList] = useState<SummonerData[]>([]);

  // Gets summoners first, which will then be filtered and used to acquire other attributes
  const { data: summoners, isFetched: summonersFetched } = useGetAllSummoners();
  const filteredSummoners = (summoners || []).filter(s => s.status === Status.LISTED);

  const promiseQuery = new PQueue({ concurrency: promiseConcurrency });

  useEffect(() => {
    async function fetchSummonerAttributes() {
      if (summonersFetched) {
        const summonerGroups = filteredSummoners.reduce((groups, summoner) => {
          if (groups.length === 0 || groups[groups.length - 1].length === chunkSize) {
            groups.push([summoner]);
          } else {
            groups[groups.length - 1].push(summoner);
          }
          return groups;
        }, [] as Summoner[][]);

        let accumulatedSummonerDataList: SummonerData[] = [];
        for (const summonerGroup of summonerGroups) {
          // Ability scores
          const abilityScorePromiseFuncs = summonerGroup.map(
            s => () => attributesContractFetcher<AbilityScore>('ability_scores', s.tokenID.toString())
          );
          const abilityScores = await promiseQuery.addAll(abilityScorePromiseFuncs);

          // Classes
          const classPromiseFuncs = summonerGroup.map(
            s => () => rarityContractFetcher<BigNumber>('class', s.tokenID.toString())
          );
          const classes = await promiseQuery.addAll(classPromiseFuncs);

          // Levels
          const levelPromiseFuncs = summonerGroup.map(
            s => () => rarityContractFetcher<BigNumber>('level', s.tokenID.toString())
          );
          const levels = await promiseQuery.addAll(levelPromiseFuncs);

          // Experience
          const xpPromiseFuncs = summonerGroup.map(
            s => () => rarityContractFetcher<BigNumber>('xp', s.tokenID.toString())
          );
          const xpList = await promiseQuery.addAll(xpPromiseFuncs);
          promiseQuery.clear();

          const currentSummonerDataList = summonerGroup.map<SummonerData>((summoner, index) => ({
            summoner,
            abilityScore: abilityScores[index],
            class: classes[index],
            level: levels[index],
            xp: xpList[index],
          }));

          accumulatedSummonerDataList = [...accumulatedSummonerDataList, ...currentSummonerDataList];
          setSummonerDataList(accumulatedSummonerDataList);
          setPartiallyLoaded(true);
        }

        setFullyLoaded(true);
      }
    }

    fetchSummonerAttributes();
  }, [summonersFetched]);

  // Combines summoners with associated ability scores and other attributes
  return { summonerDataList, partiallyLoaded, fullyLoaded };
}
