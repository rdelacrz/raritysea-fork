import { FunctionComponent, useState } from 'react';
import classNames from 'classnames';
import { BigNumber } from '@ethersproject/bignumber';
import { Backdrop, Button, Card, Grid, IconButton } from '@material-ui/core';
import { BuildRounded, ShoppingCart } from '@material-ui/icons';
import { ClassSkillSet, Summoner, SummonerData } from '@models';
import { ClassMap, ClassImageMap } from '@utilities';

import './styles.scss';

interface SummonerCardProps {
  className?: string;
  summonerData: SummonerData;
  classSkillSet: ClassSkillSet[];
  onPurchase?: (summoner: Summoner) => void;
}

const formatBigNumberValue = (bigNumber?: string, decimalInsertionFromRight = 18) => {
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
  /* State variables */
  const [showSkills, setShowSkills] = useState(false);

  /* Functions */

  const handlePurchase = () => {
    if (props.onPurchase) {
      props.onPurchase(props.summonerData.summoner);
    }
  }

  const toggleSkills = () => {
    setShowSkills(!showSkills);
  }

  /* Regular variables */

  const classId = parseInt(props.summonerData.class || '0', 10);
  const summonerClassSrc = props.summonerData.class ? ClassImageMap[classId] : null;
  const summonerClassName = props.summonerData.class ? ClassMap[classId] : '';

  const tokenId = props.summonerData.summoner.tokenID?.toString();

  const divisor = BigNumber.from('1000000000000000000');

  const price = props.summonerData.summoner.price ? BigNumber.from(props.summonerData.summoner.price).div(divisor)?.toString() : null;
  const gold = props.summonerData.gold ? BigNumber.from(props.summonerData.gold).div(divisor).toBigInt()?.toLocaleString() : null;


  return (
    <Card className={classNames('summoner-card-wrapper', props.className)}>
      <IconButton className='skill-button' title='Skills' onClick={toggleSkills}>
        <BuildRounded className='skill-icon' />
      </IconButton>
      <Backdrop className='skills-backdrop' open={showSkills} onClick={toggleSkills}>
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
            <Button className='close-button' variant='contained' onClick={toggleSkills}>Close</Button>
        </div>
      </Backdrop>

      <div className='class-name'>{summonerClassName}</div>
      <div className='summoner-information-wrapper'>
        <div className='img-container'>
          <img src={summonerClassSrc} alt={`${summonerClassName}`} />
        </div>
        <div className='token-id'>#{tokenId}</div>
        <Grid className='attributes-grid' container>
          <Grid className='attribute-container' item xs={6}>
            LV : {props.summonerData.level?.toString()}
          </Grid>
          <Grid className='attribute-container' item xs={6}>
            EXP : {formatBigNumberValue(props.summonerData.xp)}
          </Grid>
          <Grid className='attribute-container' item xs={6}>
            STR : {props.summonerData.abilityScore?.strength}
          </Grid>
          <Grid className='attribute-container' item xs={6}>
            CON : {props.summonerData.abilityScore?.constitution}
          </Grid>
          <Grid className='attribute-container' item xs={6}>
            DEX : {props.summonerData.abilityScore?.dexterity}
          </Grid>
          <Grid className='attribute-container' item xs={6}>
            INT : {props.summonerData.abilityScore?.intelligence}
          </Grid>
          <Grid className='attribute-container' item xs={6}>
            WIS : {props.summonerData.abilityScore?.wisdom}
          </Grid>
          <Grid className='attribute-container' item xs={6}>
            CHA : {props.summonerData.abilityScore?.charisma}
          </Grid>
          <Grid className='attribute-container' item xs={6}>
            Gold : {gold}
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
