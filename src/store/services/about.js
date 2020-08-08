import axios from '../axios';
import { aboutApi as api } from '../endpoints';

export default {
  find: (payload) => axios().get(`${api}`, { ...payload }),
  sendContact: (payload) => axios().post(`${api}/contact_us`, { ...payload }),
};
