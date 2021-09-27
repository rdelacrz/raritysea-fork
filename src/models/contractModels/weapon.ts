import { BigNumber } from '@ethersproject/bignumber';

export interface Weapon {
  cost: BigNumber;
  critical: BigNumber;
  critical_modifier: BigNumber;
  damage: BigNumber;
  damage_type: BigNumber;
  description: string;
  encumbrance: BigNumber;
  id: BigNumber;
  name: string;
  proficiency: BigNumber;
  range_increment: BigNumber;
  weight: BigNumber;
}
