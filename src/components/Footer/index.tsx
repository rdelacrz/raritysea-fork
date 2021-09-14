import React, { FunctionComponent } from 'react';
import classNames from 'classnames';
import { Link } from '@material-ui/core';
import { summonersContractAddress } from '@contract';
import { generateFtmContractLink, truncateAddress } from '@utilities';

import './styles.scss';

interface FooterProps {
  className?: string;
}

export const Footer: FunctionComponent<FooterProps> = (props) => {
  const contractLink = generateFtmContractLink(summonersContractAddress);
  const truncatedContract = truncateAddress(summonersContractAddress, 6);
  return (
    <div className={classNames('footer-wrapper', props.className)}>
      <span className='footer-text'>Market Contract Address: </span>
      <Link id='contractAddressLink' href={contractLink} target='_blank' rel='noreferrer'>
        {truncatedContract}
      </Link>
      <p className='footer-text'>
        The character pictures are taken
        from <Link href='https://www.raritymanifested.com/' target='_blank' rel='noreferrer'>raritymanifested</Link>.
        The rights to all original pictures belong to their original authors.
        If there is anything wrong with any of them, please contact us as soon as possible in order to process changes and deletions.
      </p>
    </div>
  );
}
