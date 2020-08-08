import { takeLeading, put, call } from 'redux-saga/effects';
import services from '../services';
import { NEWS, FIND_NEWS_WEBSITE } from '../actionTypes';
import utils from 'utils';
import toast from 'utils/toast';
const { tranformToFormData } = utils;
const { FIND, CREATE, REMOVE, UPDATE, FIND_ONE } = NEWS;

// admin sagas
export function* findNewsWatcher() {
  yield takeLeading(FIND.WATCH, findNewsWorker);
}
export function* finOnedNewsWatcher() {
  yield takeLeading(FIND_ONE.WATCH, findOneNewsWorker);
}
export function* createNewsWatcher() {
  yield takeLeading(CREATE.WATCH, createNewsWorker);
}

export function* updateNewsWatcher() {
  yield takeLeading(UPDATE.WATCH, updateNewsWorker);
}

export function* removeNewsWatcher() {
  yield takeLeading(REMOVE.WATCH, removeNewsWorker);
}
// website sagas

export function* findWebsiteNewsWatcher() {
  yield takeLeading(FIND_NEWS_WEBSITE.WATCH, findWebsiteNewsWorker);
}

function* findWebsiteNewsWorker({ payload }) {
  try {
    yield put({ type: FIND_NEWS_WEBSITE.LOAD });
    const response = yield call(services.news.find, payload);
    yield put({ type: FIND_NEWS_WEBSITE.SUCCES, payload: { rows: response.data, count: response.count } });
  } catch (err) {
    toast.error(err);
    yield put({ type: FIND_NEWS_WEBSITE.FAIL, err });
  }
}

function* findNewsWorker({ payload }) {
  try {
    yield put({ type: FIND.LOAD });
    const response = yield call(services.news.find, payload);
    yield put({ type: FIND.SUCCES, payload: { rows: response.data, count: response.count } });
  } catch (err) {
    toast.error(err);
    yield put({ type: FIND.FAIL, err });
  }
}

function* findOneNewsWorker({ payload }) {
  try {
    yield put({ type: FIND_ONE.LOAD });
    const response = yield call(services.news.findOne, payload);
    yield put({ type: FIND_ONE.SUCCES, payload: response.data });
  } catch (err) {
    toast.error(err);
    yield put({ type: FIND_ONE.FAIL, err });
  }
}

function* createNewsWorker({ payload }) {
  try {
    const { body, cb, extra } = payload;
    yield put({ type: CREATE.LOAD });

    //first create request json
    const response = yield call(services.news.post, body);

    // second update image after create success
    const fileResponse =
      response.success && extra.image && extra.image.length
        ? yield call(services.news.put, {
            body: tranformToFormData({ data: { image: extra.image } }),
            id: response.data._id,
          })
        : null;

    yield put({ type: CREATE.SUCCES, payload: response.data.result });
    toast.success();
    cb && cb();
  } catch (err) {
    toast.error(err);
    yield put({ type: CREATE.FAIL, err });
  }
}

function* updateNewsWorker({ payload }) {
  try {
    const { body, cb, extra, id, meta } = payload;
    yield put({ type: UPDATE.LOAD });

    //first create request json
    const response = yield call(services.news.put, { body, id });

    // second update image after create success
    const fileResponse =
      response.success && extra.image && extra.image.length && !extra.image[0].uploaded
        ? yield call(services.news.put, {
            body: tranformToFormData({ data: { image: extra.image } }),
            id,
          })
        : null;

    const filesDeleted =
      response.success && meta.imageDeleted
        ? yield call(services.news.put, {
            body: tranformToFormData({ data: { image: '' } }),
            id,
          })
        : null;
    yield put({ type: UPDATE.SUCCES, payload: response.data.result });
    toast.success();
    cb && cb();
  } catch (err) {
    toast.error(err);
    yield put({ type: UPDATE.FAIL, err });
  }
}

function* removeNewsWorker({ payload }) {
  try {
    yield put({ type: REMOVE.LOAD });
    yield call(services.news.delete, payload);
    yield put({ type: REMOVE.SUCCES, payload });
  } catch (err) {
    toast.error(err);
    yield put({ type: REMOVE.FAIL, err });
  }
}
