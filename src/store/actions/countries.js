import { FIND_COUNTRIES } from 'store/actionTypes';
import generateCrud from './generateCrud';

export default {
  find: (payload) => ({ type: FIND_COUNTRIES.WATCH, payload }),
};
