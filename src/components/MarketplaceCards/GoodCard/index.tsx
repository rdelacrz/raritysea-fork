import { Fragment, FunctionComponent, useState } from 'react';
import classNames from 'classnames';
import { BigNumber } from '@ethersproject/bignumber';
import { Backdrop, Button, IconButton } from '@material-ui/core';
import { InfoRounded, ShoppingCart } from '@material-ui/icons';
import { MarketplaceItemCard } from '@layouts';
import { CraftedItemData, Good } from '@models';

import './styles.scss';

interface GoodCardProps {
  className?: string;
  good: CraftedItemData<Good>;
  onPurchase?: (good: CraftedItemData<Good>) => void;
}

export const GoodCard: FunctionComponent<GoodCardProps> = (props) => {
  /* State variables */
  const [showDesc, setShowDesc] = useState(false);

  /* Functions */

  const handlePurchase = () => {
    if (props.onPurchase) {
      props.onPurchase(props.good);
    }
  }

  /* Regular variables */

  const goodId = props.good.listId.toString();
  const goodTypeId = props.good.itemAttributes.id?.toString();

  const divisor = BigNumber.from('1000000000000000000');

  const price = props.good.price ? BigNumber.from(props.good.price).div(divisor)?.toString() : undefined;

  const valuePairs = [
    { name: 'Weight', value: props.good.itemAttributes.weight.toString() },
  ];

  return (
    <MarketplaceItemCard className={classNames('good-card-wrapper', props.className)}
      itemName={props.good.itemAttributes.name}
      itemId={goodId}
      priceText={price}
      currencyType='FTM'
      valuePairs={valuePairs}
      topElement={props.good.itemAttributes.description && (
        <Fragment>
          <IconButton className='description-button' title='Description' onClick={() => setShowDesc(true)}>
            <InfoRounded className='description-icon' />
          </IconButton>
          <Backdrop className='description-backdrop' open={showDesc} onClick={() => setShowDesc(false)}>
            <h2 className='description-header'>{props.good.itemAttributes.name} Description</h2>
            <div className='description-text'>
              {props.good.itemAttributes.description}
            </div>
            <div className='close-button-row'>
              <Button className='close-button' variant='contained' onClick={() => setShowDesc(false)}>
                Close
              </Button>
            </div>
          </Backdrop>
        </Fragment>
      )}
      bottomElement={(
        <Button id={`purchaseGood_${goodId}`} className='purchase-button' variant='contained'
            startIcon={<ShoppingCart />} onClick={handlePurchase}>
          Purchase
        </Button>
      )}
    />
  );
}
