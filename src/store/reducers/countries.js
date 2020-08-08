import { FIND_COUNTRIES } from '../actionTypes';
import { initialState } from '.';

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (true) {
    case [FIND_COUNTRIES.LOAD].includes(type):
      return { ...state, loaded: false };
    case [FIND_COUNTRIES.FAIL].includes(type):
      return { ...state, failed: true, loaded: true };
    case [FIND_COUNTRIES.SUCCES].includes(type):
      return { ...state, data: payload, loaded: true };
    // create
    default:
      return state;
  }
};
