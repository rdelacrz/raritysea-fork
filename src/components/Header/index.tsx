import React, { FunctionComponent, useCallback, useState } from 'react';
import { AppBar, Toolbar } from '@material-ui/core';

import './styles.scss';

interface PageProps {
  className?: string;
  pageContentClassName?: string;
}

export const Header: FunctionComponent<PageProps> = (props) => {
  return (
    <AppBar color='primary'>
      <Toolbar>
        DEGEN
      </Toolbar>
    </AppBar>
  );
}
