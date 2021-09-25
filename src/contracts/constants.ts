import attributesAbi from './abi/attributes-abi.json';
import goldAbi from './abi/gold-abi.json';
import rarityAbi from './abi/rarity-abi.json';
import skillsAbi from './abi/skills-abi.json';
import summonersAbi from './abi/summoners-abi.json';

// Contract only runs properly on the Fantom Opera network
export const compatibleChainId = 250;
export const compatibleRPCUrl = 'https://rpc.ftm.tools';

// Summoners contract information
export const summonersContractAddress = '0xE966c792B384ff4e82D13cc0C1Bd1D9C5FE68Fe4';
export const summonersContractAbi = summonersAbi;

// Attributes contract information
export const attributesContractAddress = '0xB5F5AF1087A8DA62A23b08C00C6ec9af21F397a1';
export const attributesContractAbi = attributesAbi;

// Rarity contract information
export const rarityContractAddress = '0xce761D788DF608BD21bdd59d6f4B54b2e27F25Bb';
export const rarityContractAbi = rarityAbi;

// Gold contract infomation
export const goldContractAddress = '0x2069B76Afe6b734Fb65D1d099E7ec64ee9CC76B2';
export const goldContractAbi = goldAbi;

// Skills contract information
export const skillsContractAddress = '0x51C0B29A1d84611373BA301706c6B4b72283C80F';
export const skillsContractAbi = skillsAbi;