import { PARTNERS } from 'store/actionTypes';
import generateCrud from './generateCrud';

export default {
  ...generateCrud({ actionType: PARTNERS }),
};
