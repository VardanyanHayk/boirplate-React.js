import moment from 'moment';
import { languages } from '../../constants/localization';
const CHANGE_LANGUAGE = 'CHANGE_LANGUAGE';

const change = (payload) => {
  // set moment locale on language change
  moment.locale(payload.locale);
  return { type: CHANGE_LANGUAGE, payload };
};

const languageReducer = (state = languages.ru, action) => {
  const { type, payload } = action;
  switch (type) {
    case CHANGE_LANGUAGE:
      return payload;
    default:
      return state;
  }
};


export default {
  name: 'localization',
  actionType: {},
  extra: [
    {
      actionType: CHANGE_LANGUAGE,
      action: { change },
      reducer: languageReducer,
      saga: '',
      service: '',
    },
  ],
};
