import { FunctionComponent, useEffect, useMemo, useState } from 'react';
import { useQueryClient } from 'react-query'
import { Button, FormControl, Grid, MenuItem, Select } from '@material-ui/core';
import { Refresh } from '@material-ui/icons';
import { LoadingProgress, Pagination, SummonerCard } from '@components';
import { Page } from '@layouts';
import { SummonerData } from '@models';
import { ClassMap, getSummonerComparer, PAGE_SIZE, SortBy, SummonerClass, SummonerClassList, useSummonerDataList } from '@utilities';

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
  const queryClient = useQueryClient();

  /* Functions */

  const refreshSummoners = () => {
    queryClient.invalidateQueries('getAllSummoners');
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
      <h2 className='page-header'>Order List</h2>
      <div className='refresh-button-row'>
        <Button id='refreshSummonersBtn' color='secondary' variant='contained' startIcon={<Refresh />}
            onClick={refreshSummoners}>
          Refresh
        </Button>
      </div>

      <div className='dropdown-row-wrapper'>
        <FormControl className='dropdown-form-field'>
          <Select id='summonerClassDropdown' color='secondary' variant='outlined'
              value={summonerClass} onChange={e => handleSummonerClassChange(e.target.value)}>
            {SummonerClassList.map(summonerClassItem => (
              <MenuItem value={summonerClassItem}>
                {summonerClassItem === SummonerClass.ALL ? 'All Jobs' : `Job : ${ClassMap[summonerClassItem]}`}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl className='dropdown-form-field'>
          <Select id='sortByDropdown' color='secondary' variant='outlined'
              value={sortBy} onChange={e => handleSortByChange(e.target.value)}>
            <MenuItem value={SortBy.PRICE_LOW_TO_HIGH}>
              Price : Low to High
            </MenuItem>
            <MenuItem value={SortBy.PRICE_HIGH_TO_LOW}>
              Price : High to Low
            </MenuItem>
            <MenuItem value={SortBy.CHAR_ID_LOW_TO_HIGH}>
              Character ID : Low to High
            </MenuItem>
            <MenuItem value={SortBy.CHAR_ID_HIGH_TO_LOW}>
              Character ID : High to Low
            </MenuItem>
            <MenuItem value={SortBy.ATTR_LV}>
              Attribute: LV
            </MenuItem>
            <MenuItem value={SortBy.ATTR_EXP}>
              Attribute: EXP
            </MenuItem>
            <MenuItem value={SortBy.ATTR_STR}>
              Attribute: STR
            </MenuItem>
            <MenuItem value={SortBy.ATTR_CON}>
              Attribute: CON
            </MenuItem>
            <MenuItem value={SortBy.ATTR_DEX}>
              Attribute: DEX
            </MenuItem>
            <MenuItem value={SortBy.ATTR_INT}>
              Attribute: INT
            </MenuItem>
            <MenuItem value={SortBy.ATTR_WIS}>
              Attribute: WIS
            </MenuItem>
            <MenuItem value={SortBy.ATTR_CHA}>
              Attribute: CHA
            </MenuItem>
          </Select>
        </FormControl>
      </div>

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
