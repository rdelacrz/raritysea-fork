
import { Contract as EthersContract } from '@ethersproject/contracts';
import { providers, Signer } from 'ethers';
import { Contract, Provider } from 'ethcall';
import Web3 from 'web3';
import {
  attributesContractAddress, attributesContractAbi, compatibleRPCUrl, goldContractAddress, goldContractAbi,
  rarityContractAddress, rarityContractAbi, skillsContractAddress, skillsContractAbi, summonersContractAbi, summonersContractAddress
} from './constants';

// Provider for executing contract calls
const compatibleProvider = new Provider();
compatibleProvider.init(new providers.JsonRpcProvider(compatibleRPCUrl));

export const provider = compatibleProvider;

export const summonersContract = new Contract(summonersContractAddress, summonersContractAbi);

export const summonersContractFetcherWithSigner = <T>(method: string, ...args: any[]): Promise<T> => {
  const contract = new Contract(summonersContractAddress, summonersContractAbi);
  return contract[method](...args);
}

export const attributesContract = new Contract(attributesContractAddress, attributesContractAbi);

export const rarityContract = new Contract(rarityContractAddress, rarityContractAbi);

export const goldContract = new Contract(goldContractAddress, goldContractAbi);

export const skillsContract = new Contract(skillsContractAddress, skillsContractAbi);

// Alternative skills contract defined using web3
const web3 = new Web3(new Web3.providers.HttpProvider(compatibleRPCUrl));
export const skillsContractAlt = new web3.eth.Contract(skillsContractAbi as any, skillsContractAddress);
