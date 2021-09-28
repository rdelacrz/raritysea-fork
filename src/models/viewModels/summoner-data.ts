import { BigNumber } from '@ethersproject/bignumber';
import { AbilityScore } from '@models';

export interface SummonerData {
  id: BigNumber;
  price: BigNumber;
  lister: string;
  abilityScore?: AbilityScore;
  class?: BigNumber;
  level?: BigNumber;
  xp?: BigNumber;
  gold?: BigNumber;
  skills?: number[];
}
