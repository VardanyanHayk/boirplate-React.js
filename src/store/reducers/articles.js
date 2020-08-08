import { LIBRARY_ARTICLES, FIND_LIBRARY_ARTICLES_WEBSITE } from '../actionTypes';
import { initialState } from '.';

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (true) {
    case [FIND_LIBRARY_ARTICLES_WEBSITE.LOAD, LIBRARY_ARTICLES.FIND.LOAD].includes(type):
      return { ...state, loaded: false };
    case [FIND_LIBRARY_ARTICLES_WEBSITE.FAIL, LIBRARY_ARTICLES.FIND.FAIL].includes(type):
      return { ...state, failed: true, loaded: true };
    case [LIBRARY_ARTICLES.FIND.SUCCES].includes(type):
      return { ...state, data: payload, loaded: true };
    case [FIND_LIBRARY_ARTICLES_WEBSITE.SUCCES].includes(type):
      return {
        ...state,
        data: { ...(state.data ? { ...state.data, rows: [...state.data.rows, ...payload.rows] } : payload) },
        loaded: true,
      };
    case [LIBRARY_ARTICLES.REMOVE.SUCCES].includes(type):
      return {
        ...state,
        data: {
          ...state.data,
          rows: state.data.rows.filter((it) => it._id !== payload),
          count: state.data.count - 1,
        },
        loaded: true,
      };
    case [LIBRARY_ARTICLES.FIND.RESET].includes(type):
      return initialState;
    // create
    default:
      return state;
  }
};
