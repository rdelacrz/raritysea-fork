import { BigNumber } from '@ethersproject/bignumber';
import { AbilityScore, Summoner } from '@models';

export interface SummonerData {
  id: BigNumber;
  price: BigNumber;
  abilityScore?: AbilityScore;
  class?: BigNumber;
  level?: BigNumber;
  xp?: BigNumber;
  gold?: BigNumber;
  skills?: number[];
}
