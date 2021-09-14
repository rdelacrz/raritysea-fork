import React, { FunctionComponent, useEffect, useState } from 'react';
import { attributesContractFetcher } from '@contract';
import { Page } from '@layouts';
import { AbilityScore, Summoner } from '@models';
import { compareBigNumbers, SortBy, useAbilityScores, useGetAllSummoners} from '@utilities';

import './styles.scss';

interface PageProps {
  className?: string;
}

export const HomePage: FunctionComponent<PageProps> = (props) => {
  const { data: summonerData, isSuccess } = useGetAllSummoners();
  const [summoners, setSummoners] = useState<Summoner[]>([]);
  const [sortBy, setSortBy] = useState<SortBy>(SortBy.PRICE_HIGH_TO_LOW);

  // Gets ability scores based on summoners
  const { data: abilityScores } = useAbilityScores();
  console.log(abilityScores)

  /**
   * Returns compare function that sorts summoners in a list based on current sortBy method.
   *
   * @returns Compare function that accepts two items and returns integer based on sorting results.
   */
  const getSummonerComparer = () => {
    switch (sortBy) {
      case SortBy.PRICE_LOW_TO_HIGH:
        return (d1: Summoner, d2: Summoner) => compareBigNumbers(d1.price, d2.price);
      case SortBy.PRICE_HIGH_TO_LOW:
        return (d1: Summoner, d2: Summoner) => compareBigNumbers(d2.price, d1.price);
      case SortBy.CHAR_ID_LOW_TO_HIGH:
        return (d1: Summoner, d2: Summoner) => compareBigNumbers(d1.tokenID, d2.tokenID);
      case SortBy.CHAR_ID_HIGH_TO_LOW:
        return (d1: Summoner, d2: Summoner) => compareBigNumbers(d2.tokenID, d1.tokenID);
      default:
        return undefined;
    }
  }

  // Queries summoner data and sets it locally with given ordering
  useEffect(() => {
    if (isSuccess && summonerData) {
      const compareFn = getSummonerComparer();
      const initialOrdering = summonerData
        .filter(d => d.status === 0)
        .sort(compareFn);
      setSummoners(initialOrdering);
    }
  }, [summonerData, isSuccess]);

  return (
    <Page className='home-page-wrapper'>
      Home
    </Page>
  );
}
