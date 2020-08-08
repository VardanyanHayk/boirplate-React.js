import { takeLeading, put, call } from 'redux-saga/effects';
import services from '../services';
import { SEARCH, SEARCH_BY_TAGS } from '../actionTypes';
import utils from 'utils';
import toast from 'utils/toast';

export function* searchWatcher() {
  yield takeLeading(SEARCH.WATCH, searchWorker);
}

function* searchWorker({ payload }) {
  try {
    yield put({ type: SEARCH.LOAD });
    const response = yield call(services.search.find, payload);
    yield put({ type: SEARCH.SUCCES, payload: { rows: response.data, count: response.count } });
  } catch (err) {
    toast.error(err);
    yield put({ type: SEARCH.FAIL, err });
  }
}

export function* searchByTagWatcher() {
  yield takeLeading(SEARCH_BY_TAGS.WATCH, searchByTagWorker);
}

function* searchByTagWorker({ payload }) {
  try {
    yield put({ type: SEARCH_BY_TAGS.LOAD });
    const response = yield call(services.search.findByTag, payload);
    yield put({
      type: SEARCH_BY_TAGS.SUCCES,
      payload: { rows: response.data, count: response.count, title: response.tag && response.tag.name },
    });
  } catch (err) {
    toast.error(err);
    yield put({ type: SEARCH_BY_TAGS.FAIL, err });
  }
}
