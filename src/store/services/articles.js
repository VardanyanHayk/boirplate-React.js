import axios from '../axios';
import { articlesApi as api } from '../endpoints';

export default {
  findArticles: (payload) => axios().get(`${api}?type=aniv`, { ...payload }),
  findBibliographyArticles: (payload) => axios().get(`${api}?type=bibliography`, { ...payload }),
  findUsefulLinks: (payload) => axios().get(`${api}?type=useful_links`, { ...payload }),
  findOne: (payload) => (payload ? axios().get(`${api}/${payload.id}`) : axios().get(api)),
  findByYear: (payload) => axios().get(`${api}/years/${payload.year}`),
  post: (payload) => axios().post(api, payload),
  delete: (payload) => axios().delete(`${api}/${payload}`),
  put: (payload) => axios().put(`${api}/${payload.id}`, payload.body),
};
