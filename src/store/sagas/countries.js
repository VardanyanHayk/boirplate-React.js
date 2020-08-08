import { takeLatest, put, call } from 'redux-saga/effects';
import services from '../services';
import { FIND_COUNTRIES } from '../actionTypes';
import toast from 'utils/toast';

// watchers
export function* findCountriesWatcher() {
  yield takeLatest(FIND_COUNTRIES.WATCH, findCountriessWorker);
}

function* findCountriessWorker({ payload }) {
  try {
    yield put({ type: FIND_COUNTRIES.LOAD });
    const response = yield call(services.countries.find, payload);
    yield put({ type: FIND_COUNTRIES.SUCCES, payload: response.data });
  } catch (err) {
    toast.error(err);
    yield put({ type: FIND_COUNTRIES.FAIL, err });
  }
}
