import { BigNumber } from '@ethersproject/bignumber';

export interface Armor {
  id: BigNumber;
  cost: BigNumber;
  weight: BigNumber;
  armor_bonus: BigNumber;
  max_dex_bonus: BigNumber;
  penalty: BigNumber;
  spell_failure: BigNumber;
  name: string;
  description: string;
}
