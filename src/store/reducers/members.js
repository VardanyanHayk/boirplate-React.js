import { MEMBERS } from '../actionTypes';
import { initialState } from '.';

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (true) {
    case [MEMBERS.FIND.LOAD].includes(type):
      return { ...state, loaded: false };
    case [MEMBERS.FIND.FAIL].includes(type):
      return { ...state, failed: true, loaded: true };
    case [MEMBERS.FIND.SUCCES].includes(type):
      return { ...state, data: payload, loaded: true };
    case [MEMBERS.REMOVE.SUCCES].includes(type):
      return {
        ...state,
        data: {
          ...state.data,
          rows: state.data.rows.filter((it) => it._id !== payload),
          count: state.data.count - 1,
        },
        loaded: true,
      };

    // create
    default:
      return state;
  }
};
