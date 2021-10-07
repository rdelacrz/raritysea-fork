import { BigNumber } from '@ethersproject/bignumber';
import { Armor, CraftedItem, Good, Weapon } from '@models';

export interface CraftedItemData<T extends Armor | Good | Weapon> {
  craftedItem: CraftedItem;
  itemAttributes: T;
  listId: BigNumber;
  price: BigNumber;
  lister: string;
}
