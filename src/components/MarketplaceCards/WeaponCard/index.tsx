import { Fragment, FunctionComponent, useState } from 'react';
import classNames from 'classnames';
import { BigNumber } from '@ethersproject/bignumber';
import { Backdrop, Button, IconButton } from '@material-ui/core';
import { InfoRounded, ShoppingCart } from '@material-ui/icons';
import { MarketplaceItemCard } from '@layouts';
import { CraftedItemData, Weapon } from '@models';

import './styles.scss';

interface WeaponCardProps {
  className?: string;
  weapon: CraftedItemData<Weapon>;
  onPurchase?: (weapon: CraftedItemData<Weapon>) => void;
}

const formatBigNumberValue = (bigNumber?: BigNumber, decimalInsertionFromRight = 18) => {
  if (bigNumber !== undefined) {
    let numStr = bigNumber.toString();
    const insertDecimalIndex = numStr.length >= decimalInsertionFromRight ? numStr.length - decimalInsertionFromRight : numStr.length;
    if (insertDecimalIndex === numStr.length) {
      return `${numStr}.0`;
    } else {
      numStr = numStr.slice(0, insertDecimalIndex) + '.' + numStr.slice(insertDecimalIndex);

      // Removes trailing zeros
      while (numStr[numStr.length - 1] === '0' && numStr[numStr.length - 2] !== '.') {
        numStr = numStr.slice(0, numStr.length - 1);
      }

      return numStr;
    }
  }
  return undefined;
}

export const WeaponCard: FunctionComponent<WeaponCardProps> = (props) => {
  /* State variables */
  const [showDesc, setShowDesc] = useState(false);

  /* Functions */

  const handlePurchase = () => {
    if (props.onPurchase) {
      props.onPurchase(props.weapon);
    }
  }

  /* Regular variables */

  const weaponId = props.weapon.itemAttributes.id.toString();
  //const summonerClassSrc = props.summonerData.class ? ClassImageMap[classId] : null;
  //const summonerClassName = props.summonerData.class ? ClassMap[classId] : '';

  const itemId = props.weapon.itemAttributes.id?.toString();

  const divisor = BigNumber.from('1000000000000000000');

  const price = props.weapon.price ? BigNumber.from(props.weapon.price).div(divisor)?.toString() : undefined;

  const valuePairs = [
    { name: 'Damage', value:  props.weapon.itemAttributes.damage?.toString() },
    { name: 'Critical', value: props.weapon.itemAttributes.critical.toString() },
    { name: 'Critical Mod', value: props.weapon.itemAttributes.critical_modifier.toString() },
    { name: 'Range Inc', value: props.weapon.itemAttributes.range_increment.toString() },
    { name: 'Proficiency', value: props.weapon.itemAttributes.proficiency.toString() },
    { name: 'Encumbrence', value: props.weapon.itemAttributes.encumbrance.toString() },
    { name: 'Damage Type', value: props.weapon.itemAttributes.damage_type.toString() },
    { name: 'Weight', value: props.weapon.itemAttributes.weight.toString() },
  ];

  return (
    <MarketplaceItemCard className={classNames('weapon-card-wrapper', props.className)}
      itemName={props.weapon.itemAttributes.name}
      itemId={itemId}
      priceText={price}
      currencyType='FTM'
      valuePairs={valuePairs}
      topElement={(
        <Fragment>
          <IconButton className='description-button' title='Description' onClick={() => setShowDesc(true)}>
            <InfoRounded className='description-icon' />
          </IconButton>
          <Backdrop className='description-backdrop' open={showDesc} onClick={() => setShowDesc(false)}>
            <h2 className='description-header'>{props.weapon.itemAttributes.name} Description (#{itemId})</h2>
            <div className='description-text'>{props.weapon.itemAttributes.description}</div>
            <div className='close-button-row'>
              <Button className='close-button' variant='contained' onClick={() => setShowDesc(false)}>
                Close
              </Button>
            </div>
          </Backdrop>
        </Fragment>
      )}
      bottomElement={(
        <Button id={`purchaseWeapon_${itemId}`} className='purchase-button' variant='contained'
            startIcon={<ShoppingCart />} onClick={handlePurchase}>
          Purchase
        </Button>
      )}
    />
  );
}
