import { Fragment, FunctionComponent, useState } from 'react';
import classNames from 'classnames';
import { BigNumber } from '@ethersproject/bignumber';
import { Backdrop, Button, Grid, IconButton } from '@material-ui/core';
import { BuildRounded, ShoppingCart } from '@material-ui/icons';
import { MarketplaceItemCard } from '@layouts';
import { ClassSkillSet, Summoner, SummonerData } from '@models';
import { ClassMap, ClassImageMap } from '@utilities';

import './styles.scss';

interface SummonerCardProps {
  className?: string;
  summonerData: SummonerData;
  classSkillSet: ClassSkillSet[];
  onPurchase?: (summoner: SummonerData) => void;
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

const BASE_STAT = 8;

export const SummonerCard: FunctionComponent<SummonerCardProps> = (props) => {
  /* State variables */
  const [showSkills, setShowSkills] = useState(false);

  /* Functions */

  const handlePurchase = () => {
    if (props.onPurchase) {
      props.onPurchase(props.summonerData);
    }
  }

  /* Regular variables */

  const classId = parseInt(props.summonerData.class?.toString() || '0', 10);
  const summonerClassSrc = props.summonerData.class ? ClassImageMap[classId] : null;
  const summonerClassName = props.summonerData.class ? ClassMap[classId] : '';

  const tokenId = props.summonerData.id?.toString();

  const divisor = BigNumber.from('1000000000000000000');

  const price = props.summonerData.price ? BigNumber.from(props.summonerData.price).div(divisor)?.toString() : undefined;
  const gold = props.summonerData.gold ? BigNumber.from(props.summonerData.gold).div(divisor).toBigInt()?.toLocaleString() : undefined;

  // Base stat 8 is added to all attributes
  const valuePairs = [
    { name: 'LV', value: props.summonerData.level?.toString() },
    { name: 'EXP', value: formatBigNumberValue(props.summonerData.xp) },
    { name: 'STR', value: (props.summonerData.abilityScore?.strength || 0) + BASE_STAT },
    { name: 'CON', value: (props.summonerData.abilityScore?.constitution || 0) + BASE_STAT },
    { name: 'DEX', value: (props.summonerData.abilityScore?.dexterity || 0) + BASE_STAT },
    { name: 'INT', value: (props.summonerData.abilityScore?.intelligence || 0) + BASE_STAT },
    { name: 'WIS', value: (props.summonerData.abilityScore?.wisdom || 0) + BASE_STAT },
    { name: 'CHA', value: (props.summonerData.abilityScore?.charisma || 0) + BASE_STAT },
    { name: 'Gold', value: gold },
  ];

  return (
    <MarketplaceItemCard className={classNames('summoner-card-wrapper', props.className)}
      itemName={summonerClassName}
      imageSrc={summonerClassSrc}
      itemId={tokenId}
      priceText={price}
      currencyType='FTM'
      valuePairs={valuePairs}
      topElement={(
        <Fragment>
          <IconButton className='skill-button' title='Skills' onClick={() => setShowSkills(true)}>
            <BuildRounded className='skill-icon' />
          </IconButton>
          <Backdrop className='skills-backdrop' open={showSkills} onClick={() => setShowSkills(false)}>
            <h2 className='skills-header'>#{tokenId} Skills</h2>
            <Grid className='skills-display-wrapper' container spacing={2}>
              {(props.summonerData.skills || []).map((skillValue, skillIndex) => (
                (props.classSkillSet || []).length > skillIndex && props.classSkillSet[skillIndex].active && (
                  <Grid className='skill-value' item xs={4} key={skillIndex}>
                    {props.classSkillSet[skillIndex].skillName}: {skillValue}
                  </Grid>
                )
              ))}
            </Grid>
            <div className='close-button-row'>
              <Button className='close-button' variant='contained' onClick={() => setShowSkills(false)}>
                Close
              </Button>
            </div>
          </Backdrop>
        </Fragment>
      )}
      bottomElement={(
        <Button id={`purchaseSummoner_${tokenId}`} className='purchase-button' variant='contained'
            startIcon={<ShoppingCart />} onClick={handlePurchase}>
          Purchase
        </Button>
      )}
    />
  );
}
