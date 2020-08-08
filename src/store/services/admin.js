import axios from '../axios';
import { userLoginApi, userLogoutApi } from '../endpoints';

export default {
  login: (payload) => axios().post(userLoginApi, payload),
  logout: (payload) => axios().post(userLogoutApi, payload),
};
