import { Fragment, FunctionComponent, useState } from 'react';
import classNames from 'classnames';
import { BigNumber } from '@ethersproject/bignumber';
import { Backdrop, Button, IconButton } from '@material-ui/core';
import { InfoRounded, ShoppingCart } from '@material-ui/icons';
import { MarketplaceItemCard } from '@layouts';
import { Armor, CraftedItemData } from '@models';

import './styles.scss';

interface ArmorCardProps {
  className?: string;
  armor: CraftedItemData<Armor>;
  onPurchase?: (armor: CraftedItemData<Armor>) => void;
}

export const ArmorCard: FunctionComponent<ArmorCardProps> = (props) => {
  /* State variables */
  const [showDesc, setShowDesc] = useState(false);

  /* Functions */

  const handlePurchase = () => {
    if (props.onPurchase) {
      props.onPurchase(props.armor);
    }
  }

  /* Regular variables */

  const armorId = props.armor.listId.toString();
  //const summonerClassSrc = props.summonerData.class ? ClassImageMap[classId] : null;
  //const summonerClassName = props.summonerData.class ? ClassMap[classId] : '';

  const armorTypeId = props.armor.itemAttributes.id?.toString();

  const divisor = BigNumber.from('1000000000000000000');

  const price = props.armor.price ? BigNumber.from(props.armor.price).div(divisor)?.toString() : undefined;

  const valuePairs = [
    { name: 'Armor Bonus', value:  props.armor.itemAttributes.armor_bonus?.toString() },
    { name: 'Max Dex Bonus', value: props.armor.itemAttributes.max_dex_bonus.toString() },
    { name: 'Penalty', value: props.armor.itemAttributes.penalty.toString() },
    { name: 'Spell Failure', value: props.armor.itemAttributes.spell_failure.toString() },
    { name: 'Weight', value: props.armor.itemAttributes.weight.toString() },
  ];

  return (
    <MarketplaceItemCard className={classNames('armor-card-wrapper', props.className)}
      itemName={props.armor.itemAttributes.name}
      itemId={armorId}
      priceText={price}
      currencyType='FTM'
      valuePairs={valuePairs}
      topElement={props.armor.itemAttributes.description && (
        <Fragment>
          <IconButton className='description-button' title='Description' onClick={() => setShowDesc(true)}>
            <InfoRounded className='description-icon' />
          </IconButton>
          <Backdrop className='description-backdrop' open={showDesc} onClick={() => setShowDesc(false)}>
            <h2 className='description-header'>{props.armor.itemAttributes.name} Description</h2>
            <div className='description-text'>
              {props.armor.itemAttributes.description}
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
        <Button id={`purchaseArmor_${armorId}`} className='purchase-button' variant='contained'
            startIcon={<ShoppingCart />} onClick={handlePurchase}>
          Purchase
        </Button>
      )}
    />
  );
}
