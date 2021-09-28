import { Fragment, FunctionComponent, useMemo, useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import { LoadingProgress, Pagination, WeaponCard } from '@components';
import { CraftedItemData, Weapon } from '@models';
import { PAGE_SIZE } from '@utilities';

import './styles.scss';

interface ComponentProps {
  className?: string;
  dataLoading?: boolean;
  weaponList: CraftedItemData<Weapon>[];
  onPurchase?: (weapon: CraftedItemData<Weapon>) => void;
}

export const WeaponDisplay: FunctionComponent<ComponentProps> = (props) => {
  /* State variables */
  const [pageIndex, setPageIndex] = useState<number>(0);

  // Determines pagination values based on page index and size
  const startIndex = pageIndex * PAGE_SIZE;
  const pageCount = Math.ceil(props.weaponList.length / PAGE_SIZE);

  // Applies pagination
  const paginatedWeapons = useMemo(() => {
    if (startIndex >= props.weaponList.length) {
      return props.weaponList;
    }

    return props.weaponList.slice(startIndex, startIndex + PAGE_SIZE);
  }, [props.weaponList, startIndex]);

  // Resets pagination every time summoner data list size changes to avoid indexing errors
  useEffect(() => {
    setPageIndex(0);
  }, [props.weaponList.length])

  return (
    <div className='weapon-display-wrapper'>
      {props.dataLoading ? (
        <LoadingProgress />
      ) : (
        <Fragment>
          <Grid className='weapon-grid-wrapper' container spacing={3}>
              {paginatedWeapons.map((weapon, index) => {
                return (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                    <WeaponCard weapon={weapon} onPurchase={props.onPurchase} />
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
