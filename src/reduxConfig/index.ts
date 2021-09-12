import { applyMiddleware, compose as regularCompose, createStore, Store } from 'redux';
import createSagaMiddleware, { SagaMiddleware } from 'redux-saga';
import rootReducer from './reducers';
import SagaManager from './sagas/sagaManager';
import { initialState, State } from './state';
import { dataStorage } from '@utilities';

// Composes functions from right => left, and evaluates them in that order (see compose() details)
const compose: typeof regularCompose = (typeof window !== undefined) ?
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || regularCompose : regularCompose;

/**
 * Handles Hot Module Reloading logic in development environments.
 */
const handleDevelopmentHMR = (store: Store<State>, sagaMiddleware: SagaMiddleware) => {
  if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept('./reducers', () => {
      store.replaceReducer(rootReducer);
    });

    module.hot.accept('./sagas/sagaManager', () => {
      SagaManager.cancelSagas(store);
      SagaManager.startSagas(sagaMiddleware);
    });
  }
}

/**
 * Gets the redux-based data store containing the global application state.
 *
 * @returns A new instance of the Redux store.
 */
export const configureStore = () => {
  // Gets current application state from session storage, or defaults to preloaded state
  const appState = dataStorage.get() || initialState;

  // Handles application side effects
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    rootReducer,
    appState,
    compose(
      applyMiddleware(
        sagaMiddleware,
      ),
    ),
  );

  SagaManager.startSagas(sagaMiddleware);

  // Listens for changes to the state from the dispatching of actions, and saves them in local storage
  store.subscribe(() => {
    dataStorage.dispatch('saveState', store.getState());
  });

  handleDevelopmentHMR(store, sagaMiddleware);

  return store;
}

// Exports redux items
export * from './actions';
export * from './state';
