import axios from '../axios';
import { booksApi as api } from '../endpoints';

export default {
  findBooks: (payload) => axios().get(`${api}?type=aniv`, { ...payload }),
  findBibliographyBooks: (payload) => axios().get(`${api}?type=bibliography`, { ...payload }),
  findArchives: (payload) => axios().get(`${api}?type=archive`, { ...payload }),
  findOne: (payload) => (payload ? axios().get(`${api}/${payload.id}`) : axios().get(api)),
  post: (payload) => axios().post(api, payload),
  delete: (payload) => axios().delete(`${api}/${payload}`),
  put: (payload) => axios().put(`${api}/${payload.id}`, payload.body),
};
