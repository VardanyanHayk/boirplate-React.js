import admin from './admin';
import news from './news';
import localization from './localization';
import tags from './tags';
import activity from './activity';
import rubrics from './rubrics';
import books from './books';
import articles from './articles';
import search from './search';
import organizations from './organizations';
import members from './members';
import countries from './countries';
import about from './about';
import partners from './partners';
import subscribe from './subscribe';
import vacancies from './vacancies';
import currentItemDescription from './currentItemDescription';

import actions from '../configure/index';
console.log('>>>>>>>>>>>', actions);

const generate = (data) => {
  const actions = {};
  data.map((it) => {
    const { FIND, CREATE, REMOVE, UPDATE, FIND_ONE } = it.actionType;
    if (FIND) {
      actions[it.name].find = (payload) => ({ type: FIND.WATCH, payload });
      actions[it.name].resetList = (payload) => ({ type: FIND.RESET, payload });
    }
    if (CREATE) actions[it.name].create = (payload) => ({ type: CREATE.WATCH, payload });
    if (UPDATE) actions[it.name].update = (payload) => ({ type: UPDATE.WATCH, payload });
    if (REMOVE) actions[it.name].remove = (payload) => ({ type: REMOVE.WATCH, payload });
    if (FIND_ONE) {
      actions[it.name].findOne = (payload) => ({ type: FIND_ONE.WATCH, payload });
      actions[it.name].resetOne = (payload) => ({ type: FIND_ONE.RESET, payload });
    }
    it.extra.map(extra => {
      actions[it.name] = extra.action;
    })
  });
  return actions;
};
export default {
  ...generate(actions),
  admin,
  news,
  // localization,
  tags,
  activity,
  rubrics,
  books,
  articles,
  search,
  organizations,
  members,
  countries,
  about,
  partners,
  subscribe,
  vacancies,
  currentItemDescription,
};
