import axios from 'axios';
import { getToken, getLocalization } from 'utils/helpers';
import { store } from 'store/configureStore';
import { LOGOUT } from 'store/actionTypes';
const { REACT_APP_API_ROOT } = process.env;

export default () => {
  const token = getToken();
  const lang = getLocalization();
  const paths = window.location.pathname.split('/');
  //check where request comes from admin/website, to include token in request header or not
  const includeToken = paths[1] === 'dashboard';

  const service = axios.create({
    baseURL: REACT_APP_API_ROOT,
    headers: {
      Authorization: token && includeToken ? `Bearer ${token}` : null,
      lang,
    },
  });
  service.interceptors.response.use(
    (response) => response.data,
    (error) => {
      const response = error.response.data;
      if (response.code === 401) {
        store.dispatch({ type: LOGOUT.SUCCES, payload: null });
      }
      return Promise.reject(response);
    }
  );
  return service;
};
