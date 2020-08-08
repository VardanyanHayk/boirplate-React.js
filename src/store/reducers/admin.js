import { LOGIN, LOGOUT } from '../actionTypes';
import { initialState } from '.';

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (true) {
    case [LOGIN.LOAD, LOGOUT.LOAD].includes(type):
      return { ...state, loaded: false };
    case [LOGIN.FAIL, LOGOUT.FAIL].includes(type):
      return { ...state, failed: true, loaded: true };
    case [LOGIN.SUCCES].includes(type):
      return { ...state, data: payload, loaded: true };
    case [LOGOUT.SUCCES].includes(type):
      return { ...state, data: null, loaded: true };
    default:
      return state;
  }
};
