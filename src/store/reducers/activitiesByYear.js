import { FIND_ACTIVITIES_BY_YEAR } from '../actionTypes';
import { initialState } from '.';

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (true) {
    case [FIND_ACTIVITIES_BY_YEAR.LOAD].includes(type):
      return { ...state, loaded: false };
    case [FIND_ACTIVITIES_BY_YEAR.FAIL].includes(type):
      return { ...state, failed: true, loaded: true };
    case [FIND_ACTIVITIES_BY_YEAR.SUCCES].includes(type):
      return { ...state, data: payload, loaded: true };
    // create
    default:
      return state;
  }
};
