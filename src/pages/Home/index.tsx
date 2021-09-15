import { FunctionComponent, useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import { LoadingProgress, SummonerCard } from '@components';
import { Page } from '@layouts';
import { SummonerData } from '@models';
import { compareBigNumbers, SortBy, useSummonerDataList} from '@utilities';

import './styles.scss';

interface PageProps {
  className?: string;
}

export const HomePage: FunctionComponent<PageProps> = (props) => {
  const { data: summonerDataList, isLoading, isSuccess } = useSummonerDataList();
  const [summoners, setSummoners] = useState<SummonerData[]>([]);
  const [sortBy, setSortBy] = useState<SortBy>(SortBy.PRICE_HIGH_TO_LOW);

  /**
   * Returns compare function that sorts summoners in a list based on current sortBy method.
   *
   * @returns Compare function that accepts two items and returns integer based on sorting results.
   */
  const getSummonerComparer = () => {
    switch (sortBy) {
      case SortBy.PRICE_LOW_TO_HIGH:
        return (d1: SummonerData, d2: SummonerData) => compareBigNumbers(d1.summoner.price, d2.summoner.price);
      case SortBy.PRICE_HIGH_TO_LOW:
        return (d1: SummonerData, d2: SummonerData) => compareBigNumbers(d2.summoner.price, d1.summoner.price);
      case SortBy.CHAR_ID_LOW_TO_HIGH:
        return (d1: SummonerData, d2: SummonerData) => compareBigNumbers(d1.summoner.tokenID, d2.summoner.tokenID);
      case SortBy.CHAR_ID_HIGH_TO_LOW:
        return (d1: SummonerData, d2: SummonerData) => compareBigNumbers(d2.summoner.tokenID, d1.summoner.tokenID);
      default:
        return undefined;
    }
  }

  // Queries summoner data and sets it locally with given ordering
  useEffect(() => {
    if (isSuccess && summonerDataList) {
      const compareFn = getSummonerComparer();
      const initialOrdering = summonerDataList.sort(compareFn);
      setSummoners(initialOrdering);
      console.log(initialOrdering)
    }
  }, [summonerDataList, isSuccess]);

  return (
    <Page className='home-page-wrapper'>
      {isLoading ? (
        <LoadingProgress />
      ) : (
        <Grid className='summoners-grid-wrapper' container spacing={3}>
          {summoners.map((summonerData, index) => (
            <Grid item xs={2} sm={3} md={4} key={index}>
              <SummonerCard summonerData={summonerData} />
            </Grid>
          ))}
        </Grid>
      )}
    </Page>
  );
}
