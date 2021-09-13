import React, { FunctionComponent, useCallback, useEffect, useState } from 'react';
import classNames from 'classnames';
import { Button } from '@material-ui/core';
import Icon from '@mdi/react';
import { mdiWalletPlusOutline } from '@mdi/js';
import { useWeb3React } from '@web3-react/core';
import { injectedConnector, truncateAddress } from '@utilities';

import './styles.scss';

interface ConnectWalletProps {
  className?: string;
}

export const ConnectWallet: FunctionComponent<ConnectWalletProps> = (props) => {
  // Gets Web3 attributes
  const { activate, error } = useWeb3React();
  const [address, setAddress] = useState('');

  const web3 = window['web3'];

  useEffect(() => {
    // Error message: request of type 'wallet_requestPermissions' already pending for origin
    if (error && error['code'] === -32002) {
      console.error('Wallet permissions have already been requested. Please complete wallet authentication, then try again.');
    }
  }, [error]);

  useEffect(() => {
    if (web3?.currentProvider) {
      setAddress(web3.currentProvider.selectedAddress);
    }
  }, [address, web3?.currentProvider]);

  const handleConnectionClick = useCallback(() => {
    if (typeof window !== 'undefined') {
      activate(injectedConnector);
    }
  }, [activate]);

  return (
    <div className={classNames('connect-wallet-wrapper', props.className)}>
      {address ? (
        <Button id='walletAddressBtn' variant='contained'>
          {truncateAddress(address)}
        </Button>
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