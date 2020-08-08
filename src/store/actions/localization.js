import { CHANGE_LANGUAGE } from '../actionTypes';
import moment from 'moment';
export default {
  change: (payload) => {
    // set moment locale on language change
    moment.locale(payload.locale);
    return { type: CHANGE_LANGUAGE, payload };
  },
};
