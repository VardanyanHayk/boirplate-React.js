import { LOGIN, LOGOUT } from 'store/actionTypes';

export default {
  login: (payload) => ({ type: LOGIN.WATCH, payload }),
  logout: (payload) => ({ type: LOGOUT.WATCH, payload }),
};
