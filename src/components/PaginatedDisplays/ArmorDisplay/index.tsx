import { Fragment, FunctionComponent, useMemo, useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import { ArmorCard, LoadingProgress, Pagination } from '@components';
import { CraftedItemData, Armor } from '@models';
import { PAGE_SIZE } from '@utilities';

import './styles.scss';

interface ComponentProps {
  className?: string;
  dataLoading?: boolean;
  armorList: CraftedItemData<Armor>[];
  onPurchase?: (armor: CraftedItemData<Armor>) => void;
}

export const ArmorDisplay: FunctionComponent<ComponentProps> = (props) => {
  /* State variables */
  const [pageIndex, setPageIndex] = useState<number>(0);

  // Determines pagination values based on page index and size
  const startIndex = pageIndex * PAGE_SIZE;
  const pageCount = Math.ceil(props.armorList.length / PAGE_SIZE);

  // Applies pagination
  const paginatedArmor = useMemo(() => {
    if (startIndex >= props.armorList.length) {
      return props.armorList;
    }

    return props.armorList.slice(startIndex, startIndex + PAGE_SIZE);
  }, [props.armorList, startIndex]);

  // Resets pagination every time summoner data list size changes to avoid indexing errors
  useEffect(() => {
    setPageIndex(0);
  }, [props.armorList.length])

  return (
    <div className='armor-display-wrapper'>
      {props.dataLoading ? (
        <LoadingProgress />
      ) : (
        <Fragment>
          <Grid className='armor-grid-wrapper' container spacing={3}>
              {paginatedArmor.map((armor, index) => {
                return (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                    <ArmorCard armor={armor} onPurchase={props.onPurchase} />
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
