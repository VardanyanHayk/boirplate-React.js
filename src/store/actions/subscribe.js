import { SUBSCRIBE } from 'store/actionTypes';

export default {
  update: (payload) => ({ type: SUBSCRIBE.WATCH, payload }),
};
