import { NEWS, FIND_NEWS_WEBSITE } from 'store/actionTypes';
import generateCrud from './generateCrud';

export default {
  ...generateCrud({ actionType: NEWS }),
  findWebsiteNews: (payload) => ({ type: FIND_NEWS_WEBSITE.WATCH, payload }),
};
