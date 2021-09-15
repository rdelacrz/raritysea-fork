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
