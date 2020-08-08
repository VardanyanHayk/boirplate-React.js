import { BIBLIOGRAPHY_BOOKS, FIND_BIBLIOGRAPHY_BOOKS_WEBSITE } from '../actionTypes';
import { initialState } from '.';

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (true) {
    case [FIND_BIBLIOGRAPHY_BOOKS_WEBSITE.LOAD, BIBLIOGRAPHY_BOOKS.FIND.LOAD].includes(type):
      return { ...state, loaded: false };
    case [FIND_BIBLIOGRAPHY_BOOKS_WEBSITE.FAIL, BIBLIOGRAPHY_BOOKS.FIND.FAIL].includes(type):
      return { ...state, failed: true, loaded: true };
    case [BIBLIOGRAPHY_BOOKS.FIND.SUCCES].includes(type):
      return { ...state, data: payload, loaded: true };
    case [FIND_BIBLIOGRAPHY_BOOKS_WEBSITE.SUCCES].includes(type):
      return {
        ...state,
        data: { ...(state.data ? { ...state.data, rows: [...state.data.rows, ...payload.rows] } : payload) },
        loaded: true,
      };
    case [BIBLIOGRAPHY_BOOKS.REMOVE.SUCCES].includes(type):
      return {
        ...state,
        data: {
          ...state.data,
          rows: state.data.rows.filter((it) => it._id !== payload),
          count: state.data.count - 1,
        },
        loaded: true,
      };
    case [BIBLIOGRAPHY_BOOKS.FIND.RESET].includes(type):
      return initialState;
    // create
    default:
      return state;
  }
};
