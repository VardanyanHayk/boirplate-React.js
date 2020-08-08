import { takeLeading, put, call } from 'redux-saga/effects';
import services from '../services';
import { PARTNERS } from '../actionTypes';
import utils from 'utils';
import toast from 'utils/toast';
const { tranformToFormData } = utils;
const { FIND, CREATE, REMOVE, UPDATE, FIND_ONE } = PARTNERS;

// admin sagas
export function* findPartnersWatcher() {
  yield takeLeading(FIND.WATCH, findPartnersWorker);
}
export function* finOnedPartnerWatcher() {
  yield takeLeading(FIND_ONE.WATCH, findOnePartnerWorker);
}
export function* createPartnerWatcher() {
  yield takeLeading(CREATE.WATCH, createPartnerWorker);
}

export function* updatePartnerWatcher() {
  yield takeLeading(UPDATE.WATCH, updatePartnerWorker);
}

export function* removePartnerWatcher() {
  yield takeLeading(REMOVE.WATCH, removePartnerWorker);
}
// website sagas

function* findPartnersWorker({ payload }) {
  try {
    yield put({ type: FIND.LOAD });
    const response = yield call(services.organizations.find, payload);
    yield put({ type: FIND.SUCCES, payload: { rows: response.data, count: response.count } });
  } catch (err) {
    toast.error(err);
    yield put({ type: FIND.FAIL, err });
  }
}

function* findOnePartnerWorker({ payload }) {
  try {
    yield put({ type: FIND_ONE.LOAD });
    const response = yield call(services.organizations.findOne, payload);
    yield put({ type: FIND_ONE.SUCCES, payload: response.data });
  } catch (err) {
    toast.error(err);
    yield put({ type: FIND_ONE.FAIL, err });
  }
}

function* createPartnerWorker({ payload }) {
  try {
    const { body, cb, extra } = payload;
    yield put({ type: CREATE.LOAD });

    //first create request json
    const response = yield call(services.organizations.post, body);

    // second update image after create successpar
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

function* updatePartnerWorker({ payload }) {
  try {
    const { body, cb, extra, id, meta } = payload;
    console.log('payload', payload);
    console.log('payload', payload);
    yield put({ type: UPDATE.LOAD });

    //first create request json
    const response = yield call(services.organizations.put, { body, id });
    console.log('response', response);

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

function* removePartnerWorker({ payload }) {
  try {
    yield put({ type: REMOVE.LOAD });
    yield call(services.organizations.delete, payload);
    yield put({ type: REMOVE.SUCCES, payload });
  } catch (err) {
    toast.error(err);
    yield put({ type: REMOVE.FAIL, err });
  }
}
