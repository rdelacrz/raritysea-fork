import { BigNumber } from '@ethersproject/bignumber';

export interface CraftedItem {
  base_type: number;
  item_type: number;
  crafted: number;
  crafter: BigNumber;
}
