import { takeLeading, put, call } from 'redux-saga/effects';
import services from '../services';
import { FIND_ABOUT_DATA, SEND_CONTACT } from '../actionTypes';
import utils from 'utils';
import toast from 'utils/toast';

// admin sagas
export function* findAboutDataWatcher() {
  yield takeLeading(FIND_ABOUT_DATA.WATCH, findAboutDataWorker);
}

function* findAboutDataWorker({ payload }) {
  try {
    yield put({ type: FIND_ABOUT_DATA.LOAD });
    const response = yield call(services.about.find, payload);
    yield put({ type: FIND_ABOUT_DATA.SUCCES, payload: { rows: response.data, count: response.count } });
  } catch (err) {
    toast.error(err);
    yield put({ type: FIND_ABOUT_DATA.FAIL, err });
  }
}

// website sagas
export function* sendContactWatcher() {
  yield takeLeading(SEND_CONTACT.WATCH, sendContactWorker);
}

function* sendContactWorker({ payload }) {
  const { message, cb, payload: data } = payload;
  try {
    yield call(services.about.sendContact, data);
    toast.success(message.success);
    cb && cb();
  } catch (err) {
    console.log('Error', err);
    toast.error({ error: message.fail });
  }
}
