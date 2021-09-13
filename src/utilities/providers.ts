import { getDefaultProvider } from 'ethers';
import environment from '@environment';

export const provider = getDefaultProvider('homestead', {
  etherscan: environment.providerApiKey,
});
