import { ORGANIZATIONS } from 'store/actionTypes';
import generateCrud from './generateCrud';

export default {
  ...generateCrud({ actionType: ORGANIZATIONS }),
};
