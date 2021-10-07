/**
 * General-purpose functions that do not belong to any specific category go here.
 */

import { BigNumber } from '@ethersproject/bignumber';
import { Armor, CraftedItemData, SummonerData, Weapon } from '@models';
import Web3 from 'web3';
import { ArmorSortBy, SummonerSortBy, WeaponSortBy } from './constants';

export const generateFtmContractLink = (address: string) => {
  return `https://ftmscan.com/address/${address}`;
}

export const truncateAddress = (address: string, ellipsisCount = 3) => {
  if (address.length > 12) {
    const ellipsis = '.'.repeat(ellipsisCount);
    const firstSix = address.substr(0, 6);
    const lastSix = address.substr(address.length - 6, 6);
    return `${firstSix}${ellipsis}${lastSix}`;
  }
  return address;
}

export const compareBigNumbers = (bigNumber1?: BigNumber, bigNumber2?: BigNumber) => {
  if (bigNumber1 !== undefined && bigNumber2 !== undefined) {
    if (bigNumber1.lt(bigNumber2)) {
      return -1;
    } else if (bigNumber1.gt(bigNumber2)) {
      return 1;
    } else {
      return 0;
    }
  } else if (bigNumber1 !== undefined) {
    return 1;
  } else if (bigNumber2 !== undefined) {
    return -1;
  } else {
    return 0;
  }
}

/**
 * Returns compare function that sorts summoners in a list based on current sortBy method.
 *
 * @returns Compare function that accepts two items and returns integer based on sorting results.
 */
export const getSummonerComparer = (sortBy: SummonerSortBy) => {
  switch (sortBy) {
    case SummonerSortBy.PRICE_LOW_TO_HIGH:
      return (d1: SummonerData, d2: SummonerData) => compareBigNumbers(d1.price, d2.price);
    case SummonerSortBy.PRICE_HIGH_TO_LOW:
      return (d1: SummonerData, d2: SummonerData) => compareBigNumbers(d2.price, d1.price);
    case SummonerSortBy.CHAR_ID_LOW_TO_HIGH:
      return (d1: SummonerData, d2: SummonerData) => compareBigNumbers(d1.id, d2.id);
    case SummonerSortBy.CHAR_ID_HIGH_TO_LOW:
      return (d1: SummonerData, d2: SummonerData) => compareBigNumbers(d2.id, d1.id);
    case SummonerSortBy.ATTR_LV:
      return (d1: SummonerData, d2: SummonerData) => compareBigNumbers(d2.level, d1.level);
    case SummonerSortBy.ATTR_EXP:
      return (d1: SummonerData, d2: SummonerData) => compareBigNumbers(d2.xp, d1.xp);
    case SummonerSortBy.ATTR_STR:
      return (d1: SummonerData, d2: SummonerData) => (d2.abilityScore?.strength || 0) - (d1.abilityScore?.strength || 0);
    case SummonerSortBy.ATTR_CON:
      return (d1: SummonerData, d2: SummonerData) => (d2.abilityScore?.constitution || 0) - (d1.abilityScore?.constitution || 0);
    case SummonerSortBy.ATTR_DEX:
      return (d1: SummonerData, d2: SummonerData) => (d2.abilityScore?.dexterity || 0) - (d1.abilityScore?.dexterity || 0);
    case SummonerSortBy.ATTR_INT:
      return (d1: SummonerData, d2: SummonerData) => (d2.abilityScore?.intelligence || 0) - (d1.abilityScore?.intelligence || 0);
    case SummonerSortBy.ATTR_WIS:
      return (d1: SummonerData, d2: SummonerData) => (d2.abilityScore?.wisdom || 0) - (d1.abilityScore?.wisdom || 0);
    case SummonerSortBy.ATTR_CHA:
      return (d1: SummonerData, d2: SummonerData) => (d2.abilityScore?.charisma || 0) - (d1.abilityScore?.charisma || 0);
    case SummonerSortBy.INVENTORY_GOLD:
      return (d1: SummonerData, d2: SummonerData) => compareBigNumbers(d2.gold, d1.gold);
    default:
      return undefined;
  }
}

