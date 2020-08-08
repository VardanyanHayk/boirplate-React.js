import { PARTNERS } from '../actionTypes';
import { initialState } from '.';
const { FIND, REMOVE } = PARTNERS;

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (true) {
    case [FIND.LOAD].includes(type):
      return { ...state, loaded: false };
    case [FIND.FAIL].includes(type):
      return { ...state, failed: true, loaded: true };
    case [FIND.SUCCES].includes(type):
      return { ...state, data: payload, loaded: true };
    case [REMOVE.SUCCES].includes(type):
      return {
        ...state,
        data: {
          ...state.data,
          rows: state.data.rows.filter((it) => it._id !== payload),
          count: state.data.count - 1,
        },
        loaded: true,
      };

    default:
      return state;
  }
};
