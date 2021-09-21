/**
 * Hooks to access various data.
 */

import { useBuySummoner as useBuy, graphQLSchema} from '@contract';
import { Web3Provider } from '@ethersproject/providers';
import { graphql } from 'graphql';
import { useQuery } from 'react-query';
import { useWeb3React } from '@web3-react/core';
import { ClassSkillSet, SummonerData } from '@models';

export const useSummonerDataList = () => (
  useQuery('getSummonerDataList', async () => (
    graphql(graphQLSchema, `{
      summonerDataList {
        summoner { listId tokenID price }
        abilityScore { strength dexterity constitution intelligence wisdom charisma }
        level
        class
        gold
        skills
      }
    }`).then(results => results.data?.summonerDataList as SummonerData[] || [])
  ))
)

export const useClassSkills = () => (
  useQuery('getClassSkills', async () => (
    graphql(graphQLSchema, `{
      classSkills {
        id
        skillName
        active
      }
    }`).then(results => results.data?.classSkills as ClassSkillSet[][] || [])
  ))
)

export const useBuySummoner = () => {
  const { library } = useWeb3React<Web3Provider>();
  return useBuy(library?.getSigner())
}