import { takeLatest, put, call, all } from 'redux-saga/effects';
import services from '../services';
import { ACTIVITY, FIND_ACTIVITIES_WEBSITE, FIND_ACTIVITIES_BY_YEAR } from '../actionTypes';
import toast from 'utils/toast';
import utils from 'utils';
const { tranformToFormData } = utils;
const { FIND, CREATE, REMOVE, UPDATE, FIND_ONE, FIND_GROUPS } = ACTIVITY;

// admin sagas
export function* findActivityWatcher() {
  yield takeLatest(FIND.WATCH, findActivityWorker);
}
export function* finOnedActivityWatcher() {
  yield takeLatest(FIND_ONE.WATCH, findOneActivityWorker);
}
export function* createActivityWatcher() {
  yield takeLatest(CREATE.WATCH, createActivityWorker);
}

export function* updateActivityWatcher() {
  yield takeLatest(UPDATE.WATCH, updateActivityWorker);
}

export function* removeActivityWatcher() {
  yield takeLatest(REMOVE.WATCH, removeActivityWorker);
}

// website sagas
export function* findActivityGroupsWatcher() {
  yield takeLatest(FIND_GROUPS.WATCH, findActivityGroupsWorker);
}

export function* findWebsiteActivityWatcher() {
  yield takeLatest(FIND_ACTIVITIES_WEBSITE.WATCH, findWebsiteActivityWorker);
}

export function* findActivitiesByYearWatcher() {
  yield takeLatest(FIND_ACTIVITIES_BY_YEAR.WATCH, findActivitiesByYearWorker);
}

function* findWebsiteActivityWorker({ payload }) {
  try {
    yield put({ type: FIND_ACTIVITIES_WEBSITE.LOAD });
    const response = yield call(services.activity.find, payload);
    yield put({ type: FIND_ACTIVITIES_WEBSITE.SUCCES, payload: { rows: response.data, count: response.count } });
  } catch (err) {
    toast.error(err);
    yield put({ type: FIND_ACTIVITIES_WEBSITE.FAIL, err });
  }
}

function* findActivityWorker({ payload }) {
  try {
    yield put({ type: FIND.LOAD });
    const response = yield call(services.activity.find, payload);
    yield put({ type: FIND.SUCCES, payload: { rows: response.data, count: response.count } });
  } catch (err) {
    toast.error(err);
    yield put({ type: FIND.FAIL, err });
  }
}

function* findOneActivityWorker({ payload }) {
  try {
    yield put({ type: FIND_ONE.LOAD });
    const response = yield call(services.activity.findOne, payload);
    yield put({ type: FIND_ONE.SUCCES, payload: response.data });
  } catch (err) {
    toast.error(err);
    yield put({ type: FIND_ONE.FAIL, err });
  }
}

function* findActivityGroupsWorker({ payload }) {
  try {
    yield put({ type: FIND_GROUPS.LOAD });
    // run 3 requests parallel
    const [responseCompleted, responseCurrent, responseAnnounced] = yield all(
      ['completed', 'current', 'announced'].map((status) => call(services.activity.find, { params: { status } }))
    );

    yield put({
      type: FIND_GROUPS.SUCCES,
      payload: { completed: responseCompleted.data, current: responseCurrent.data, announced: responseAnnounced.data },
    });
  } catch (err) {
    toast.error(err);
    yield put({ type: FIND_GROUPS.FAIL, err });
  }
}

function* createActivityWorker({ payload }) {
  try {
    const { body, cb, extra } = payload;
    yield put({ type: CREATE.LOAD });
    //first create request json
    const response = yield call(services.activity.post, body);

    // second update image after create success
    const fileResponse =
      response.success && extra.image && extra.image.length
        ? yield call(services.activity.put, {
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

function* updateActivityWorker({ payload }) {
  try {
    const { cb, id, extra, meta, body } = payload;
    yield put({ type: UPDATE.LOAD });
    const response = yield call(services.activity.put, { body, id });

    // second update image after create success
    const fileResponse =
      response.success && extra.image && extra.image.length && !extra.image[0].uploaded
        ? yield call(services.activity.put, {
            body: tranformToFormData({ data: { image: extra.image } }),
            id,
          })
        : null;

    const filesDeleted =
      response.success && meta.imageDeleted
        ? yield call(services.activity.put, {
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

function* removeActivityWorker({ payload }) {
  try {
    yield put({ type: REMOVE.LOAD });
    yield call(services.activity.delete, payload);
    yield put({ type: REMOVE.SUCCES, payload });
  } catch (err) {
    toast.error(err);
    yield put({ type: REMOVE.FAIL, err });
  }
}

function* findActivitiesByYearWorker({ payload }) {
  try {
    yield put({ type: FIND_ACTIVITIES_BY_YEAR.LOAD });
    const response = yield call(services.activity.findByYear, payload);
    yield put({ type: FIND_ACTIVITIES_BY_YEAR.SUCCES, payload: { rows: response.data, count: response.count } });
  } catch (err) {
    toast.error(err);
    yield put({ type: FIND_ACTIVITIES_BY_YEAR.FAIL, err });
  }
}
