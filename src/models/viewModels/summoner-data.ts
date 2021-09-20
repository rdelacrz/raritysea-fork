import { AbilityScore, Summoner } from '@models';

export interface SummonerData {
  summoner: Summoner;
  abilityScore?: AbilityScore;
  class?: string;
  level?: string;
  xp?: string;
  gold?: string;
  skills?: number[];
}
