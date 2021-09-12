/**
 * Contains the interface for the Redux store's data state, as well as a data dictionary containing the initial
 * data values of the Redux store.
 */

import { GlobalSettings } from '@models';

/**
 * The interface of the Redux store's data state.
 */
export interface State {
  globalSettings: GlobalSettings;
}

/**
 * Contains the initial values for the Redux store's data state when it is first initialized.
 */
export const initialState: State = {
  // Initialize default state here
  globalSettings: {
    pendingDataFetches: [],
  },
};
