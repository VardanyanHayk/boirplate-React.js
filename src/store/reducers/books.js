import { LIBRARY_BOOKS, BIBLIOGRAPHY_BOOKS, FIND_LIBRARY_BOOKS_WEBSITE } from '../actionTypes';
import { initialState } from '.';

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (true) {
    case [
      FIND_LIBRARY_BOOKS_WEBSITE.LOAD,
      LIBRARY_BOOKS.FIND.LOAD,
      LIBRARY_BOOKS.REMOVE.LOAD,
      LIBRARY_BOOKS.UPDATE.LOAD,
    ].includes(type):
      return { ...state, loaded: false };
    case [
      FIND_LIBRARY_BOOKS_WEBSITE.FAIL,
      LIBRARY_BOOKS.FIND.FAIL,
      LIBRARY_BOOKS.REMOVE.FAIL,
      LIBRARY_BOOKS.UPDATE.FAIL,
    ].includes(type):
      return { ...state, failed: true, loaded: true };
    case [LIBRARY_BOOKS.FIND.SUCCES].includes(type):
      return { ...state, data: payload, loaded: true };
    case [FIND_LIBRARY_BOOKS_WEBSITE.SUCCES].includes(type):
      return {
        ...state,
        data: { ...(state.data ? { ...state.data, rows: [...state.data.rows, ...payload.rows] } : payload) },
        loaded: true,
      };
    case [LIBRARY_BOOKS.REMOVE.SUCCES].includes(type):
      return {
        ...state,
        data: {
          ...state.data,
          rows: state.data.rows.filter((it) => it._id !== payload),
          count: state.data.count - 1,
        },
        loaded: true,
      };
    case [LIBRARY_BOOKS.FIND.RESET].includes(type):
      return initialState;
    // create
    default:
      return state;
  }
};
