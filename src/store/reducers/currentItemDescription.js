import { FIND_CURRENT_ITEM_DESCRIPTION } from '../actionTypes';
import { initialState } from '.';

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (true) {
    case [FIND_CURRENT_ITEM_DESCRIPTION.LOAD].includes(type):
      return { ...state, loaded: false };
    case [FIND_CURRENT_ITEM_DESCRIPTION.FAIL].includes(type):
      return { ...state, failed: true, loaded: true };
    case [FIND_CURRENT_ITEM_DESCRIPTION.SUCCES].includes(type):
      return { ...state, data: payload, loaded: true };
    case [FIND_CURRENT_ITEM_DESCRIPTION.RESET].includes(type):
      return initialState;
    // create
    default:
      return state;
  }
};
