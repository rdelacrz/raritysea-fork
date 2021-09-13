/**
 * General-purpose functions that do not belong to any specific category go here.
 */

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
