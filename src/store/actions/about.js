import { FIND_ABOUT_DATA, SEND_CONTACT } from 'store/actionTypes';

export default {
  find: (payload) => ({ type: FIND_ABOUT_DATA.WATCH, payload }),
  sendContact: (payload) => ({ type: SEND_CONTACT.WATCH, payload }),
};
