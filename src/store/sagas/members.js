import { takeLeading, put, call } from 'redux-saga/effects';
import services from '../services';
import { MEMBERS } from '../actionTypes';
import utils from 'utils';
import toast from 'utils/toast';
const { tranformToFormData } = utils;
const { FIND, CREATE, REMOVE, UPDATE, FIND_ONE } = MEMBERS;

// admin sagas
export function* findMembersWatcher() {
  yield takeLeading(FIND.WATCH, findMembersWorker);
}
export function* finOnedMemberWatcher() {
  yield takeLeading(FIND_ONE.WATCH, findOneMemberWorker);
}
export function* createMemberWatcher() {
  yield takeLeading(CREATE.WATCH, createMemberWorker);
}

export function* updateMemberWatcher() {
  yield takeLeading(UPDATE.WATCH, updateMemberWorker);
}

export function* removeMemberWatcher() {
  yield takeLeading(REMOVE.WATCH, removeMemberWorker);
}
// website sagas

function* findMembersWorker({ payload }) {
  try {
    yield put({ type: FIND.LOAD });
    const response = yield call(services.members.find, payload);
    yield put({ type: FIND.SUCCES, payload: { rows: response.data, count: response.count } });
  } catch (err) {
    toast.error(err);
    yield put({ type: FIND.FAIL, err });
  }
}

function* findOneMemberWorker({ payload }) {
  try {
    yield put({ type: FIND_ONE.LOAD });
    const response = yield call(services.members.findOne, payload);
    yield put({ type: FIND_ONE.SUCCES, payload: response.data });
  } catch (err) {
    toast.error(err);
    yield put({ type: FIND_ONE.FAIL, err });
  }
}

function* createMemberWorker({ payload }) {
  try {
    const { body, cb, extra } = payload;
    yield put({ type: CREATE.LOAD });

    //first create request json
    const response = yield call(services.members.post, body);

    // second update image after create success
    const fileResponse =
      response.success && extra.image && extra.image.length
        ? yield call(services.members.put, {
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

function* updateMemberWorker({ payload }) {
  try {
    const { body, cb, extra, id, meta } = payload;
    yield put({ type: UPDATE.LOAD });

    //first create request json
    const response = yield call(services.members.put, { body, id });

    // second update image after create success
    const fileResponse =
      response.success && extra.image && extra.image.length && !extra.image[0].uploaded
        ? yield call(services.members.put, {
            body: tranformToFormData({ data: { image: extra.image } }),
            id,
          })
        : null;

    const filesDeleted =
      response.success && meta.imageDeleted
        ? yield call(services.members.put, {
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

function* removeMemberWorker({ payload }) {
  try {
    yield put({ type: REMOVE.LOAD });
    yield call(services.members.delete, payload);
    yield put({ type: REMOVE.SUCCES, payload });
  } catch (err) {
    toast.error(err);
    yield put({ type: REMOVE.FAIL, err });
  }
}
