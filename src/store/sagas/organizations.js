import { takeLeading, put, call } from 'redux-saga/effects';
import services from '../services';
import { ORGANIZATIONS } from '../actionTypes';
import utils from 'utils';
import toast from 'utils/toast';
const { tranformToFormData } = utils;
const { FIND, CREATE, REMOVE, UPDATE, FIND_ONE } = ORGANIZATIONS;

// admin sagas
export function* findOrganizationsWatcher() {
  yield takeLeading(FIND.WATCH, findOrganizationsWorker);
}
export function* finOnedOrganizationWatcher() {
  yield takeLeading(FIND_ONE.WATCH, findOneOrganizationWorker);
}
export function* createOrganizationWatcher() {
  yield takeLeading(CREATE.WATCH, createOrganizationWorker);
}

export function* updateOrganizationWatcher() {
  yield takeLeading(UPDATE.WATCH, updateOrganizationWorker);
}

export function* removeOrganizationWatcher() {
  yield takeLeading(REMOVE.WATCH, removeOrganizationWorker);
}
// website sagas

function* findOrganizationsWorker({ payload }) {
  try {
    yield put({ type: FIND.LOAD });
    const response = yield call(services.organizations.find, payload);
    yield put({ type: FIND.SUCCES, payload: { rows: response.data, count: response.count } });
  } catch (err) {
    toast.error(err);
    yield put({ type: FIND.FAIL, err });
  }
}

function* findOneOrganizationWorker({ payload }) {
  try {
    yield put({ type: FIND_ONE.LOAD });
    const response = yield call(services.organizations.findOne, payload);
    yield put({ type: FIND_ONE.SUCCES, payload: response.data });
  } catch (err) {
    toast.error(err);
    yield put({ type: FIND_ONE.FAIL, err });
  }
}

function* createOrganizationWorker({ payload }) {
  try {
    const { body, cb, extra } = payload;
    yield put({ type: CREATE.LOAD });

    //first create request json
    const response = yield call(services.organizations.post, body);

    // second update image after create success
    const fileResponse =
      response.success && extra.image && extra.image.length
        ? yield call(services.organizations.put, {
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

function* updateOrganizationWorker({ payload }) {
  try {
    const { body, cb, extra, id, meta } = payload;
    yield put({ type: UPDATE.LOAD });

    //first create request json
    const response = yield call(services.organizations.put, { body, id });

    // second update image after create success
    const fileResponse =
      response.success && extra.image && extra.image.length && !extra.image[0].uploaded
        ? yield call(services.organizations.put, {
            body: tranformToFormData({ data: { image: extra.image } }),
            id,
          })
        : null;

    const filesDeleted =
      response.success && meta.imageDeleted
        ? yield call(services.organizations.put, {
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

function* removeOrganizationWorker({ payload }) {
  try {
    yield put({ type: REMOVE.LOAD });
    yield call(services.organizations.delete, payload);
    yield put({ type: REMOVE.SUCCES, payload });
  } catch (err) {
    toast.error(err);
    yield put({ type: REMOVE.FAIL, err });
  }
}
