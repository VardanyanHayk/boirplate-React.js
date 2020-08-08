import { takeLatest, put, call } from 'redux-saga/effects';
import services from '../services';
import { RUBRICS, FIND_RUBRICS_WEBSITE } from '../actionTypes';
import toast from 'utils/toast';
const { FIND, CREATE, REMOVE, UPDATE, FIND_ONE } = RUBRICS;

// watchers
export function* findRubricsWatcher() {
  yield takeLatest(FIND.WATCH, findRubricsWorker);
}

export function* findWebsiteRubricsWatcher() {
  yield takeLatest(FIND_RUBRICS_WEBSITE.WATCH, findWebsiteRubricsWorker);
}

export function* finOnedRubricWatcher() {
  yield takeLatest(FIND_ONE.WATCH, findOneRubricWorker);
}
export function* createRubricWatcher() {
  yield takeLatest(CREATE.WATCH, createRubricWorker);
}

export function* updateRubricWatcher() {
  yield takeLatest(UPDATE.WATCH, updateRubricWorker);
}

export function* removeRubricWatcher() {
  yield takeLatest(REMOVE.WATCH, removeRubricWorker);
}

function* findWebsiteRubricsWorker({ payload }) {
  try {
    yield put({ type: FIND_RUBRICS_WEBSITE.LOAD });
    const response = yield call(services.rubrics.find, payload);
    yield put({ type: FIND_RUBRICS_WEBSITE.SUCCES, payload: { rows: response.data, count: response.count } });
  } catch (err) {
    toast.error(err);
    yield put({ type: FIND_RUBRICS_WEBSITE.FAIL, err });
  }
}

function* findRubricsWorker({ payload }) {
  try {
    yield put({ type: FIND.LOAD });
    const response = yield call(services.rubrics.find, payload);
    yield put({ type: FIND.SUCCES, payload: { rows: response.data, count: response.count } });
  } catch (err) {
    toast.error(err);
    yield put({ type: FIND.FAIL, err });
  }
}

function* findOneRubricWorker({ payload }) {
  try {
    yield put({ type: FIND_ONE.LOAD });
    const response = yield call(services.rubrics.findOne, payload);
    yield put({ type: FIND_ONE.SUCCES, payload: response.data });
  } catch (err) {
    toast.error(err);
    yield put({ type: FIND_ONE.FAIL, err });
  }
}

function* createRubricWorker({ payload }) {
  try {
    const { body, cb } = payload;
    yield put({ type: CREATE.LOAD });
    const response = yield call(services.rubrics.post, body);
    yield put({ type: CREATE.SUCCES, payload: response.data.result });
    toast.success();
    cb && cb();
  } catch (err) {
    toast.error(err);
    yield put({ type: CREATE.FAIL, err });
  }
}

function* updateRubricWorker({ payload }) {
  try {
    const { cb } = payload;
    yield put({ type: UPDATE.LOAD });
    const response = yield call(services.rubrics.put, payload);
    yield put({ type: UPDATE.SUCCES, payload: response.data.result });
    toast.success();
    cb && cb();
  } catch (err) {
    toast.error(err);
    yield put({ type: UPDATE.FAIL, err });
  }
}

function* removeRubricWorker({ payload }) {
  try {
    yield put({ type: REMOVE.LOAD });
    yield call(services.rubrics.delete, payload);
    yield put({ type: REMOVE.SUCCES, payload });
  } catch (err) {
    toast.error(err);
    yield put({ type: REMOVE.FAIL, err });
  }
}
