import { Saga } from 'redux-saga';
import { all, call, spawn } from 'redux-saga/effects';

export default function* rootSaga() {
  // Place sagas from other files here
  const sagas: Saga[] = [
  ];

  yield all(sagas.map(saga =>
    spawn(function*() {
      while (true) {
        try {
          yield call(saga);
          break;
        } catch (e) {
          console.log(e);
        }
      }
    })),
  );
}
