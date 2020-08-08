import { VACANCIES, FIND_VACANCIES_WEBSITE } from '../actionTypes';
import { initialState } from '.';
const { FIND, CREATE, UPDATE, REMOVE, FIND_ONE } = VACANCIES;

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (true) {
    case [FIND_VACANCIES_WEBSITE.LOAD, FIND.LOAD, CREATE.LOAD, UPDATE.LOAD, REMOVE.LOAD].includes(type):
      return { ...state, loaded: false };
    case [FIND_VACANCIES_WEBSITE.FAIL, FIND.FAIL, CREATE.FAIL, UPDATE.FAIL, REMOVE.FAIL].includes(type):
      return { ...state, failed: true, loaded: true };
    case [FIND_VACANCIES_WEBSITE.SUCCES, FIND.SUCCES].includes(type):
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
    case [VACANCIES.FIND.RESET].includes(type):
      return initialState;
    // create
    default:
      return state;
  }
};
