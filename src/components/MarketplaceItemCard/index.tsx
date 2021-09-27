import { FunctionComponent, ReactNode } from 'react';
import classNames from 'classnames';
import { Button, Card, Grid } from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';

import './styles.scss';

interface MarketplaceItemCardProps {
  className?: string;
  itemName: string;
  imageSrc?: any;
  itemId: string;
  valuePairs: { name: string, value?: any }[];
  priceText?: string;
  topElement?: ReactNode;
  bottomElement?: ReactNode;
}

export const MarketplaceItemCard: FunctionComponent<MarketplaceItemCardProps> = (props) => {
  return (
    <Card className={classNames('marketplace-item-card-wrapper', props.className)}>
      {props.topElement}
      <div className='item-name'>{props.itemName}</div>
      <div className='marketplace-item-information-wrapper'>
        <div className='img-container'>
          <img src={props.imageSrc} alt={props.itemName} />
        </div>
        <div className='item-id'>#{props.itemId}</div>
        <Grid className='attributes-grid' container>
          {props.valuePairs.map(pair => (
            <Grid className='attribute-container' item xs={6}>
              {pair.name} : {pair.value}
            </Grid>
          ))}
        </Grid>
        {props.priceText && (
          <div className='price-row'>
            Price: {props.priceText}
          </div>
        )}
      </div>
      {props.bottomElement}
    </Card>
  );
}
