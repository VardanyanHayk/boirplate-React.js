import axios from '../axios';
import { membersApi as api } from '../endpoints';

export default {
  find: (payload) => axios().get(`${api}`, { ...payload }),
  findOne: (payload) => (payload ? axios().get(`${api}/${payload.id}`) : axios().get(api)),
  post: (payload) => axios().post(`${api}/org/${payload.organization}`, { ...payload, organization: undefined }),
  delete: (payload) => axios().delete(`${api}/${payload}`),
  put: (payload) => axios().put(`${api}/${payload.id}`, payload.body),
};
