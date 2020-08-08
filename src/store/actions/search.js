import { SEARCH, SEARCH_BY_TAGS } from 'store/actionTypes';

export default {
  find: (payload) => ({ type: SEARCH.WATCH, payload }),
  findByTag: (payload) => ({ type: SEARCH_BY_TAGS.WATCH, payload }),
  resetList: (payload) => ({ type: SEARCH.RESET, payload }),
};
