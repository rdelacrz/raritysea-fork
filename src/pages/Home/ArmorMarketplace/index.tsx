import { FunctionComponent, useMemo } from 'react';
import classNames from 'classnames';
import { ArmorDisplay } from '@components';
import { Marketplace } from '@layouts';
import { CraftedItemData, Armor } from '@models';
import { getArmorComparer, useCraftedItems, useArmorTypes, ArmorSortBy, ArmorSortByDropdownList, useBuyCraftedItem } from '@utilities';

import './styles.scss';

interface ComponentProps {
  className?: string;
}

export const ArmorMarketplace: FunctionComponent<ComponentProps> = (props) => {
  /* Hook variables */
  const { data: craftedItemDataSets, isLoading: isCraftedItemsLoading, isFetched: isCraftedItemsFetched } = useCraftedItems();
  const { data: armorTypes, isLoading: isArmorTypesLoading } = useArmorTypes();
  const buyArmorMutation = useBuyCraftedItem();

  /* Functions */
  const handlePurchase = (armor: CraftedItemData<Armor>) => {
    buyArmorMutation.mutate({
      price: armor.price,
      listId: armor.listId,
    });
  }

   // Constructs initial armors list using query results
   const armor = useMemo(() => (
    (craftedItemDataSets?.armor || []).slice()
  ), [craftedItemDataSets]);

  // Shows loading progress if data is being loaded for first time or refreshed via refresh button
  const dataLoading = isCraftedItemsLoading || isArmorTypesLoading || !isCraftedItemsFetched;

  // Sets up dropdown options
  const armorTypeOptions = [{text: 'All Armor', value: 0}].concat(armorTypes || []);
  const sortByOptions = ArmorSortByDropdownList.map((text, value) => ({ text, value }));

  return (
    <Marketplace
      className={classNames('armor-marketplace-wrapper', props.className)}
      marketplaceItems={armor}
      dataLoading={dataLoading}
      filterDropdown={{ id: 'armorTypeDropdown', label: 'Select Armor Type', options: armorTypeOptions }}
      sortByDropdown={{ id: 'sortByDropdown', label: 'Select Sort', options: sortByOptions }}
      noFilterValue={0}
      initialSortByValue={ArmorSortBy.PRICE_HIGH_TO_LOW}
      getItemComparer={getArmorComparer}
      filterFunc={filterValue => (armorData => armorData.craftedItem.item_type === filterValue)}
      onPurchase={handlePurchase}
    >
      {filteredarmors => (
        <ArmorDisplay dataLoading={dataLoading} armorList={filteredarmors} onPurchase={handlePurchase} />
      )}
    </Marketplace>
  );
}
