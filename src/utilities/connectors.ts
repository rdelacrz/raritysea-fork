/**
 * Connectors used to connect to an account on the Ethereum network should be set up here.
 */

import { InjectedConnector } from '@web3-react/injected-connector';

export const injectedConnector = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42],    // Supported by MetaMask by default
});
