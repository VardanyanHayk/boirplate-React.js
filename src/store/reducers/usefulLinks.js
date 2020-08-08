import { FIND_USEFUL_LINKS_WEBSITE, USEFUL_LINKS } from '../actionTypes';
import { initialState } from '.';

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (true) {
    case [FIND_USEFUL_LINKS_WEBSITE.LOAD, USEFUL_LINKS.FIND.LOAD].includes(type):
      return { ...state, loaded: false };
    case [FIND_USEFUL_LINKS_WEBSITE.FAIL, USEFUL_LINKS.FIND.FAIL].includes(type):
      return { ...state, failed: true, loaded: true };
    case [USEFUL_LINKS.FIND.SUCCES].includes(type):
      return { ...state, data: payload, loaded: true };
    case [FIND_USEFUL_LINKS_WEBSITE.SUCCES].includes(type):
      return {
        ...state,
        data: { ...(state.data ? { ...state.data, rows: [...state.data.rows, ...payload.rows] } : payload) },
        loaded: true,
      };
    case [USEFUL_LINKS.REMOVE.SUCCES].includes(type):
      return {
        ...state,
        data: {
          ...state.data,
          rows: state.data.rows.filter((it) => it._id !== payload),
          count: state.data.count - 1,
        },
        loaded: true,
      };
    case [USEFUL_LINKS.FIND.RESET].includes(type):
      return initialState;
    // create
    default:
      return state;
  }
};
