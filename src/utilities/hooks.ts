/**
 * Hooks to access various data.
 */

import {
  useBuySummoner as useBuy, graphQLSchema,
  summonersContract, attributesContract, rarityContract, goldContract, skillsContract, skillsContractAlt, provider
} from '@contracts';
import { Web3Provider } from '@ethersproject/providers';
import { graphql } from 'graphql';
import { useQuery } from 'react-query';
import { useWeb3React } from '@web3-react/core';
import { AbilityScore, ClassSkillSet, Summoner, SummonerData } from '@models';
import { Call } from 'ethcall';
import { Status, SummonerClass, SummonerClassList } from '@utilities';

export const useSummonerDataList = () => (
  useQuery('getSummonerDataList', async () => {
    // Gets summoner data
    const getAllSummonersCall = summonersContract.getAllSummoners() as Call;
    const callResult = await provider.all([getAllSummonersCall]);
    const summoners = (callResult[0] as Summoner[]).filter(s => s.status === Status.LISTED);

    // Performs calls en masse for each summoner
    const abilityScores = await provider.all(
      summoners.map(s => attributesContract.ability_scores(s.tokenID.toString()) as Call)
    ) as AbilityScore[];
    const summonerClasses = await provider.all(
      summoners.map(s => rarityContract.class(s.tokenID.toString()) as Call)
    ) as string[];
    const summonerLevels = await provider.all(
      summoners.map(s => rarityContract.level(s.tokenID.toString()) as Call)
    ) as string[];
    const xpList = await provider.all(
      summoners.map(s => rarityContract.xp(s.tokenID.toString()) as Call)
    ) as string[];
    const summonerGold = await provider.all(
      summoners.map(s => goldContract.balanceOf(s.tokenID.toString()) as Call)
    ) as string[];

    // Normal ethcall contracts seem to error out when getting skills for some reason...
    const input = summoners.map(s => skillsContractAlt.methods.get_skills(s.tokenID.toString()).call() as Promise<number[]>);
    const summonerSkills = await Promise.all(input);

    return summoners.map((summoner, index) => {
      const summonerData: SummonerData = {
        summoner: ({...summoner}),
        abilityScore: abilityScores[index],
        class: summonerClasses[index],
        level: summonerLevels[index],
        xp: xpList[index],
        gold: summonerGold[index],
        skills: summonerSkills[index],
      };
      return summonerData;
    });
  })
)

export const useClassSkills = () => (
  useQuery('getClassSkills', async () => {
    const summonerClasses = SummonerClassList.slice(1);

    // Gets active skills and skill names for every summoner class
    const activeSkillsPerSummoner = await provider.all(
      summonerClasses.map(summonerClass => skillsContract.class_skills(summonerClass) as Call)
    ) as boolean[][];
    const skillNamesPerSummoner = await provider.all(
      summonerClasses.map(summonerClass => skillsContract.class_skills_by_name(summonerClass) as Call)
    ) as string[][];

    // Combines skill active statuses and actual names for every single summoner class
    const classSkills = activeSkillsPerSummoner.map((activeSkills, index) => {
      const skillNames = skillNamesPerSummoner[index];
      let skillNameIndex = 0;

      const classSkillSets = activeSkills.map((active, id) => {
        const classSkillSet: ClassSkillSet = { id, active };
        if (active && skillNameIndex < skillNames.length) {
          classSkillSet.skillName = skillNames[skillNameIndex];
          skillNameIndex += 1;
        }
        return classSkillSet;
      });

      return classSkillSets;
    });

    return classSkills;
  })
)

export const useBuySummoner = () => {
  const { library } = useWeb3React<Web3Provider>();
  return useBuy(library?.getSigner())
}