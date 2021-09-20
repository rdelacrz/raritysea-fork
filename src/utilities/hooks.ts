/**
 * Hooks to access various data.
 */

import { useWeb3React } from '@web3-react/core';
import { useBuySummoner as useBuy, graphQLSchema
} from '@contract';
import { SummonerData } from '@models';
import { Web3Provider } from '@ethersproject/providers';


import { graphql } from 'graphql';
import { useQuery } from 'react-query';

export const useSummonerDataList = () => {
  return useQuery('getSummonerDataList', async () => {
    return graphql(graphQLSchema, `{
      summonerDataList {
        summoner { listId tokenID price }
        abilityScore { strength dexterity constitution intelligence wisdom charisma }
        level
        class
        gold
        skills
      }
    }`).then(results => results.data?.summonerDataList as SummonerData[] || []);
  });
}

export const useBuySummoner = () => {
  const { library } = useWeb3React<Web3Provider>();
  return useBuy(library?.getSigner())
}