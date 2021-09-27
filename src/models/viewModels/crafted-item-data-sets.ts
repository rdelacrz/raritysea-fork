import { Armor, CraftedItemData, Good, Weapon } from '@models';

export interface CraftedItemDataSets {
  armor: CraftedItemData<Armor>[];
  goods: CraftedItemData<Good>[];
  weapons: CraftedItemData<Weapon>[];
}
