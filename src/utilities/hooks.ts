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
  const [summonerDataList, setSummonerDataList] = useState<SummonerData[]>([]);

  // Set only once in life cycle of hook
  const [partiallyLoaded, setPartiallyLoaded] = useState<boolean>(false);
  const [fullyLoaded, setFullyLoaded] = useState<boolean>(false);

  // Set every time new data is fetched
  const [partiallyFetched, setPartiallyFetched] = useState<boolean>(false);
  const [fullyFetched, setFullyFetched] = useState<boolean>(false);

  // Gets summoners first, which will then be filtered and used to acquire other attributes
  const { data: summoners, isFetched: summonersFetched } = useGetAllSummoners();
  const filteredSummoners = (summoners || []).filter(s => s.status === Status.LISTED);

  const promiseQuery = new PQueue({ concurrency: promiseConcurrency });

  useEffect(() => {
    let stopQuery = false;

    async function fetchSummonerAttributes() {
      if (summonersFetched) {
        setPartiallyFetched(false);
        setFullyFetched(false);

        // Splits the summoners into chunks of given size in order to efficiently query corresponding attribute data
        const summonerGroups = filteredSummoners.reduce((groups, summoner) => {
          if (groups.length === 0 || groups[groups.length - 1].length === chunkSize) {
            groups.push([summoner]);
          } else {
            groups[groups.length - 1].push(summoner);
          }
          return groups;
        }, [] as Summoner[][]);

        // Iterates through chunks and updates summoner data every time more attributes have been queried
        let accumulatedSummonerDataList: SummonerData[] = [];
        for (const summonerGroup of summonerGroups) {
          // Ability scores
          const abilityScorePromiseFuncs = summonerGroup.map(
            s => () => attributesContractFetcher<AbilityScore>('ability_scores', s.tokenID.toString())
              .catch(err => { console.error(err); return undefined; })
          );
          const abilityScores = await promiseQuery.addAll(abilityScorePromiseFuncs);

          // Classes
          const classPromiseFuncs = summonerGroup.map(
            s => () => rarityContractFetcher<BigNumber>('class', s.tokenID.toString())
              .catch(err => { console.error(err); return undefined; })
          );
          const classes = await promiseQuery.addAll(classPromiseFuncs);

          // Levels
          const levelPromiseFuncs = summonerGroup.map(
            s => () => rarityContractFetcher<BigNumber>('level', s.tokenID.toString())
              .catch(err => { console.error(err); return undefined; })
          );
          const levels = await promiseQuery.addAll(levelPromiseFuncs);

          // Experience
          const xpPromiseFuncs = summonerGroup.map(
            s => () => rarityContractFetcher<BigNumber>('xp', s.tokenID.toString())
              .catch(err => { console.error(err); return undefined; })
          );
          const xpList = await promiseQuery.addAll(xpPromiseFuncs);
          promiseQuery.clear();

          // Ceases updates once query has been stopped on clean up or summoners are refetching
          if (stopQuery) {
            break;
          }

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
          setPartiallyFetched(true);
        }

        setFullyLoaded(true);
        setFullyFetched(true);
      }
    }

    fetchSummonerAttributes();

    return () => { stopQuery = true };
  }, [summonersFetched]);

  // Combines summoners with associated ability scores and other attributes
  return {
    summonerDataList,
    partiallyLoaded,
    fullyLoaded,
    partiallyFetched: partiallyFetched && summonersFetched,   // Not considered fetched unless summoners data has been fetched
    fullyFetched: fullyFetched && summonersFetched,   // Not considered fetched unless summoners data has been fetched
  };
}
