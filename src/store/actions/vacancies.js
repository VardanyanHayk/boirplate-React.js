import { VACANCIES, FIND_VACANCIES_WEBSITE, SEND_VACANCY } from 'store/actionTypes';
import generateCrud from './generateCrud';

export default {
  ...generateCrud({ actionType: VACANCIES }),
  send: (payload) => ({ type: SEND_VACANCY.WATCH, payload }),
  findWebsiteVacancies: (payload) => ({ type: FIND_VACANCIES_WEBSITE.WATCH, payload }),
};
