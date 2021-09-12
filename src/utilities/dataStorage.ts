/**
 * Contains localStorage store and sync state logic.
 */

import { createStoreon, StoreonModule } from 'storeon';
import { persistState } from '@storeon/localstorage';

const appDataKey = 'OPTIONS_MARKET_APP_DATA';

const appData: StoreonModule<any> = store => {
  store.on('@init', () => ({}));
  store.on('saveState', (state, updatedState) => updatedState);
};

export const dataStorage = createStoreon([
  appData,
  persistState(undefined, {key: appDataKey}),
]);
