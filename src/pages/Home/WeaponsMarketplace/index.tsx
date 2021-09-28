import { FunctionComponent, useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import { useQueryClient } from 'react-query';
import { Grid } from '@material-ui/core';
import { DropdownField, WeaponDisplay } from '@components';
import { CraftedItemData, Weapon } from '@models';
import { useCraftedItems } from '@utilities';

import './styles.scss';

interface ComponentProps {
  className?: string;
}

export const WeaponsMarketplace: FunctionComponent<ComponentProps> = (props) => {
  /* State variables */
  const [weapons, setWeapons] = useState<CraftedItemData<Weapon>[]>([]);

  /* Hook variables */
  const { data: craftedItemDataSets, isLoading, isFetched } = useCraftedItems();

  /* Functions */


  // Queries summoner data and sets it locally with given ordering
  useEffect(() => {
    if (craftedItemDataSets && (craftedItemDataSets.weapons || []).length > 0 && isFetched) {
      setWeapons(craftedItemDataSets.weapons.slice());
    }
  }, [craftedItemDataSets]);

  console.log('weapons', weapons)

  /* Calculated variables */

  // Shows loading progress if data is being loaded for first time or refreshed via refresh button
  const dataLoading = isLoading || !isFetched;

  return (
    <div className={classNames('summoners-marketplace-wrapper', props.className)}>
      <div className='dropdown-row-wrapper'>
        <Grid className='dropdown-grid-wrapper' container spacing={3}>
          <Grid item xs={12} sm={6}>
            
          </Grid>
          <Grid item xs={12} sm={6}>
            
          </Grid>
        </Grid>
      </div>

      <WeaponDisplay weaponList={weapons} />

      
    </div>
  );
}
