import { providers, Signer } from 'ethers';
import { Contract } from '@ethersproject/contracts';
import {
  attributesContractAddress, attributesContractAbi, compatibleRPCUrl, rarityContractAddress, rarityContractAbi,
  summonersContractAbi, summonersContractAddress
} from './constants';

export const summonersContractFetcher = <T>(method: string, ...args: any[]): Promise<T> => {
  const provider = new providers.JsonRpcProvider(compatibleRPCUrl);
  const contract = new Contract(summonersContractAddress, summonersContractAbi, provider);
  return contract[method](...args);
}

export const summonersContractFetcherWithSigner = <T>(signer: Signer, method: string, ...args: any[]): Promise<T> => {
  const contract = new Contract(summonersContractAddress, summonersContractAbi, signer);
  return contract[method](...args);
}

export const attributesContractFetcher = <T>(method: string, ...args: any[]): Promise<T> => {
  const provider = new providers.JsonRpcProvider(compatibleRPCUrl);
  const contract = new Contract(attributesContractAddress, attributesContractAbi, provider);
  return contract[method](...args);
}

export const rarityContractFetcher = <T>(method: string, ...args: any[]): Promise<T> => {
  const provider = new providers.JsonRpcProvider(compatibleRPCUrl);
  const contract = new Contract(rarityContractAddress, rarityContractAbi, provider);
  return contract[method](...args);
}
