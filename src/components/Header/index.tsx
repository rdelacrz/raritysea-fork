import React, { FunctionComponent } from 'react';
import classNames from 'classnames';
import { useLocation } from 'react-router';
import { AppBar, Container, Tab, Tabs, Toolbar, Typography } from '@material-ui/core';
import { ConnectWallet } from './ConnectWallet';

import './styles.scss';

interface HeaderProps {
  className?: string;
}

export const Header: FunctionComponent<HeaderProps> = (props) => {
  const location = useLocation();
  return (
    <AppBar className={classNames('header-wrapper', props.className)}>
      <Toolbar className='toolbar-wrapper'>
        <Typography className='app-name' variant='h4' component='h1'>Scarcity</Typography>
        <ConnectWallet />
      </Toolbar>
      <Container maxWidth='lg'>
        <Tabs className='tabs-wrapper' value={location.pathname} variant='scrollable' scrollButtons='auto'>
          <Tab label='Marketplace' value='/' />
          <Tab label='Balance' value='/balance' />
          <Tab label='Collection' value='/collection' />
          <Tab label='My Orders' value='/orders' />
        </Tabs>
      </Container>
    </AppBar>
  );
}
