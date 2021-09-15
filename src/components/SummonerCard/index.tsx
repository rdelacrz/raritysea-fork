import { FunctionComponent } from 'react';
import classNames from 'classnames';
import { Card, Grid } from '@material-ui/core';
import { SummonerData } from '@models';
import { ClassMap, ClassImageMap } from '@utilities';

import './styles.scss';

interface SummonerCardProps {
  className?: string;
  summonerData: SummonerData;
}

export const SummonerCard: FunctionComponent<SummonerCardProps> = (props) => {
  const summonerClassSrc = props.summonerData.class ? ClassImageMap[props.summonerData.class.toNumber()] : null;
  const summonerClassName = props.summonerData.class ? ClassMap[props.summonerData.class.toNumber()] : '';
  return (
    <Card className={classNames('summoner-card-wrapper', props.className)}>
      <div className='class-name'>{summonerClassName}</div>
      <div className='img-container'>
        <img src={summonerClassSrc} alt={`${summonerClassName} Image`} />
      </div>
      <div className='token-id'>#{props.summonerData.summoner.tokenID?.toString()}</div>
      <Grid className='attributes-grid' container>
        <Grid className='attribute-container' item xs={12} sm={6}>
          LV : {props.summonerData.level?.toString()}
        </Grid>
        <Grid className='attribute-container' item xs={12} sm={6}>
          EXP : {props.summonerData.xp?.toString()}
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
        Price: {props.summonerData.summoner.price?.toString()} FTM
      </div>
    </Card>
  );
}
