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
export enum SortBy {
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
}

export enum SummonerClass {
  ALL = 0,
  BARBARIAN = 1,
  BARD = 2,
  CLERIC = 3,
  DRUID = 4,
  FIGHTER = 5,
  MONK = 6,
  PALADIN = 7,
  RANGER = 8,
  ROGUE = 9,
  SORCERER = 10,
  WIZARD = 11,
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