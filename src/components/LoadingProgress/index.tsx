import { FunctionComponent } from 'react';
import classNames from 'classnames';
import { CircularProgress } from '@material-ui/core';

import './styles.scss';

interface LoadingProgressProps {
  className?: string;
}

export const LoadingProgress: FunctionComponent<LoadingProgressProps> = (props) => {
  return (
    <div className={classNames('loading-progress-container', props.className)}>
      <CircularProgress />
    </div>
  );
}
