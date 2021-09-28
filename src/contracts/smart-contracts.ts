import { providers, Signer } from 'ethers';
import { Contract, Provider } from 'ethcall';
import Web3 from 'web3';
import {
  armorContractAddress, armorContractAbi, attributesContractAddress, attributesContractAbi,
  compatibleRPCUrl, craftingContractAddress, craftingContractAbi,
  craftingMarketContractAddress, craftingMarketContractAbi,
  goldContractAddress, goldContractAbi, goodsContractAddress, goodsContractAbi,
  rarityContractAddress, rarityContractAbi, skillsContractAddress, skillsContractAbi,
  summonersMarketContractAbi, summonersMarketContractAddress, weaponsContractAddress, weaponsContractAbi
} from './constants';

// Provider for executing contract calls
const compatibleProvider = new Provider();
compatibleProvider.init(new providers.JsonRpcProvider(compatibleRPCUrl));

export const provider = compatibleProvider;

export const summonersMarketContract = new Contract(summonersMarketContractAddress, summonersMarketContractAbi);

export const attributesContract = new Contract(attributesContractAddress, attributesContractAbi);

export const rarityContract = new Contract(rarityContractAddress, rarityContractAbi);

export const goldContract = new Contract(goldContractAddress, goldContractAbi);

export const skillsContract = new Contract(skillsContractAddress, skillsContractAbi);

export const craftingContract = new Contract(craftingContractAddress, craftingContractAbi);

export const craftingMarketContract = new Contract(craftingMarketContractAddress, craftingMarketContractAbi);

export const armorContract = new Contract(armorContractAddress, armorContractAbi);

export const goodsContract = new Contract(goodsContractAddress, goodsContractAbi);

export const weaponsContract = new Contract(weaponsContractAddress, weaponsContractAbi);

// Alternative skills contract defined using web3
const web3 = new Web3(new Web3.providers.HttpProvider(compatibleRPCUrl));
export const skillsContractAlt = new web3.eth.Contract(skillsContractAbi as any, skillsContractAddress);

export const summonersContractFetcherWithSigner = <T>(method: string, ...args: any[]): Promise<T> => {
  const contract = new Contract(summonersMarketContractAddress, summonersMarketContractAbi);
  return contract[method](...args);
}