export const getWeaponComparer = (sortBy: WeaponSortBy) => {
  switch (sortBy) {
    case WeaponSortBy.PRICE_LOW_TO_HIGH:
      return (w1: CraftedItemData<Weapon>, w2: CraftedItemData<Weapon>) => compareBigNumbers(w1.price, w2.price);
    case WeaponSortBy.PRICE_HIGH_TO_LOW:
      return (w1: CraftedItemData<Weapon>, w2: CraftedItemData<Weapon>) => compareBigNumbers(w2.price, w1.price);
    case WeaponSortBy.WEAPON_ID_LOW_TO_HIGH:
      return (w1: CraftedItemData<Weapon>, w2: CraftedItemData<Weapon>) => compareBigNumbers(w1.listId, w2.listId);
    case WeaponSortBy.WEAPON_ID_HIGH_TO_LOW:
      return (w1: CraftedItemData<Weapon>, w2: CraftedItemData<Weapon>) => compareBigNumbers(w2.listId, w1.listId);
    case WeaponSortBy.ATTR_DAMAGE:
      return (w1: CraftedItemData<Weapon>, w2: CraftedItemData<Weapon>) => compareBigNumbers(w2.itemAttributes.damage, w1.itemAttributes.damage);
    case WeaponSortBy.ATTR_CRITICAL:
      return (w1: CraftedItemData<Weapon>, w2: CraftedItemData<Weapon>) => compareBigNumbers(w2.itemAttributes.critical, w1.itemAttributes.critical);
    case WeaponSortBy.ATTR_CRITICAL_MOD:
      return (w1: CraftedItemData<Weapon>, w2: CraftedItemData<Weapon>) => compareBigNumbers(w2.itemAttributes.critical_modifier, w1.itemAttributes.critical_modifier);
    case WeaponSortBy.ATTR_RANGE_INC:
      return (w1: CraftedItemData<Weapon>, w2: CraftedItemData<Weapon>) => compareBigNumbers(w2.itemAttributes.range_increment, w1.itemAttributes.range_increment);
    case WeaponSortBy.ATTR_PROFICIENCY:
      return (w1: CraftedItemData<Weapon>, w2: CraftedItemData<Weapon>) => compareBigNumbers(w2.itemAttributes.proficiency, w1.itemAttributes.proficiency);
    case WeaponSortBy.ATTR_ENCUMBRENCE:
      return (w1: CraftedItemData<Weapon>, w2: CraftedItemData<Weapon>) => compareBigNumbers(w2.itemAttributes.encumbrance, w1.itemAttributes.encumbrance);
    case WeaponSortBy.ATTR_DAMAGE_TYPE:
      return (w1: CraftedItemData<Weapon>, w2: CraftedItemData<Weapon>) => compareBigNumbers(w2.itemAttributes.damage_type, w1.itemAttributes.damage_type);
    case WeaponSortBy.ATTR_WEIGHT:
      return (w1: CraftedItemData<Weapon>, w2: CraftedItemData<Weapon>) => compareBigNumbers(w2.itemAttributes.weight, w1.itemAttributes.weight);
    default:
      return undefined;
  }
}

export const getArmorComparer = (sortBy: ArmorSortBy) => {
  switch (sortBy) {
    case ArmorSortBy.PRICE_LOW_TO_HIGH:
      return (a1: CraftedItemData<Armor>, a2: CraftedItemData<Armor>) => compareBigNumbers(a1.price, a2.price);
    case ArmorSortBy.PRICE_HIGH_TO_LOW:
      return (a1: CraftedItemData<Armor>, a2: CraftedItemData<Armor>) => compareBigNumbers(a2.price, a1.price);
    case ArmorSortBy.ARMOR_ID_LOW_TO_HIGH:
      return (a1: CraftedItemData<Armor>, a2: CraftedItemData<Armor>) => compareBigNumbers(a1.listId, a2.listId);
    case ArmorSortBy.ARMOR_ID_HIGH_TO_LOW:
      return (a1: CraftedItemData<Armor>, a2: CraftedItemData<Armor>) => compareBigNumbers(a2.listId, a1.listId);
    case ArmorSortBy.ATTR_ARMOR_BONUS:
      return (a1: CraftedItemData<Armor>, a2: CraftedItemData<Armor>) => compareBigNumbers(a2.itemAttributes.armor_bonus, a1.itemAttributes.armor_bonus);
    case ArmorSortBy.ATTR_MAX_DEX_BONUS:
      return (a1: CraftedItemData<Armor>, a2: CraftedItemData<Armor>) => compareBigNumbers(a2.itemAttributes.max_dex_bonus, a1.itemAttributes.max_dex_bonus);
    case ArmorSortBy.ATTR_PENALTY:
      return (a1: CraftedItemData<Armor>, a2: CraftedItemData<Armor>) => compareBigNumbers(a2.itemAttributes.penalty, a1.itemAttributes.penalty);
    case ArmorSortBy.ATTR_SPELL_FAILURE:
      return (a1: CraftedItemData<Armor>, a2: CraftedItemData<Armor>) => compareBigNumbers(a2.itemAttributes.spell_failure, a1.itemAttributes.spell_failure);
    case ArmorSortBy.ATTR_WEIGHT:
      return (a1: CraftedItemData<Armor>, a2: CraftedItemData<Armor>) => compareBigNumbers(a2.itemAttributes.weight, a1.itemAttributes.weight);
    default:
      return undefined;
  }
}

export const checkWalletConnection = async (callbackFn: (addr?: string[]) => void) => {
  // Check if browser is running Metamask
  let web3: Web3;
  if (window['ethereum']) {
    web3 = new Web3(window['ethereum']);
  } else if (window['web3']) {
    web3 = new Web3(window['web3'].currentProvider);
  } else {
    return;
  }

  // Check if user is already connected by retrieving the accounts
  web3.eth.getAccounts()
    .then(async (addrList: string[]) => {
      callbackFn(addrList);
    });
}
