import { takeLeading, put, call } from 'redux-saga/effects';
import services from '../services';
import { FIND_VACANCIES_WEBSITE, SEND_VACANCY, VACANCIES } from '../actionTypes';
import utils from 'utils';
import toast from 'utils/toast';
const { FIND, FIND_ONE, UPDATE, REMOVE, CREATE } = VACANCIES;

// admin sagas
export function* findJobsWatcher() {
  yield takeLeading(FIND.WATCH, findJobsWorker);
}
export function* findOneJobWatcher() {
  yield takeLeading(FIND_ONE.WATCH, findOneJobWorker);
}
export function* createJobWatcher() {
  yield takeLeading(CREATE.WATCH, createJobWorker);
}

export function* updateJobWatcher() {
  yield takeLeading(UPDATE.WATCH, updateJobWorker);
}

export function* removeJobWatcher() {
  yield takeLeading(REMOVE.WATCH, removeJobWorker);
}

// website sagas
export function* findWebSiteVacanciesWatcher() {
  yield takeLeading(FIND_VACANCIES_WEBSITE.WATCH, findWebSiteVacancies);
}

export function* sendVacancyWatcher() {
  yield takeLeading(SEND_VACANCY.WATCH, sendVacancy);
}

function* findJobsWorker({ payload }) {
  try {
    yield put({ type: FIND.LOAD });
    const response = yield call(services.vacancies.findWebSite, payload);
    yield put({ type: FIND.SUCCES, payload: { rows: response.data, count: response.count } });
  } catch (err) {
    toast.error(err);
    yield put({ type: FIND.FAIL, err });
  }
}

function* findOneJobWorker({ payload }) {
  try {
    yield put({ type: FIND_ONE.LOAD });
    const response = yield call(services.vacancies.findOne, payload);
    yield put({ type: FIND_ONE.SUCCES, payload: response.data });
  } catch (err) {
    toast.error(err);
    yield put({ type: FIND_ONE.FAIL, err });
  }
}

function* createJobWorker({ payload }) {
  try {
    const { body, cb } = payload;
    yield put({ type: CREATE.LOAD });
    const response = yield call(services.vacancies.post, body);
    yield put({ type: CREATE.SUCCES, payload: response.data });
    toast.success();
    cb && cb();
  } catch (err) {
    toast.error(err);
    yield put({ type: CREATE.FAIL, err });
  }
}

function* updateJobWorker({ payload }) {
  try {
    const { cb } = payload;
    yield put({ type: UPDATE.LOAD });
    const response = yield call(services.vacancies.put, payload);
    yield put({ type: UPDATE.SUCCES, payload: response.data });
    toast.success();
    cb && cb();
  } catch (err) {
    toast.error(err);
    yield put({ type: UPDATE.FAIL, err });
  }
}

function* removeJobWorker({ payload }) {
  try {
    yield put({ type: REMOVE.LOAD });
    yield call(services.vacancies.delete, payload);
    yield put({ type: REMOVE.SUCCES, payload });
  } catch (err) {
    toast.error(err);
    yield put({ type: REMOVE.FAIL, err });
  }
}

// website

function* findWebSiteVacancies({ payload }) {
  try {
    yield put({ type: FIND_VACANCIES_WEBSITE.LOAD });
    const response = yield call(services.vacancies.findWebSite, payload);
    yield put({ type: FIND_VACANCIES_WEBSITE.SUCCES, payload: { rows: response.data, count: response.count } });
  } catch (err) {
    toast.error(err);
    yield put({ type: FIND_VACANCIES_WEBSITE.FAIL, err });
  }
}

function* sendVacancy({ payload }) {
  const { message, cb, payload: data } = payload;
  try {
    yield call(services.vacancies.send, data);
    toast.success(message.success);
    cb && cb();
  } catch (err) {
    console.log('Error', err);
    toast.error({ error: message.fail });
  }
}
