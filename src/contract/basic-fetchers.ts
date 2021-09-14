import { providers } from 'ethers';
import { Contract } from '@ethersproject/contracts';
import {
  attributesContractAddress, attributesContractAbi, compatibleRPCUrl, summonersContractAbi, summonersContractAddress
} from './constants';

export const summonersContractFetcher = <T>(method: string, ...args: any[]): Promise<T> => {
  const provider = new providers.JsonRpcProvider(compatibleRPCUrl);
  const contract = new Contract(summonersContractAddress, summonersContractAbi, provider);
  return contract[method](...args);
}

export const attributesContractFetcher = <T>(method: string, ...args: any[]): Promise<T> => {
  const provider = new providers.JsonRpcProvider(compatibleRPCUrl);
  const contract = new Contract(attributesContractAddress, attributesContractAbi, provider);
  return contract[method](...args);
}
