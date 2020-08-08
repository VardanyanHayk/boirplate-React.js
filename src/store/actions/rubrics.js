import generateCrud from './generateCrud';
import { RUBRICS, FIND_RUBRICS_WEBSITE } from 'store/actionTypes';

export default {
  ...generateCrud({ actionType: RUBRICS }),
  findWebsiteRubrics: (payload) => ({ type: FIND_RUBRICS_WEBSITE.WATCH, payload }),
};
