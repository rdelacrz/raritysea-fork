import { FunctionComponent, ReactNode } from 'react';
import classNames from 'classnames';
import NumberFormat from 'react-number-format';
import { Card, Grid } from '@material-ui/core';

import './styles.scss';

interface MarketplaceItemCardProps {
  className?: string;
  itemName: string;
  imageSrc?: any;
  itemId: string;
  itemDesc?: string;
  valuePairs: { name: string, value?: any }[];
  priceText?: string;
  currencyType?: string;
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
        <div className='item-desc'>{props.itemDesc}</div>
        <div className='item-id'>#{props.itemId}</div>
        <Grid className='attributes-grid' container>
          {props.valuePairs.map((pair, index) => (
            <Grid className='attribute-container' item xs={6} key={index}>
              {pair.name} : <NumberFormat value={pair.value} displayType='text' thousandSeparator />
            </Grid>
          ))}
        </Grid>
        {props.priceText && (
          <div className='price-row'>
            Price: <NumberFormat value={props.priceText} displayType='text' thousandSeparator /> {props.currencyType}
          </div>
        )}
      </div>
      {props.bottomElement}
    </Card>
  );
}
