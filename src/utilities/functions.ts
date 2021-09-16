/**
 * General-purpose functions that do not belong to any specific category go here.
 */

import { BigNumber } from '@ethersproject/bignumber';
import { SummonerData } from '@models';
import Web3 from 'web3';
import { SortBy } from './constants';

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
export const getSummonerComparer = (sortBy: SortBy) => {
  switch (sortBy) {
    case SortBy.PRICE_LOW_TO_HIGH:
      return (d1: SummonerData, d2: SummonerData) => compareBigNumbers(d1.summoner.price, d2.summoner.price);
    case SortBy.PRICE_HIGH_TO_LOW:
      return (d1: SummonerData, d2: SummonerData) => compareBigNumbers(d2.summoner.price, d1.summoner.price);
    case SortBy.CHAR_ID_LOW_TO_HIGH:
      return (d1: SummonerData, d2: SummonerData) => compareBigNumbers(d1.summoner.tokenID, d2.summoner.tokenID);
    case SortBy.CHAR_ID_HIGH_TO_LOW:
      return (d1: SummonerData, d2: SummonerData) => compareBigNumbers(d2.summoner.tokenID, d1.summoner.tokenID);
    case SortBy.ATTR_LV:
      return (d1: SummonerData, d2: SummonerData) => compareBigNumbers(d2.level, d1.level);
    case SortBy.ATTR_EXP:
      return (d1: SummonerData, d2: SummonerData) => compareBigNumbers(d2.xp, d1.xp);
    case SortBy.ATTR_STR:
      return (d1: SummonerData, d2: SummonerData) => (d2.abilityScore?.strength || 0) - (d1.abilityScore?.strength || 0);
    case SortBy.ATTR_CON:
      return (d1: SummonerData, d2: SummonerData) => (d2.abilityScore?.constitution || 0) - (d1.abilityScore?.constitution || 0);
    case SortBy.ATTR_DEX:
      return (d1: SummonerData, d2: SummonerData) => (d2.abilityScore?.dexterity || 0) - (d1.abilityScore?.dexterity || 0);
    case SortBy.ATTR_INT:
      return (d1: SummonerData, d2: SummonerData) => (d2.abilityScore?.intelligence || 0) - (d1.abilityScore?.intelligence || 0);
    case SortBy.ATTR_WIS:
      return (d1: SummonerData, d2: SummonerData) => (d2.abilityScore?.wisdom || 0) - (d1.abilityScore?.wisdom || 0);
    case SortBy.ATTR_CHA:
      return (d1: SummonerData, d2: SummonerData) => (d2.abilityScore?.charisma || 0) - (d1.abilityScore?.charisma || 0);
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
