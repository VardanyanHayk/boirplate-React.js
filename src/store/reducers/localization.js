import { CHANGE_LANGUAGE } from '../actionTypes';
import { initialLanguage } from '.';

export default (state = initialLanguage, action) => {
  const { type, payload } = action;
  switch (type) {
    case CHANGE_LANGUAGE:
      return payload;
    default:
      return state;
  }
};
