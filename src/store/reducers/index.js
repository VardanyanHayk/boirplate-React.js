import { LOGOUT } from 'store/actionTypes';
import { languages } from '../../constants/localization';
import { combineReducers } from 'redux';
import actions from '../configure/index';
// reducers
import admin from './admin';
import localization from './localization';
import tags from './tags';
import currentList from './currentList';
import currentItem from './currentItem';
import news from './news';
import activities from './activities';
import activitiesByYear from './activitiesByYear';
import rubrics from './rubrics';
import books from './books';
import articles from './articles';
import bibliographyBooks from './bibliographyBooks';
import bibliographyArticles from './bibliographyArticles';
import usefulLinks from './usefulLinks';
import archives from './archives';
import search from './search';
import organizations from './organizations';
import members from './members';
import countries from './countries';
import about from './about';
import partners from './partners';
import vacancies from './vacancies';
import currentItemDescription from './currentItemDescription';

//define initial states to use in reducers
export const initialState = { data: null, loaded: false, failed: false };
export const initialLanguage = languages.ru;

const generate = (data) => {
  const reducers = {};
  data.map((it) => {
    reducers[it.name] = (state = initialState, action) => {
      const { type, payload } = action;

    };
    it.extra.map((extra) => {
      reducers[it.name] = extra.reducer;
    });
  });
  return reducers;
};
export default (state, action) => {
  if (action.type === LOGOUT.FAIL || action.type === LOGOUT.SUCCES) {
    // reset store data on logout action
    Object.keys(state).map((key) => {
      Object.assign(state[key], initialState);
    });
  }
  return RootReducer(state, action);
};

const RootReducer = combineReducers({
  admin,
  // localization,
  ...generate(actions),
  tags,
  news,
  activities,
  rubrics,
  activitiesByYear,
  books,
  articles,
  bibliographyBooks,
  bibliographyArticles,
  usefulLinks,
  archives,
  search,
  members,
  organizations,
  countries,
  about,
  partners,
  vacancies,
  currentList,
  currentItem,
  currentItemDescription,
});
