import { takeLatest, put, call } from 'redux-saga/effects';
import services from '../services';
import { LOGIN, LOGOUT } from '../actionTypes';
import toast from 'utils/toast';

export function* loginWatcher() {
  yield takeLatest(LOGIN.WATCH, loginWorker);
}

function* loginWorker({ payload }) {
  try {
    yield put({ type: LOGIN.LOAD });

    const response = yield call(services.admin.login, payload);
    if (response.code === 200) {
      payload.cb && payload.cb();
    } else {
      throw new Error();
    }

    yield put({ type: LOGIN.SUCCES, payload: response.data });
  } catch (err) {
    toast.error(err);
    yield put({ type: LOGIN.FAIL, err });
  }
}

export function* logoutWatcher() {
  yield takeLatest(LOGOUT.WATCH, logoutWorker);
}

function* logoutWorker({ payload }) {
  try {
    yield put({ type: LOGOUT.LOAD });

    const response = yield call(services.admin.logout, payload);
    if (response.code !== 200) throw Error(response.data.message);

    yield put({ type: LOGOUT.SUCCES });
  } catch (err) {
    
    yield put({ type: LOGOUT.FAIL, err });
  } finally {
    payload.cb && payload.cb();
  }
}
