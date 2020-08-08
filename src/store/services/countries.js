import axios from '../axios';
import { countriesApi as api } from '../endpoints';

export default {
  find: (payload) => axios().get(`${api}`, { ...payload }),
};
