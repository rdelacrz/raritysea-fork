import { FunctionComponent, useCallback, useEffect } from 'react';
import classNames from 'classnames';
import { Web3Provider } from '@ethersproject/providers';
import { Button } from '@material-ui/core';
import Icon from '@mdi/react';
import { mdiWalletPlusOutline } from '@mdi/js';
import { useWeb3React } from '@web3-react/core';
import { checkWalletConnection, injectedConnector, truncateAddress } from '@utilities';

import './styles.scss';

interface ConnectWalletProps {
  className?: string;
}

export const ConnectWallet: FunctionComponent<ConnectWalletProps> = (props) => {
  // Gets Web3 attributes
  const { account, activate, active, error } = useWeb3React<Web3Provider>();

  useEffect(() => {
    // Error message: request of type 'wallet_requestPermissions' already pending for origin
    if (error && error['code'] === -32002) {
      console.error('Wallet permissions have already been requested. Please complete wallet authentication, then try again.');
    }
  }, [error]);

  // Automatically reconnects to wallet if previously authenticated
  useEffect(() => {
    checkWalletConnection(existingAddresses => {
      if ((existingAddresses || []).length > 0 && !active) {
        activate(injectedConnector);
      }
    });
  }, [active]);

  const handleConnectionClick = useCallback(() => {
    if (typeof window !== 'undefined') {
      activate(injectedConnector);
    }
  }, [activate]);

  return (
    <div className={classNames('connect-wallet-wrapper', props.className)}>
      {account ? (
        <div id='walletAddress'>{truncateAddress(account)}</div>
      ) : (
        <Button id='connectWalletBtn'
          onClick={handleConnectionClick}
          startIcon={
            <Icon path={mdiWalletPlusOutline}
              size={1}
              horizontal
              vertical
              rotate={180}
              color='white'
            />
          }
        >
          Connect Wallet
        </Button>
      )}
    </div>
  );
}
