import { FunctionComponent, useEffect, useMemo, useState } from 'react';
import { useQueryClient } from 'react-query';
import { Button, Grid } from '@material-ui/core';
import { Refresh } from '@material-ui/icons';
import { DropdownField, SummonerDisplay } from '@components';
import { Page } from '@layouts';
import { Summoner, SummonerData } from '@models';
import {
  BaseItemType, ClassMap, getSummonerComparer, SortBy, SortByDropdownList, SummonerClass, SummonerClassList,
  useBuySummoner, useClassSkills, useSummonerDataList, useCraftedItems
} from '@utilities';
import { SummonersMarketplace } from './SummonersMarketplace';
import { WeaponsMarketplace } from './WeaponsMarketplace';

import './styles.scss';

interface PageProps {
  className?: string;
}

const MARKETPLACE_DROPDOWN_OPTIONS = [
  {
    value: BaseItemType.SUMMONERS,
    text: 'Summoners',
  },
  {
    value: BaseItemType.WEAPONS,
    text: 'Weapons',
  },
  {
    value: BaseItemType.ARMOR,
    text: 'Armor',
  },
  {
    value: BaseItemType.GOODS,
    text: 'Goods',
  },
];

export const HomePage: FunctionComponent<PageProps> = (props) => {
  /* State variables */
  const [marketplaceItemType, setMarketplaceItemType] = useState<BaseItemType>(BaseItemType.SUMMONERS);

  /* Hook variables */
  const queryClient = useQueryClient();
  const { isLoading, isFetched } = useSummonerDataList();

  /* Functions */

  const refreshSummoners = async () => {
    await queryClient.cancelQueries('getSummonerDataList', { exact: true });
    await queryClient.resetQueries('getSummonerDataList', { exact: true });
  }

  const handleMarketplaceItemTypeChange = (value: any) => {
    const marketplaceType = parseInt(value, 10) as BaseItemType;
    setMarketplaceItemType(marketplaceType);
  }

  /* Calculated variables */

  // Shows loading progress if data is being loaded for first time or refreshed via refresh button
  const dataLoading = isLoading || !isFetched;

  return (
    <Page className='home-page-wrapper'>
      <h2 className='page-header'>Marketplace</h2>

      <div className='marketplace-type-dropdown-row'>
        <DropdownField id='marketplaceTypeDropdown' className='marketplace-type-dropdown' value={marketplaceItemType}
          options={MARKETPLACE_DROPDOWN_OPTIONS} onChange={handleMarketplaceItemTypeChange} />
      </div>
      <div className='refresh-button-row'>
        <Button id='refreshSummonersBtn' color='secondary' variant='contained' startIcon={<Refresh />}
            disabled={dataLoading} onClick={refreshSummoners}>
          Refresh
        </Button>
      </div>

      {marketplaceItemType === BaseItemType.SUMMONERS && (
        <SummonersMarketplace />
      )}
      {marketplaceItemType === BaseItemType.WEAPONS && (
        <WeaponsMarketplace />
      )}
      {marketplaceItemType === BaseItemType.ARMOR && (
        <div>
          Armor Marketplace Coming Soon
        </div>
      )}
      {marketplaceItemType === BaseItemType.GOODS && (
        <div>
          Goods Marketplace Coming Soon
        </div>
      )}

    </Page>
  );
}
