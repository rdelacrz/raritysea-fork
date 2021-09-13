import React, { FunctionComponent } from 'react';
import classNames from 'classnames';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { ConnectWallet } from './ConnectWallet';

import './styles.scss';

interface HeaderProps {
  className?: string;
}

export const Header: FunctionComponent<HeaderProps> = (props) => {
  return (
    <AppBar className={classNames('header-wrapper', props.className)} color='primary'>
      <Toolbar className='toolbar-wrapper'>
        <Typography className='app-name' variant='h4' component='h1'>DEGEN</Typography>
        <ConnectWallet />
      </Toolbar>
    </AppBar>
  );
}
