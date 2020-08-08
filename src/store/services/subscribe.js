import axios from '../axios';
import { subscribeApi as api } from '../endpoints';

export default {
  update: (payload) => axios().patch(`${api}`, { ...payload }),
};
