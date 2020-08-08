import { ARCHIVES, FIND_ARCHIVES_WEBSITE } from '../actionTypes';
import { initialState } from '.';

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (true) {
    case [FIND_ARCHIVES_WEBSITE.LOAD, ARCHIVES.FIND.LOAD].includes(type):
      return { ...state, loaded: false };
    case [FIND_ARCHIVES_WEBSITE.FAIL, ARCHIVES.FIND.FAIL].includes(type):
      return { ...state, failed: true, loaded: true };
    case [ARCHIVES.FIND.SUCCES].includes(type):
      return { ...state, data: payload, loaded: true };
    case [FIND_ARCHIVES_WEBSITE.SUCCES].includes(type):
      return {
        ...state,
        data: { ...(state.data ? { ...state.data, rows: [...state.data.rows, ...payload.rows] } : payload) },
        loaded: true,
      };
    case [ARCHIVES.REMOVE.SUCCES].includes(type):
      return {
        ...state,
        data: {
          ...state.data,
          rows: state.data.rows.filter((it) => it._id !== payload),
          count: state.data.count - 1,
        },
        loaded: true,
      };
    case [ARCHIVES.FIND.RESET].includes(type):
      return initialState;
    // create
    default:
      return state;
  }
};
