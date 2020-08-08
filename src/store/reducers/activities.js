import { FIND_ACTIVITIES_WEBSITE } from '../actionTypes';
import { initialState } from '.';

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (true) {
    case [FIND_ACTIVITIES_WEBSITE.LOAD].includes(type):
      return { ...state, loaded: false };
    case [FIND_ACTIVITIES_WEBSITE.FAIL].includes(type):
      return { ...state, failed: true, loaded: true };
    case [FIND_ACTIVITIES_WEBSITE.SUCCES].includes(type):
      return { ...state, data: payload, loaded: true };
    // create
    default:
      return state;
  }
};
