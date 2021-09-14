/**
 * General-purpose functions that do not belong to any specific category go here.
 */

import { BigNumber } from '@ethersproject/bignumber';
import Web3 from 'web3';

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
