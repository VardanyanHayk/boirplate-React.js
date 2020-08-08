import { takeLatest, put, call } from 'redux-saga/effects';
import services from '../services';
import { TAGS } from '../actionTypes';
import toast from 'utils/toast';
const { FIND, CREATE, REMOVE, UPDATE, FIND_ONE } = TAGS;

// watchers
export function* findTagsWatcher() {
  yield takeLatest(FIND.WATCH, findTagsWorker);
}
export function* finOnedTagWatcher() {
  yield takeLatest(FIND_ONE.WATCH, findOneTagWorker);
}
export function* createTagWatcher() {
  yield takeLatest(CREATE.WATCH, createTagWorker);
}

export function* updateTagWatcher() {
  yield takeLatest(UPDATE.WATCH, updateTagWorker);
}

export function* removeTagWatcher() {
  yield takeLatest(REMOVE.WATCH, removeTagWorker);
}

function* findTagsWorker({ payload }) {
  try {
    yield put({ type: FIND.LOAD });
    const response = yield call(payload && payload.used ? services.tags.findUsed : services.tags.find, payload);
    yield put({ type: FIND.SUCCES, payload: { rows: response.data, count: response.count } });
  } catch (err) {
    toast.error(err);
    yield put({ type: FIND.FAIL, err });
  }
}

function* findOneTagWorker({ payload }) {
  try {
    yield put({ type: FIND_ONE.LOAD });
    const response = yield call(services.tags.findOne, payload);
    yield put({ type: FIND_ONE.SUCCES, payload: response.data });
  } catch (err) {
    toast.error(err);
    yield put({ type: FIND_ONE.FAIL, err });
  }
}

function* createTagWorker({ payload }) {
  try {
    const { body, cb } = payload;
    yield put({ type: CREATE.LOAD });
    const response = yield call(services.tags.post, body);
    yield put({ type: CREATE.SUCCES, payload: response.data });
    toast.success();
    cb && cb();
  } catch (err) {
    toast.error(err);
    yield put({ type: CREATE.FAIL, err });
  }
}

function* updateTagWorker({ payload }) {
  try {
    const { cb } = payload;
    yield put({ type: UPDATE.LOAD });
    const response = yield call(services.tags.put, payload);
    yield put({ type: UPDATE.SUCCES, payload: response.data });
    toast.success();
    cb && cb();
  } catch (err) {
    toast.error(err);
    yield put({ type: UPDATE.FAIL, err });
  }
}

function* removeTagWorker({ payload }) {
  try {
    yield put({ type: REMOVE.LOAD });
    yield call(services.tags.delete, payload);
    yield put({ type: REMOVE.SUCCES, payload });
  } catch (err) {
    toast.error(err);
    yield put({ type: REMOVE.FAIL, err });
  }
}
