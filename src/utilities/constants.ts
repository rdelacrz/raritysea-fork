/**
 * Constants that will be used throughout the application go here.
 */

/**
 * Contains possible statuses of item (listed, unlisted, sold).
 */
export enum Status {
  LISTED,
  UNLISTED,
  SOLD
}

/**
 * Contains possible sorting options for summoners.
 */
export enum SummonerSortBy {
  PRICE_LOW_TO_HIGH,
  PRICE_HIGH_TO_LOW,
  CHAR_ID_LOW_TO_HIGH,
  CHAR_ID_HIGH_TO_LOW,
  ATTR_LV,
  ATTR_EXP,
  ATTR_STR,
  ATTR_CON,
  ATTR_DEX,
  ATTR_INT,
  ATTR_WIS,
  ATTR_CHA,
  INVENTORY_GOLD,
}

export const SummonerSortByDropdownList = [
  'Price : Low to High',
  'Price : High to Low',
  'Character ID : Low to High',
  'Character ID : High to Low',
  'Attribute : LV',
  'Attribute : EXP',
  'Attribute : STR',
  'Attribute : CON',
  'Attribute : DEX',
  'Attribute : INT',
  'Attribute : WIS',
  'Attribute : CHA',
  'Inventory : Gold',
];

export enum SummonerClass {
  ALL,
  BARBARIAN,
  BARD,
  CLERIC,
  DRUID,
  FIGHTER,
  MONK,
  PALADIN,
  RANGER,
  ROGUE,
  SORCERER,
  WIZARD,
}

export const SummonerClassList = [
  SummonerClass.ALL,
  SummonerClass.BARBARIAN,
  SummonerClass.BARD,
  SummonerClass.CLERIC,
  SummonerClass.DRUID,
  SummonerClass.FIGHTER,
  SummonerClass.MONK,
  SummonerClass.PALADIN,
  SummonerClass.RANGER,
  SummonerClass.ROGUE,
  SummonerClass.SORCERER,
  SummonerClass.WIZARD
];

export enum BaseItemType {
  SUMMONERS = 0,  // Not originally a base item type associated with crafting, but can be used in marketplace page
  GOODS = 1,
  ARMOR = 2,
  WEAPONS = 3
}

export const WeaponsTypeCount = 59;

export enum WeaponSortBy {
  PRICE_LOW_TO_HIGH,
  PRICE_HIGH_TO_LOW,
  WEAPON_ID_LOW_TO_HIGH,
  WEAPON_ID_HIGH_TO_LOW,
  ATTR_DAMAGE,
  ATTR_CRITICAL,
  ATTR_CRITICAL_MOD,
  ATTR_RANGE_INC,
  ATTR_PROFICIENCY,
  ATTR_ENCUMBRENCE,
  ATTR_DAMAGE_TYPE,
  ATTR_WEIGHT,
}

export const WeaponsSortByDropdownList = [
  'Price : Low to High',
  'Price : High to Low',
  'Weapon ID : Low to High',
  'Weapon ID : High to Low',
  'Attribute : DAMAGE',
  'Attribute : CRITICAL',
  'Attribute : CRITICAL MODIFIER',
  'Attribute : RANGE INCREMENT',
  'Attribute : PROFICIENCY',
  'Attribute : ENCUMBRENCE',
  'Attribute : DAMAGE TYPE',
  'Attribute : WEIGHT',
];

/**
 * Maps ids to their corresponding class names.
 */
export const ClassMap = {
  1: 'Barbarian',
  2: 'Bard',
  3: 'Cleric',
  4: 'Druid',
  5: 'Fighter',
  6: 'Monk',
  7: 'Paladin',
  8: 'Ranger',
  9: 'Rogue',
  10: 'Sorcerer',
  11: 'Wizard',
}

export const ClassImageMap = {
  1: require('@assets/classes/barbarian.png').default,
  2: require('@assets/classes/bard.png').default,
  3: require('@assets/classes/cleric.png').default,
  4: require('@assets/classes/druid.png').default,
  5: require('@assets/classes/fighter.png').default,
  6: require('@assets/classes/monk.png').default,
  7: require('@assets/classes/paladin.png').default,
  8: require('@assets/classes/ranger.png').default,
  9: require('@assets/classes/rogue.png').default,
  10: require('@assets/classes/sorcerer.png').default,
  11: require('@assets/classes/wizard.png').default,
}

export const PAGE_SIZE = 8;