import { takeLatest, put, call, all } from 'redux-saga/effects';
import services from '../services';
import { FIND_CURRENT_ITEM_DESCRIPTION } from '../actionTypes';
import toast from 'utils/toast';

// website sagas
export function* findCurrentItemDescriptionWatcher() {
  yield takeLatest(FIND_CURRENT_ITEM_DESCRIPTION.WATCH, findCurrentItemDescriptionWorker);
}

function* findCurrentItemDescriptionWorker({ payload }) {
  try {
    yield put({ type: FIND_CURRENT_ITEM_DESCRIPTION.LOAD });
    const response = yield call(services.statics.find, payload);
    yield put({ type: FIND_CURRENT_ITEM_DESCRIPTION.SUCCES, payload: { rows: response.data, count: response.count } });
  } catch (err) {
    toast.error(err);
    yield put({ type: FIND_CURRENT_ITEM_DESCRIPTION.FAIL, err });
  }
}
