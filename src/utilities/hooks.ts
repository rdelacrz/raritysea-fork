/**
 * Hooks to access various data.
 */

import { Call } from 'ethcall';
import { BigNumber } from '@ethersproject/bignumber';
import { Web3Provider } from '@ethersproject/providers';
import { useQuery } from 'react-query';
import { useWeb3React } from '@web3-react/core';
import {
  useBuySummoner as useBuy,
  summonersContract, attributesContract, craftingContract, craftingMarketContract, rarityContract, goldContract,
  skillsContract, skillsContractAlt, provider, goodsContract, armorContract, weaponsContract
} from '@contracts';
import {
  AbilityScore, Armor, ClassSkillSet, CraftedItem, CraftedItemDataSets, Good, ListAt, Summoner, SummonerData, Weapon
} from '@models';
import { BaseItemType, Status, SummonerClassList } from '@utilities';

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
    ) as BigNumber[];
    const summonerLevels = await provider.all(
      summoners.map(s => rarityContract.level(s.tokenID.toString()) as Call)
    ) as BigNumber[];
    const xpList = await provider.all(
      summoners.map(s => rarityContract.xp(s.tokenID.toString()) as Call)
    ) as BigNumber[];
    const summonerGold = await provider.all(
      summoners.map(s => goldContract.balanceOf(s.tokenID.toString()) as Call)
    ) as BigNumber[];

    // Normal ethcall contracts seem to error out when getting skills for some reason...
    const input = summoners.map(s => skillsContractAlt.methods.get_skills(s.tokenID.toString()).call() as Promise<number[]>);
    const summonerSkills = await Promise.all(input);

    return summoners.map((summoner, index) => {
      const summonerData: SummonerData = {
        summoner: ({ ...summoner }),
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
);

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

      return activeSkills.map((active, id) => {
        const classSkillSet: ClassSkillSet = { id, active };
        if (active && skillNameIndex < skillNames.length) {
          classSkillSet.skillName = skillNames[skillNameIndex];
          skillNameIndex += 1;
        }
        return classSkillSet;
      });
    });

    return classSkills;
  })
);

export const useCraftedItems = () => (
  useQuery('getCraftedItems', async () => {
    // Gets id information
    const listLengthResult = await provider.all([craftingMarketContract.listLength() as Call]);
    const listLength: BigNumber = listLengthResult.length > 0 ? listLengthResult[0] : BigNumber.from(0);
    const listsAtResult = await provider.all([craftingMarketContract.listsAt(0, listLength) as Call]);
    const listAt: ListAt = listsAtResult.length > 0 ? listsAtResult[0] : { rIds: [], rPrices: [] };

    // Crafted items
    const craftedItems = await provider.all(listAt.rIds.map(rId => craftingContract.items(rId) as Call)) as CraftedItem[];
    const craftedItemsAttributes = await provider.all(
      craftedItems.map(item => {
        switch (item.base_type) {
          case BaseItemType.GOODS:
            return goodsContract.item_by_id(item.item_type) as Call;
          case BaseItemType.ARMOR:
            return armorContract.item_by_id(item.item_type) as Call;
          case BaseItemType.WEAPONS:
          default:
            return weaponsContract.item_by_id(item.item_type) as Call;
        }
      })
    ) as (Armor | Good | Weapon)[];

    return craftedItems.reduce((dataSet, item, index) => {
      const craftedItem = { ...item };
      const price = listAt.rPrices[index];
      switch (craftedItem.base_type) {
        case BaseItemType.GOODS:
          dataSet.goods.push({ craftedItem, price, itemAttributes: { ...craftedItemsAttributes[index] } as Good });
          break;
        case BaseItemType.ARMOR:
          dataSet.armor.push({ craftedItem, price, itemAttributes: { ...craftedItemsAttributes[index] } as Armor });
          break;
        case BaseItemType.WEAPONS:
          dataSet.weapons.push({ craftedItem, price, itemAttributes: { ...craftedItemsAttributes[index] } as Weapon });
          break;
        default:
          break;
      }
      return dataSet;
    }, { armor: [], goods: [], weapons: [] } as CraftedItemDataSets)
  })
);

export const useBuySummoner = () => {
  const { library } = useWeb3React<Web3Provider>();
  return useBuy(library?.getSigner())
}