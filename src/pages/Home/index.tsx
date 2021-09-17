import { FunctionComponent, useEffect, useMemo, useState } from 'react';
import { useQueryClient } from 'react-query';
import { Button, Grid } from '@material-ui/core';
import { Refresh } from '@material-ui/icons';
import { DropdownField, LoadingProgress, Pagination, SummonerCard } from '@components';
import { Page } from '@layouts';
import { Summoner, SummonerData } from '@models';
import {
  ClassMap, getSummonerComparer, PAGE_SIZE, SortBy, SortByDropdownList, SummonerClass, SummonerClassList,
  useBuySummoner, useSummonerDataList
} from '@utilities';

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
  const [queriesResetting, setQueriesResetting] = useState(false);
  const [pendingRefresh, setPendingRefresh] = useState(false);

  /* Hook variables */
  const queryClient = useQueryClient();
  const { summonerDataList, partiallyLoaded, partiallyFetched } = useSummonerDataList();
  const buySummonerMutation = useBuySummoner();

  /* Functions */

  const refreshSummoners = async () => {
    setQueriesResetting(true);
    await queryClient.cancelQueries('getAllSummoners', { exact: true });
    await queryClient.resetQueries('getAllSummoners', { exact: true });

    // Must be placed here after query reset, or else it will prematurely be set false due to partiallyFetched being true from previous fetch
    setPendingRefresh(true);
    setQueriesResetting(false);
  }

  const handleSummonerClassChange = (value: any) => {
    const classId = parseInt(value, 10) as SummonerClass;
    setSummonerClass(classId);
    setPageIndex(0);    // Filtering change will affect page count, so reset page index to avoid errors
  }

  const handleSortByChange = (value: any) => {
    const sortByValue = parseInt(value, 10) as SortBy;
    setSortBy(sortByValue);
  }

  const handlePurchase = (summoner: Summoner) => {
    buySummonerMutation.mutate({
      price: summoner.price,
      listId: summoner.listId,
    });
  }

  // Queries summoner data and sets it locally with given ordering
  useEffect(() => {
    if (summonerDataList.length > 0) {
      setSummoners(summonerDataList.slice());
    }
  }, [summonerDataList]);

  // Once data is partially refetched (summoner data pulled, some attributes loaded), concludes refresh
  useEffect(() => {
    if (pendingRefresh && partiallyFetched) {
      setPendingRefresh(false);
    }
  }, [pendingRefresh, partiallyFetched]);

  /* Calculated variables */

  // Applies sort
  const sortedSummoners = useMemo(() => {
    const compareFn = getSummonerComparer(sortBy);
    const summonersCopy = summoners.slice();
    summonersCopy.sort(compareFn);
    return summonersCopy;
  }, [summoners, sortBy]);

  // Applies filter
  const filteredSummoners = useMemo(() => {
    if (summonerClass === SummonerClass.ALL) {
      return sortedSummoners;
    }

    // Applies summoner class filter
    return sortedSummoners.filter(s => s.class?.toNumber() === summonerClass);
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

  // Shows loading progress if data is being loaded for first time or refreshed via refresh button
  const dataLoading = !partiallyLoaded || queriesResetting || pendingRefresh;

  // Sets up dropdown options
  const summonerClassOptions = SummonerClassList.map(summonerClassItem => {
    if (summonerClassItem === SummonerClass.ALL) {
      return { value: summonerClassItem, text: 'All Jobs' };
    } else {
      return { value: summonerClassItem, text: `Job : ${ClassMap[summonerClassItem]}` };
    }
  });
  const sortByOptions = SortByDropdownList.map((text, value) => ({ text, value }));

  return (
    <Page className='home-page-wrapper'>
      <h2 className='page-header'>Summoner Marketplace</h2>
      <div className='refresh-button-row'>
        <Button id='refreshSummonersBtn' color='secondary' variant='contained' startIcon={<Refresh />}
            disabled={dataLoading} onClick={refreshSummoners}>
          Refresh
        </Button>
      </div>

      <div className='dropdown-row-wrapper'>
        <Grid className='dropdown-grid-wrapper' container spacing={3}>
          <Grid item xs={12} sm={6}>
            <DropdownField id='summonerClassDropdown' label='Select Job' value={summonerClass} options={summonerClassOptions}
              onChange={handleSummonerClassChange} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <DropdownField id='sortByDropdown' label='Select Sort' value={sortBy} options={sortByOptions}
              onChange={handleSortByChange} />
          </Grid>
        </Grid>
      </div>

      {dataLoading ? (
        <LoadingProgress />
      ) : (
        <div className='summoner-display-wrapper'>
          <Grid className='summoners-grid-wrapper' container spacing={3}>
            {paginatedSummoners.map((summonerData, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <SummonerCard summonerData={summonerData} onPurchase={handlePurchase} />
              </Grid>
            ))}
            </Grid>
            <Pagination currentIndex={pageIndex} pageCount={pageCount} onPageChange={setPageIndex} />
        </div>
      )}
    </Page>
  );
}
