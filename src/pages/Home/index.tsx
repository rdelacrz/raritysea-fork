import React, { FunctionComponent, useCallback, useState } from 'react';
import { Page } from '@layouts';

import './styles.scss';

interface PageProps {
  className?: string;
}

export const HomePage: FunctionComponent<PageProps> = (props) => {
  return (
    <Page className='home-page-wrapper'>
      Home
    </Page>
  );
}
