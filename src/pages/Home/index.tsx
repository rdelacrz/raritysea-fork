import { FunctionComponent, useEffect, useMemo, useState } from 'react';
import { useQueryClient } from 'react-query';
import { Button, Grid } from '@material-ui/core';
import { Refresh } from '@material-ui/icons';
import { DropdownField, SummonerDisplay } from '@components';
import { Page } from '@layouts';
import { Summoner, SummonerData } from '@models';
import {
  ClassMap, getSummonerComparer, PAGE_SIZE, SortBy, SortByDropdownList, SummonerClass, SummonerClassList,
  useBuySummoner, useClassSkills, useSummonerDataList
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

  /* Hook variables */
  const queryClient = useQueryClient();
  const { data: summonerDataList, isLoading, isFetched } = useSummonerDataList();
  const { data: classSkills } = useClassSkills();
  const buySummonerMutation = useBuySummoner();

  /* Functions */

  const refreshSummoners = async () => {
    await queryClient.cancelQueries('getSummonerDataList', { exact: true });
    await queryClient.resetQueries('getSummonerDataList', { exact: true });
  }

  const handleSummonerClassChange = (value: any) => {
    const classId = parseInt(value, 10) as SummonerClass;
    setSummonerClass(classId);
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
    if ((summonerDataList as SummonerData[] || []).length > 0 && isFetched) {
      setSummoners((summonerDataList as SummonerData[]).slice());
    }
  }, [summonerDataList]);

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

  // Shows loading progress if data is being loaded for first time or refreshed via refresh button
  const dataLoading = isLoading || !isFetched;

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

      <SummonerDisplay summonerDataList={filteredSummoners} classSkills={classSkills || []} dataLoading={dataLoading}
        onPurchase={handlePurchase}
      />
    </Page>
  );
}
