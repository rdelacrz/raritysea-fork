import { Fragment, FunctionComponent, useMemo, useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import { GoodCard, LoadingProgress, Pagination } from '@components';
import { CraftedItemData, Good } from '@models';
import { PAGE_SIZE } from '@utilities';

import './styles.scss';

interface ComponentProps {
  className?: string;
  dataLoading?: boolean;
  goodList: CraftedItemData<Good>[];
  onPurchase?: (good: CraftedItemData<Good>) => void;
}

export const GoodDisplay: FunctionComponent<ComponentProps> = (props) => {
  /* State variables */
  const [pageIndex, setPageIndex] = useState<number>(0);

  // Determines pagination values based on page index and size
  const startIndex = pageIndex * PAGE_SIZE;
  const pageCount = Math.ceil(props.goodList.length / PAGE_SIZE);

  // Applies pagination
  const paginatedGood = useMemo(() => {
    if (startIndex >= props.goodList.length) {
      return props.goodList;
    }

    return props.goodList.slice(startIndex, startIndex + PAGE_SIZE);
  }, [props.goodList, startIndex]);

  // Resets pagination every time summoner data list size changes to avoid indexing errors
  useEffect(() => {
    setPageIndex(0);
  }, [props.goodList.length])

  return (
    <div className='good-display-wrapper'>
      {props.dataLoading ? (
        <LoadingProgress />
      ) : (
        <Fragment>
          <Grid className='good-grid-wrapper' container spacing={3}>
              {paginatedGood.map((good, index) => {
                return (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                    <GoodCard good={good} onPurchase={props.onPurchase} />
                  </Grid>
                );
              })}
            </Grid>
            <Pagination currentIndex={pageIndex} pageCount={pageCount} onPageChange={setPageIndex} />
        </Fragment>
      )}
    </div>
  );
}
