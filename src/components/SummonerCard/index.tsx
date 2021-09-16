import { FunctionComponent } from 'react';
import classNames from 'classnames';
import { BigNumber } from '@ethersproject/bignumber';
import { Button, Card, Grid } from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
import { Summoner, SummonerData } from '@models';
import { ClassMap, ClassImageMap } from '@utilities';

import './styles.scss';

interface SummonerCardProps {
  className?: string;
  summonerData: SummonerData;
  onPurchase?: (summoner: Summoner) => void;
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

export const SummonerCard: FunctionComponent<SummonerCardProps> = (props) => {
  const summonerClassSrc = props.summonerData.class ? ClassImageMap[props.summonerData.class.toNumber()] : null;
  const summonerClassName = props.summonerData.class ? ClassMap[props.summonerData.class.toNumber()] : '';

  const tokenId = props.summonerData.summoner.tokenID?.toString();

  const divisor = BigNumber.from('1000000000000000000');

  const price = props.summonerData.summoner.price?.div(divisor)?.toString();

  const handlePurchase = () => {
    if (props.onPurchase) {
      props.onPurchase(props.summonerData.summoner);
    }
  }

  return (
    <Card className={classNames('summoner-card-wrapper', props.className)}>
      <div className='class-name'>{summonerClassName}</div>
      <div className='summoner-information-wrapper'>
        <div className='img-container'>
          <img src={summonerClassSrc} alt={`${summonerClassName} Image`} />
        </div>
        <div className='token-id'>#{tokenId}</div>
        <Grid className='attributes-grid' container>
          <Grid className='attribute-container' item xs={12} sm={6}>
            LV : {props.summonerData.level?.toString()}
          </Grid>
          <Grid className='attribute-container' item xs={12} sm={6}>
            EXP : {formatBigNumberValue(props.summonerData.xp)}
          </Grid>
          <Grid className='attribute-container' item xs={12} sm={6}>
            STR : {props.summonerData.abilityScore?.strength}
          </Grid>
          <Grid className='attribute-container' item xs={12} sm={6}>
            CON : {props.summonerData.abilityScore?.constitution}
          </Grid>
          <Grid className='attribute-container' item xs={12} sm={6}>
            DEX : {props.summonerData.abilityScore?.dexterity}
          </Grid>
          <Grid className='attribute-container' item xs={12} sm={6}>
            INT : {props.summonerData.abilityScore?.intelligence}
          </Grid>
          <Grid className='attribute-container' item xs={12} sm={6}>
            WIS : {props.summonerData.abilityScore?.wisdom}
          </Grid>
          <Grid className='attribute-container' item xs={12} sm={6}>
            CHA : {props.summonerData.abilityScore?.charisma}
          </Grid>
        </Grid>
        <div className='price-row'>
          Price: {price} FTM
        </div>
      </div>
      <Button id={`purchaseSummoner_${tokenId}`} className='purchase-button' variant='contained'
          startIcon={<ShoppingCart />} onClick={handlePurchase}>
        Purchase
      </Button>
    </Card>
  );
}
