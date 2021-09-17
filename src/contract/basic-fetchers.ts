import { providers, Signer } from 'ethers';
import { Contract } from '@ethersproject/contracts';
import {
  attributesContractAddress, attributesContractAbi, compatibleRPCUrl, goldContractAddress, goldContractAbi,
  rarityContractAddress, rarityContractAbi, skillsContractAddress, skillsContractAbi, summonersContractAbi, summonersContractAddress
} from './constants';

export const compatibleProvider = new providers.JsonRpcProvider(compatibleRPCUrl);
compatibleProvider.pollingInterval = 500;

export const summonersContractFetcher = <T>(method: string, ...args: any[]): Promise<T> => {
  const contract = new Contract(summonersContractAddress, summonersContractAbi, compatibleProvider);
  return contract[method](...args);
}

export const summonersContractFetcherWithSigner = <T>(signer: Signer, method: string, ...args: any[]): Promise<T> => {
  const contract = new Contract(summonersContractAddress, summonersContractAbi, signer);
  return contract[method](...args);
}

export const attributesContractFetcher = <T>(method: string, ...args: any[]): Promise<T> => {
  const contract = new Contract(attributesContractAddress, attributesContractAbi, compatibleProvider);
  return contract[method](...args);
}

export const rarityContractFetcher = <T>(method: string, ...args: any[]): Promise<T> => {
  const contract = new Contract(rarityContractAddress, rarityContractAbi, compatibleProvider);
  return contract[method](...args);
}

export const goldContractFetcher = <T>(method: string, ...args: any[]): Promise<T> => {
  const contract = new Contract(goldContractAddress, goldContractAbi, compatibleProvider);
  return contract[method](...args);
}

export const skillsContractFetcher = <T>(method: string, ...args: any[]): Promise<T> => {
  const contract = new Contract(skillsContractAddress, skillsContractAbi, compatibleProvider);
  return contract[method](...args);
}
