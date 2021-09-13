import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import { combineReducers } from 'redux';
import { State } from '../state';

import globalSettings from './globalSettings.reducer';

// Root reducer must match the State interface defined at the top level of the Redux folder
export const createRootReducer = (history: History) => combineReducers<State>({
  router: connectRouter(history),
  globalSettings,
});
