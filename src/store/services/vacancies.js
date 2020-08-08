import axios from '../axios';
import { vacanciesApi as api } from '../endpoints';

export default {
  findWebSite: (payload) => axios().get(api, { ...payload }),
  findOne: (payload) => (payload ? axios().get(`${api}/${payload.id}`) : axios().get(api)),
  post: (payload) => axios().post(api, payload),
  send: (payload) => axios().post(`${api}/vacancy`, payload),
  delete: (payload) => axios().delete(`${api}/${payload}`),
  put: (payload) => axios().put(`${api}/${payload.id}`, payload.body),
};
