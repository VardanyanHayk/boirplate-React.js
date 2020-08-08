import { MEMBERS } from 'store/actionTypes';
import generateCrud from './generateCrud';

export default {
  ...generateCrud({ actionType: MEMBERS }),
};
