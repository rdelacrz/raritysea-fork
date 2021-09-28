import armorAbi from './abi/armor-abi.json';
import attributesAbi from './abi/attributes-abi.json';
import craftingAbi from './abi/crafting-abi.json';
import craftingMarketAbi from './abi/crafting-market-abi.json';
import goldAbi from './abi/gold-abi.json';
import goodsAbi from './abi/goods-abi.json';
import rarityAbi from './abi/rarity-abi.json';
import skillsAbi from './abi/skills-abi.json';
import summonersMarketAbi from './abi/summoners-market-abi.json';
import weaponsAbi from './abi/weapons-abi.json';

// Contract only runs properly on the Fantom Opera network
export const compatibleChainId = 250;
export const compatibleRPCUrl = 'https://rpc.ftm.tools';

// Summoners contract information
export const summonersMarketContractAddress = '0x0F9B8dD449A958563213Be539Ce13BF6a3751Bd3';
export const summonersMarketContractAbi = summonersMarketAbi;

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

// Crafting-related contracts
export const craftingContractAddress = '0xf41270836dF4Db1D28F7fd0935270e3A603e78cC';
export const craftingContractAbi = craftingAbi;

export const craftingMarketContractAddress = '0x4adEe474eA0A10E78376Ee5DFee7Be2A2A4CdDD0';
export const craftingMarketContractAbi = craftingMarketAbi;

export const armorContractAddress = '0xf5114A952Aca3e9055a52a87938efefc8BB7878C';
export const armorContractAbi = armorAbi;

export const goodsContractAddress = '0x0C5C1CC0A7AE65FE372fbb08FF16578De4b980f3';
export const goodsContractAbi = goodsAbi;

export const weaponsContractAddress = '0xeE1a2EA55945223404d73C0BbE57f540BBAAD0D8';
export const weaponsContractAbi = weaponsAbi;
