import { FunctionComponent, useEffect, useMemo, useState } from 'react';
import { Grid } from '@material-ui/core';
import { LoadingProgress, Pagination, SummonerCard } from '@components';
import { Page } from '@layouts';
import { SummonerData } from '@models';
import { getSummonerComparer, PAGE_SIZE, SortBy, SummonerClass, useSummonerDataList } from '@utilities';

import './styles.scss';

interface PageProps {
  className?: string;
}

export const HomePage: FunctionComponent<PageProps> = (props) => {
  /* State variables */
  const [summoners, setSummoners] = useState<SummonerData[]>([]);
  const [summonerClass, setSummonerClass] = useState<SummonerClass>(SummonerClass.ALL);
  const [sortBy, setSortBy] = useState<SortBy>(SortBy.PRICE_HIGH_TO_LOW);
  const [pageIndex, setPageIndex] = useState<number>(0);

  const { summonerDataList, partiallyLoaded } = useSummonerDataList();

  /* Functions */

  // Queries summoner data and sets it locally with given ordering
  useEffect(() => {
    if (summonerDataList.length > 0) {
      setSummoners(summonerDataList);
    }
  }, [summonerDataList]);

  /* Calculated variables */

  // Applies sort
  const sortedSummoners = useMemo(() => {
    const compareFn = getSummonerComparer(sortBy);
    return summoners.sort(compareFn);
  }, [summoners, sortBy]);

  // Applies filter
  const filteredSummoners = useMemo(() => {
    if (summonerClass === SummonerClass.ALL) {
      return sortedSummoners;
    }

    // Applies summoner class filter
    return sortedSummoners.filter(s => s.class.toNumber() === summonerClass);
  }, [sortedSummoners, summonerClass]);

  // Determines pagination values based on page index and size
  const startIndex = pageIndex * PAGE_SIZE;
  const pageCount = Math.ceil(filteredSummoners.length / PAGE_SIZE);

  // Applies pagination
  const paginatedSummoners = useMemo(() => {
    if (startIndex >= filteredSummoners.length) {
      return filteredSummoners;
    }

    return filteredSummoners.slice(startIndex, startIndex + PAGE_SIZE);
  }, [filteredSummoners, startIndex]);

  return (
    <Page className='home-page-wrapper'>
      {!partiallyLoaded ? (
        <LoadingProgress />
      ) : (
        <div className='summoner-display-wrapper'>
          <Grid className='summoners-grid-wrapper' container spacing={3}>
            {paginatedSummoners.map((summonerData, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <SummonerCard summonerData={summonerData} />
              </Grid>
            ))}
            </Grid>
            <Pagination currentIndex={pageIndex} pageCount={pageCount} onPageChange={setPageIndex} />
        </div>
      )}
    </Page>
  );
}
