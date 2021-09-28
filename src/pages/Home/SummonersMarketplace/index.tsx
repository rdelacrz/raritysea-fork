import { FunctionComponent, useEffect, useMemo } from 'react';
import classNames from 'classnames';
import { SummonerDisplay } from '@components';
import { Marketplace } from '@layouts';
import { SummonerData } from '@models';
import {
  ClassMap, getSummonerComparer, SummonerSortBy, SummonerSortByDropdownList, SummonerClass, SummonerClassList,
  useBuySummoner, useClassSkills, useSummonerDataList
} from '@utilities';

import './styles.scss';

interface ComponentProps {
  className?: string;
}

export const SummonersMarketplace: FunctionComponent<ComponentProps> = (props) => {
  /* Hook variables */
  const { data: queryResult, isLoading, isFetched, isFetchingNextPage, hasNextPage, fetchNextPage } = useSummonerDataList();
  const { data: classSkills } = useClassSkills();
  const buySummonerMutation = useBuySummoner();

  /* Functions */
  const handlePurchase = (summoner: SummonerData) => {
    buySummonerMutation.mutate({
      price: summoner.price,
      listId: summoner.id,
    });
  }

  // Queries next page once current one is fetched
  useEffect(() => {
    if (isFetched && !isFetchingNextPage && hasNextPage) {
      fetchNextPage();
    }
  }, [isFetched, isFetchingNextPage]);

  // Constructs initial summoners list using query results
  const summoners = useMemo(() => (
    (queryResult?.pages || []).reduce((list, result) => (
      list.concat(result.result)
    ), [] as SummonerData[])
  ), [queryResult?.pages]);

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
  const sortByOptions = SummonerSortByDropdownList.map((text, value) => ({ text, value }));

  return (
    <Marketplace
      className={classNames('summoners-marketplace-wrapper', props.className)}
      marketplaceItems={summoners}
      dataLoading={dataLoading}
      filterDropdown={{ id: 'summonerClassDropdown', label: 'Select Job', options: summonerClassOptions }}
      sortByDropdown={{ id: 'sortByDropdown', label: 'Select Sort', options: sortByOptions }}
      noFilterValue={SummonerClass.ALL}
      initialSortByValue={SummonerSortBy.PRICE_HIGH_TO_LOW}
      getItemComparer={getSummonerComparer}
      filterFunc={filterValue => (summonerData => summonerData.class?.toNumber() === filterValue)}
      onPurchase={handlePurchase}
    >
      {filteredSummoners => (
        <SummonerDisplay summonerDataList={filteredSummoners} classSkills={classSkills || []} dataLoading={dataLoading}
          onPurchase={handlePurchase} />
      )}
    </Marketplace>
  );
}
