import axios from '../axios';
import { activitiesApi as api } from '../endpoints';

export default {
  find: (payload) => axios().get(`${api}`, { ...payload }),
  findOne: (payload) => (payload ? axios().get(`${api}/${payload.id}`) : axios().get(api)),
  findByYear: (payload) => axios().get(`${api}/years/${payload.year}`),
  post: (payload) => axios().post(api, payload),
  delete: (payload) => axios().delete(`${api}/${payload}`),
  put: (payload) => axios().put(`${api}/${payload.id}`, payload.body),
};
