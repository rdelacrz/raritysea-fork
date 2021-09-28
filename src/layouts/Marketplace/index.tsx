import { PropsWithChildren, ReactNode, useMemo, useState } from 'react';
import classNames from 'classnames';
import { Grid } from '@material-ui/core';
import { DropdownField } from '@components';
import { DropdownValues } from '@models';

import './styles.scss';

interface LayoutProps<T> {
  className?: string;
  marketplaceItems: T[];
  dataLoading?: boolean;
  filterDropdown: DropdownValues;
  sortByDropdown: DropdownValues;
  noFilterValue: number;
  initialSortByValue: number;
  getItemComparer: (sortBy: number) => (((item1: T, item2: T) => number) | undefined);
  filterFunc: (filterValue: any) => ((marketplaceItem: T) => boolean);
  onPurchase: (item: T) => void;
  children: (filteredItems: T[]) => ReactNode;
}

export const Marketplace = <T extends any>(props: PropsWithChildren<LayoutProps<T>>) => {
  /* State variables */
  const [filter, setFilter] = useState(props.noFilterValue);
  const [sortBy, setSortBy] = useState(props.initialSortByValue);

  /* Functions */

  const handleFilterChange = (value: any) => {
    const filterValue = parseInt(value, 10);
    setFilter(filterValue);
  }

  const handleSortByChange = (value: any) => {
    const sortByValue = parseInt(value, 10);
    setSortBy(sortByValue);
  }

  /* Calculated variables */

  // Applies sort
  const sortedItems = useMemo(() => {
    const compareFn = props.getItemComparer(sortBy);
    const itemsCopy = props.marketplaceItems.slice();
    return itemsCopy.sort(compareFn);
  }, [props.getItemComparer, props.marketplaceItems, sortBy]);

  // Applies filter
  const filteredItems = useMemo(() => {
    if (filter === props.noFilterValue) {
      return sortedItems;
    }
    return sortedItems.filter(props.filterFunc(filter));
  }, [sortedItems, filter]);

  return (
    <div className={classNames('marketplace-wrapper', props.className)}>
      <div className='dropdown-row-wrapper'>
        <Grid className='dropdown-grid-wrapper' container spacing={3}>
          <Grid item xs={12} sm={6}>
            <DropdownField id={props.filterDropdown.id} label={props.filterDropdown.label} value={filter} options={props.filterDropdown.options}
              onChange={handleFilterChange} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <DropdownField id={props.sortByDropdown.id} label={props.sortByDropdown.label} value={sortBy} options={props.sortByDropdown.options}
              onChange={handleSortByChange} />
          </Grid>
        </Grid>
      </div>
      {props.children(filteredItems)}
    </div>
  );
}
