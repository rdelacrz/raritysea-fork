import { FunctionComponent, useMemo } from 'react';
import classNames from 'classnames';
import { WeaponDisplay } from '@components';
import { Marketplace } from '@layouts';
import { CraftedItem, CraftedItemData, Weapon } from '@models';
import { getWeaponComparer, useCraftedItems, useWeaponTypes, WeaponSortBy, WeaponSortByDropdownList, useBuyCraftedItem } from '@utilities';

import './styles.scss';

interface ComponentProps {
  className?: string;
}

export const WeaponsMarketplace: FunctionComponent<ComponentProps> = (props) => {
  /* Hook variables */
  const { data: craftedItemDataSets, isLoading: isCraftedItemsLoading, isFetched: isCraftedItemsFetched } = useCraftedItems();
  const { data: weaponTypes, isLoading: isWeaponTypesLoading } = useWeaponTypes();
  const buyWeaponMutation = useBuyCraftedItem();

  /* Functions */
  const handlePurchase = (weapon: CraftedItemData<Weapon>) => {
    buyWeaponMutation.mutate({
      price: weapon.price,
      listId: weapon.listId,
    });
  }

   // Constructs initial weapons list using query results
   const weapons = useMemo(() => (
    (craftedItemDataSets?.weapons || []).slice()
  ), [craftedItemDataSets]);

  // Shows loading progress if data is being loaded for first time or refreshed via refresh button
  const dataLoading = isCraftedItemsLoading || isWeaponTypesLoading || !isCraftedItemsFetched;

  // Sets up dropdown options
  const weaponTypeOptions = [{text: 'All Weapons', value: 0}].concat(weaponTypes || []);
  const sortByOptions = WeaponSortByDropdownList.map((text, value) => ({ text, value }));

  return (
    <Marketplace
      className={classNames('weapons-marketplace-wrapper', props.className)}
      marketplaceItems={weapons}
      dataLoading={dataLoading}
      filterDropdown={{ id: 'weaponTypeDropdown', label: 'Select Weapon Type', options: weaponTypeOptions }}
      sortByDropdown={{ id: 'sortByDropdown', label: 'Select Sort', options: sortByOptions }}
      noFilterValue={0}
      initialSortByValue={WeaponSortBy.PRICE_HIGH_TO_LOW}
      getItemComparer={getWeaponComparer}
      filterFunc={filterValue => (weaponData => weaponData.craftedItem.item_type === filterValue)}
      onPurchase={handlePurchase}
    >
      {filteredWeapons => (
        <WeaponDisplay dataLoading={dataLoading} weaponList={filteredWeapons} onPurchase={handlePurchase} />
      )}
    </Marketplace>
  );
}
