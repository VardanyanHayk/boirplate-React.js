import { TAGS } from '../actionTypes';
import { initialState } from '.';

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (true) {
    case [TAGS.FIND.LOAD, TAGS.CREATE.LOAD, TAGS.REMOVE.LOAD, TAGS.UPDATE.LOAD].includes(type):
      return { ...state, loaded: false };
    case [TAGS.FIND.FAIL, TAGS.CREATE.FAIL, TAGS.REMOVE.FAIL, TAGS.UPDATE.FAIL].includes(type):
      return { ...state, failed: true, loaded: true };
    case [TAGS.FIND.SUCCES].includes(type):
      return { ...state, data: payload, loaded: true };
    case [TAGS.CREATE.SUCCES].includes(type):
      return {
        ...state,
        data: {
          ...state.data,
          rows: [...state.data.rows, payload],
          count: state.data.count + 1,
        },
        loaded: true,
      };
    case [TAGS.UPDATE.SUCCES].includes(type):
      return {
        ...state,
        data: {
          ...state.data,
          rows: state.data.rows.map((r) => (r._id === payload._id ? payload : r)),
        },
        loaded: true,
      };
    case [TAGS.REMOVE.SUCCES].includes(type):
      return {
        ...state,
        data: {
          ...state.data,
          rows: state.data.rows.filter((it) => it._id !== payload),
          count: state.data.count - 1,
        },
        loaded: true,
      };
    case [TAGS.FIND.RESET].includes(type):
      return initialState;
    // create
    default:
      return state;
  }
};
