import { ActionType, Action } from './actionTypes';

/**
 * Adds the given action type name to the list of currently pending data fetches.
 *
 * @param startedActionName Type of started Redux action.
 * @returns Action with name of started action type as payload.
 */
export const startFetchingData = (startedActionType: string): Action => ({
  type: ActionType.START_FETCHING_DATA,
  payload: startedActionType,
});

/**
 * Removes the given action type name from the list of currently pending data fetches.
 *
 * @param finishedActionType Type of finished Redux action.
 * @returns Action with name of finished action type as payload.
 */
export const finishFetchingData = (finishedActionType: string): Action => ({
  type: ActionType.FINISH_FETCHING_DATA,
  payload: finishedActionType,
});

/**
 * Clears the entire list of currently pending data fetches.
 *
 * @returns Action with cleared list of data fetches as payload for reducer.
 */
export const clearDataFetches = (): Action => ({
  type: ActionType.CLEAR_DATA_FETCHES,
  payload: {pendingDataFetches: []},
});
