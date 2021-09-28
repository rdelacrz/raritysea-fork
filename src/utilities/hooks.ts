/**
 * Hooks to access various data.
 */

import { Call } from 'ethcall';
import { BigNumber } from '@ethersproject/bignumber';
import { Web3Provider } from '@ethersproject/providers';
import { useQuery, useInfiniteQuery } from 'react-query';
import { useWeb3React } from '@web3-react/core';
import {
  useBuySummoner as useBuy,
  summonersContract, attributesContract, craftingContract, craftingMarketContract, rarityContract, goldContract,
  skillsContract, skillsContractAlt, provider, goodsContract, armorContract, weaponsContract
} from '@contracts';
import {
  AbilityScore, Armor, ClassSkillSet, CraftedItem, CraftedItemDataSets, Good, ListAt, QueryResult, Summoner, SummonerData, Weapon
} from '@models';
import { BaseItemType, Status, SummonerClassList } from '@utilities';

const MAX_QUERY_SIZE = 50;

export const useSummonerDataList = () => (
  useInfiniteQuery('getSummonerDataList', async ({ pageParam }) => {
    const currIndex = parseInt(pageParam || 0, 10);

    // Gets number of current summoners
    const listLengthResult = await provider.all([summonersContract.listLength() as Call]);
    const listLength: BigNumber = listLengthResult.length > 0 ? listLengthResult[0] : BigNumber.from(0);
    const listLengthNum = listLength.toNumber();

    // Gets all summoner data
    const count = currIndex + MAX_QUERY_SIZE < listLengthNum ? MAX_QUERY_SIZE : listLengthNum - currIndex;
    const listsAtResults = await provider.all([summonersContract.listsAt(currIndex, count) as Call]);
    const listAt: ListAt = listsAtResults.length > 0 ? listsAtResults[0] : { rIds: [], rPrices: [] };

    // Performs calls en masse for each summoner
    const abilityScores = await provider.all(
      listAt.rIds.map(id => attributesContract.ability_scores(id.toString()) as Call)
    ) as AbilityScore[];
    const summonerClasses = await provider.all(
      listAt.rIds.map(id => rarityContract.class(id.toString()) as Call)
    ) as BigNumber[];
    const summonerLevels = await provider.all(
      listAt.rIds.map(id => rarityContract.level(id.toString()) as Call)
    ) as BigNumber[];
    const xpList = await provider.all(
      listAt.rIds.map(id => rarityContract.xp(id.toString()) as Call)
    ) as BigNumber[];
    const summonerGold = await provider.all(
      listAt.rIds.map(id => goldContract.balanceOf(id.toString()) as Call)
    ) as BigNumber[];

    // Normal ethcall contracts seem to error out when getting skills for some reason...
    const input = listAt.rIds.map(id => skillsContractAlt.methods.get_skills(id.toString()).call() as Promise<number[]>);
    const summonerSkills = await Promise.all(input);

    const summonerDataList = listAt.rIds.map((id, index) => {
      const summonerData: SummonerData = {
        id,
        price: listAt.rPrices[index],
        abilityScore: abilityScores[index],
        class: summonerClasses[index],
        level: summonerLevels[index],
        xp: xpList[index],
        gold: summonerGold[index],
        skills: summonerSkills[index],
      };
      return summonerData;
    });

    const queryResult: QueryResult<SummonerData> = {
      result: summonerDataList,
      currIndex,
      totalResults: listLengthNum,
    };

    return queryResult;
  }, {
    getNextPageParam: (prevPage, pages) => prevPage.currIndex < prevPage.totalResults ?
      prevPage.currIndex + MAX_QUERY_SIZE : undefined
    
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