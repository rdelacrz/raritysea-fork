import React, { FunctionComponent } from 'react';
import classNames from 'classnames';
import { Footer, Header } from '@components';

import './styles.scss';

interface PageProps {
  className?: string;
  pageContentClassName?: string;
}

export const Page: FunctionComponent<PageProps> = (props) => {
  return (
    <div className={classNames('page-layout-wrapper', props.className)}>
      <Header />
      <main className={classNames('page-content-wrapper', props.pageContentClassName)}>
        {props.children}
      </main>
      <Footer />
    </div>
  );
}
