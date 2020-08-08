import { SEARCH, SEARCH_BY_TAGS } from '../actionTypes';
import { initialState } from '.';

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (true) {
    case [SEARCH_BY_TAGS.LOAD, SEARCH.LOAD].includes(type):
      return { ...state, loaded: false };

    case [SEARCH_BY_TAGS.FAIL, SEARCH.FAIL].includes(type):
      return { ...state, failed: true, loaded: true };

    case [SEARCH_BY_TAGS.SUCCES, SEARCH.SUCCES].includes(type):
      return { ...state, data: payload, loaded: true };

    case [SEARCH_BY_TAGS.RESET, SEARCH.RESET].includes(type):
      return initialState;

    // create
    default:
      return state;
  }
};
