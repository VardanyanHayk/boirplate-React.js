import { takeLeading, call } from 'redux-saga/effects';
import services from '../services';
import { SUBSCRIBE } from '../actionTypes';
import toast from 'utils/toast';

// website sagas
export function* subscribeWatcher() {
  yield takeLeading(SUBSCRIBE.WATCH, subscribe);
}

function* subscribe({ payload }) {
  try {
    const { cb, ...data } = payload;
    const response = yield call(services.subscribe.update, data);
    toast.success(response?.data?.message);
    cb && cb();
  } catch (err) {
    console.log('Error', err);
    toast.error(err);
  }
}
