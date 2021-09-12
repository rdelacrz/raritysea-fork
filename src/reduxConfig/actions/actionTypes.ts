import { Action as BaseAction } from 'redux';

export enum ActionType {
  // Global settings actions
  START_FETCHING_DATA = 'START_FETCHING_DATA',
  FINISH_FETCHING_DATA = 'FINISH_FETCHING_DATA',
  CLEAR_DATA_FETCHES = 'CLEAR_DATA_FETCHES',
}

export interface Action extends BaseAction {
  type: ActionType;
  payload?: any;    // Used for reducers and most sagas
}
