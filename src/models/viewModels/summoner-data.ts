import { BigNumber } from '@ethersproject/bignumber';
import { AbilityScore, Summoner } from '@models';

export interface SummonerData {
  summoner: Summoner;
  abilityScore: AbilityScore;
  class: BigNumber;
  level: BigNumber;
  xp: BigNumber;
}
