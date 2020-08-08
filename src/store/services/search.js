import axios from '../axios';
import { searchApi as api } from '../endpoints';

export default {
  find: (payload) => axios().get(`${api}`, { ...payload }),
  findByTag: (payload) => axios().get(`${api}/tags/${payload.id}`, { ...payload }),
};
