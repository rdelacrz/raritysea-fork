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
