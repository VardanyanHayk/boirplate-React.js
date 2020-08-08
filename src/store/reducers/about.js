import { FIND_ABOUT_DATA } from '../actionTypes';
import { initialState } from '.';

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (true) {
    case [FIND_ABOUT_DATA.LOAD].includes(type):
      return { ...state, loaded: false };
    case [FIND_ABOUT_DATA.FAIL].includes(type):
      return { ...state, failed: true, loaded: true };
    case [FIND_ABOUT_DATA.SUCCES].includes(type):
      return { ...state, data: payload, loaded: true };
    // create
    default:
      return state;
  }
};
