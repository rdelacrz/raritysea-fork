import React, { FunctionComponent, useCallback, useState } from 'react';
import { Header } from '@components';

import './styles.scss';

interface PageProps {
  className?: string;
  pageContentClassName?: string;
}

export const Page: FunctionComponent<PageProps> = (props) => {
  return (
    <div>
      <Header />
      {props.children}
    </div>
  );
}
