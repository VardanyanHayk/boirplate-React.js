import axios from '../axios';
import { docsApi as api } from '../endpoints';

export default {
  find: (payload) => axios().get(`${api}`, { ...payload }),
  findOne: (payload) => (payload ? axios().get(`${api}/${payload.id}`) : axios().get(api)),
  post: (payload) => axios().post(api, payload.body),
  delete: (payload) => axios().delete(`${api}/${payload.id}`),
  put: (payload) => axios().put(`${api}/${payload.id}`, payload.body),
};
