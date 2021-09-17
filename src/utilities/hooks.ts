/**
 * Hooks to access various data.
 */

import { useEffect, useState } from 'react';
import PQueue from 'p-queue/dist';
import { BigNumber } from '@ethersproject/bignumber';
import { useWeb3React } from '@web3-react/core';
import {
  attributesContractFetcher, goldContractFetcher, rarityContractFetcher, skillsContractFetcher,
  useBuySummoner as useBuy, useGetAllSummoners
} from '@contract';
import { AbilityScore, SummonerData } from '@models';
import { Status } from '@utilities';
import { Web3Provider } from '@ethersproject/providers';

export const useSummonerDataList = (chunkSize = 8, promiseConcurrency = 50) => {
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

        let accumulatedSummonerDataList: SummonerData[] = [];

        // Iterates through summoners in chunks and updates summoner data every time more attributes have been queried
        const splicedSummoners = filteredSummoners.slice();
        while (splicedSummoners.length) {
          const summonerGroup = splicedSummoners.splice(0, chunkSize);

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

          // Experience
          const goldPromiseFuncs = summonerGroup.map(
            s => () => goldContractFetcher<BigNumber>('balanceOf', s.tokenID.toString())
              .catch(err => { console.error(err); return undefined; })
          );
          const goldList = await promiseQuery.addAll(goldPromiseFuncs);

          // Skils
          const skillsPromiseFuncs = summonerGroup.map(
            s => () => skillsContractFetcher<number[]>('get_skills', s.tokenID.toString())
              .catch(err => { console.error(err); return undefined; })
          );
          const skillsList = await promiseQuery.addAll(skillsPromiseFuncs);

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
            gold: goldList[index],
            skills: skillsList[index],
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

export const useBuySummoner = () => {
  const { library } = useWeb3React<Web3Provider>();
  return useBuy(library?.getSigner())
}