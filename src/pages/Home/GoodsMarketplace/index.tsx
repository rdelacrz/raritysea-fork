import { FunctionComponent, useMemo } from 'react';
import classNames from 'classnames';
import { GoodDisplay } from '@components';
import { Marketplace } from '@layouts';
import { CraftedItemData, Good } from '@models';
import { getGoodComparer, useCraftedItems, useGoodTypes, GoodSortBy, GoodSortByDropdownList, useBuyCraftedItem } from '@utilities';

import './styles.scss';

interface ComponentProps {
  className?: string;
}

export const GoodsMarketplace: FunctionComponent<ComponentProps> = (props) => {
  /* Hook variables */
  const { data: craftedItemDataSets, isLoading: isCraftedItemsLoading, isFetched: isCraftedItemsFetched } = useCraftedItems();
  const { data: goodTypes, isLoading: isGoodTypesLoading } = useGoodTypes();
  const buyGoodMutation = useBuyCraftedItem();

  /* Functions */
  const handlePurchase = (good: CraftedItemData<Good>) => {
    buyGoodMutation.mutate({
      price: good.price,
      listId: good.listId,
    });
  }

   // Constructs initial goods list using query results
   const goods = useMemo(() => (
    (craftedItemDataSets?.goods || []).slice()
  ), [craftedItemDataSets]);

  // Shows loading progress if data is being loaded for first time or refreshed via refresh button
  const dataLoading = isCraftedItemsLoading || isGoodTypesLoading || !isCraftedItemsFetched;

  // Sets up dropdown options
  const goodTypeOptions = [{text: 'All Good', value: 0}].concat(goodTypes || []);
  const sortByOptions = GoodSortByDropdownList.map((text, value) => ({ text, value }));

  return (
    <Marketplace
      className={classNames('good-marketplace-wrapper', props.className)}
      marketplaceItems={goods}
      dataLoading={dataLoading}
      filterDropdown={{ id: 'goodTypeDropdown', label: 'Select Good Type', options: goodTypeOptions }}
      sortByDropdown={{ id: 'sortByDropdown', label: 'Select Sort', options: sortByOptions }}
      noFilterValue={0}
      initialSortByValue={GoodSortBy.PRICE_HIGH_TO_LOW}
      getItemComparer={getGoodComparer}
      filterFunc={filterValue => (goodData => goodData.craftedItem.item_type === filterValue)}
      onPurchase={handlePurchase}
    >
      {filteredgoods => (
        <GoodDisplay dataLoading={dataLoading} goodList={filteredgoods} onPurchase={handlePurchase} />
      )}
    </Marketplace>
  );
}
