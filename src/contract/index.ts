import { providers } from 'ethers';
import { Contract } from '@ethersproject/contracts';
import attributesAbi from './attributes-abi.json';
import summonersAbi from './summoners-abi.json';

// Contract only runs properly on the Fantom Opera network
export const compatibleChainId = 250;
export const compatibleRPCUrl = 'https://rpc.ftm.tools';

// Summoners contract information
export const summonersContractAddress = '0xE966c792B384ff4e82D13cc0C1Bd1D9C5FE68Fe4';
export const summonersContractAbi = summonersAbi;

// Attributes contract information
export const attributesContractAddress = '0xB5F5AF1087A8DA62A23b08C00C6ec9af21F397a1';
export const attributesContractAbi = attributesAbi;

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
