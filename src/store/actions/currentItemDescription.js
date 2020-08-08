import { FIND_CURRENT_ITEM_DESCRIPTION } from 'store/actionTypes';

export default {
  find: (payload) => ({ type: FIND_CURRENT_ITEM_DESCRIPTION.WATCH, payload }),
  reset: (payload) => ({ type: FIND_CURRENT_ITEM_DESCRIPTION.RESET, payload }),
};
